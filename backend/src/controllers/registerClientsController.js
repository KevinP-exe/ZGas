import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import Clients from "../models/Clients.js";
import {config} from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) =>{

    const {name, lastname, birthday, email, password, telephone, dui, isVerified} = req.body;
    
    try {
       
      const existClient = await Clients.findOne({email})
      if(existClient){
        return res.json({message: "Client alredy exist"})
      }  

      const passwordHash = await bcrypt.hash(password, 10)

      const newClient = new Clients({
      name, lastname, birthday, email, password, telephone, dui: dui || null, isVerified: isVerified || false
      });

      await newClient.save();

      //Generar un codigo aleatorio para enviarlo por correo 
      const verificationCode = crypto.randomBytes(4).toString("hex")

      //Genrar un token que contenga el codigo de verificacion 
      jsonwebtoken.sign(
        //1- que voy a guardar
        {id: newClient._id},
        //2- secreto
        config.JWT.secret,
        //3- cuando expira
        {expiresIn: "2h"},
    )    

    res.cookie("verificationToken", tokenCode, {maxAge: 2*60*60*1000})

    //Enviar el correo electronico 
    const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: config.emailClient.email_user,
            pass: config.emailClient.email_pass
         }


    })

    const mailOptions = {
         from: config.emailClient.email_user,
         to: email,
         subject: "Verificacion de correo",
         text: "Para verificar su cuenta, utiliza el siguiente codigo" + verificationCode + "Este expirara en dos horas."
    };

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
            return res.json({message: "Error sending email"+ error});
        }
        console.log("Email sent" + info);
    })

    res.json({message: "Cliente ya registrado revise su correo para econtrar un codigo de verificacion"})

    } catch (error) {
        console.log(error);
    }
};

registerClientsController.verifyCodeEmail = async (req, res) => {

    const { requireCode } = req.body;

    const token = req.cookies.verificationToken;

    try {
        
       //Verificar y decodificar token 
       const decoded = jsonwebtoken.verify(token, config.JWT.secret);
       const {email, verificationCode: storedCode } = decoded;

       //Comparar el codigo mandado por correo que esta en las cookies y el mandado por el usuario 
       if(requireCode !== storedCode){
        return res.json({message: "Invalid code"});
       }

       //Marcamos al cliente como verificado 
       const client = await Clients.findOne({email});
       client.isVerified = true;
       await client.save();
        
       res.clearCookie("verificationToken");

       res.json({message: "Email verified Successfuly"});

    } catch (error) {
        console.log("error" + error);
    }
};

export default registerClientsController;