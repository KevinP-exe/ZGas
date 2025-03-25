import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"

import {config} from "../config.js"
import employeesMdl from "../models/employeesMdl.js";

const registerEmployeesController = {}

registerEmployeesController.register = async (req, res) =>{
    const { name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified  } = req.body

    try {
        //verificar si el empleado existe
        const existEmployee = await employeesMdl.findOne({email})
        if (existEmployee) {
            return res.json({message: "empleado ya existente"})
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newEmployee = new employeesMdl({ name, lastName, birthday, email, address, hireDate, password: passwordHash, telephone, dui, isssNumber, isVerified })

        await newEmployee.save();

        jsonwebtoken.sign(
            //1- que voy a guardar
            {id: newEmployee._id},
            //2- secreto
            config.JWT.secret,
            //3- cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- funcion flecha
            (error, token) => {
                if(error)console.log(error)
                res.cookie("authToken", token)
            res.json({message: "Empleado registrado exitosamente"})
            }
        )
    } catch (error) {
        console.log(error);
    }
};

export default registerEmployeesController;