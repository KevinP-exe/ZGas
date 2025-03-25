import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
 
import Clients from "../models/Clients.js";
import Employees from "../models/Employees.js";
 
import { config } from "../config.js"
 
const loginController = {}
 
loginController.login = async (req, res) => {
    const {email, password} = req.body;
 
    try {
        let userFound;
        let userType;
 
        //1- ADMIN
        if(email === config.email.email && password === config.email.password){
            userType = "admin",
            userFound ={_id: "admin"}
        }else{
            //2- EMPLEADO
            userFound = await Employees.findOne({email})
            userType = "employee"
 
            if(!userFound){
                userFound = await Clients.findOne({email})
                userType = "client"
            }
        }
 
        //USUARIO NO ENCONTRADO
        if(!userFound){
            console.log("el usuario no ha sido encontrado")
            return res.json({message: "user not found"})
        }
 
        //validar la contraseña, solo si no es admin
        if(userType !== "admin"){
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "contraseña incorrecta"})
            }
        }
 
        // TOKEN
        jsonwebtoken.sign(
            //1- que voy a guardar
            {id: userFound._id, userType},
            //2- Secreto
            config.JWT.secret,
            //3- cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- Funcion flecha
            (error, token) => {
                if(error) console.log(error)
 
                res.cookie("authToken", token)
                res.json({message: "login successful"})
            }
        )
 
    } catch (error) {
        res.json({message: "error"+error})
    }
}
 
export default loginController;