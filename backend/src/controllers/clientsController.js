/*
Este archivo tiene los métodos del CRUD
(Select, Insert, Update y Delete) para el modelo de clientes
*/

// Creo un array de funciones
const clientsController = {};
import clientsModel from "../models/Clients.js";

// SELECT
clientsController.getClients = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error });
  }
};

// INSERT
clientsController.insertClient = async (req, res) => {
  const { name, lastname, birthday, email, password, telephone, dui, isVerified } = req.body;
  
  // Crear un nuevo cliente
  const newClient = new clientsModel({
    name,
    lastname,
    birthday,
    email,
    password,
    telephone,
    dui,
    isVerified
  });

  try {
    await newClient.save();
    res.json({ message: "Cliente guardado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar el cliente", error });
  }
};

// DELETE
clientsController.deleteClient = async (req, res) => {
  try {
    await clientsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
};

// UPDATE
clientsController.updateClient = async (req, res) => {
  const { name, lastname, birthday, email, password, telephone, dui, isVerified } = req.body;

  try {
    const updatedClient = await clientsModel.findByIdAndUpdate(
      req.params.id,
      { name, lastname, birthday, email, password, telephone, dui, isVerified },
      { new: true }
    );
    res.json({ message: "Cliente actualizado exitosamente", client: updatedClient });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el cliente", error });
  }
};

export default clientsController;
