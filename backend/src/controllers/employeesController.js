/*
Este archivo tiene los métodos del CRUD
(Select, Insert, Update y Delete) para el modelo de empleados
*/

// Creo un array de funciones
const employeesController = {};
import employeesModel from "../models/Employees.js";

// SELECT
employeesController.getEmployees = async (req, res) => {
  try {
    const employees = await employeesModel.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los empleados", error });
  }
};

// INSERT
employeesController.insertEmployee = async (req, res) => {
  const { name, lastname, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified } = req.body;

  // Crear un nuevo empleado
  const newEmployee = new employeesModel({
    name,
    lastname,
    birthday,
    email,
    address,
    hireDate,
    password,
    telephone,
    dui,
    isssNumber,
    isVerified
  });

  try {
    await newEmployee.save();
    res.json({ message: "Empleado guardado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar el empleado", error });
  }
};

// DELETE
employeesController.deleteEmployee = async (req, res) => {
  try {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Empleado eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el empleado", error });
  }
};

// UPDATE
employeesController.updateEmployee = async (req, res) => {
  const { name, lastname, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified } = req.body;

  try {
    const updatedEmployee = await employeesModel.findByIdAndUpdate(
      req.params.id,
      { name, lastname, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified },
      { new: true }
    );
    res.json({ message: "Empleado actualizado exitosamente", employee: updatedEmployee });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el empleado", error });
  }
};

export default employeesController;
