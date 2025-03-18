/* Este archivo tiene los métodos del CRUD (Select, Insert, Update y Delete) para el modelo de Branches */
 
import branchesModel from "../models/Branchs.js";
 
const branchesController = {};
 
// SELECT - Obtener todas las sucursales
branchesController.getBranches = async (req, res) => {
  try {
    const branches = await branchesModel.find();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las sucursales", error });
  }
};
 
// INSERT - Agregar una nueva sucursal
branchesController.insertBranch = async (req, res) => {
  const { name, address, telephone, schedule } = req.body;
 
  const newBranch = new branchesModel({ name, address, telephone, schedule });
 
  try {
    await newBranch.save();
    res.json({ message: "Sucursal guardada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar la sucursal", error });
  }
};
 
// DELETE - Eliminar una sucursal por ID
branchesController.deleteBranch = async (req, res) => {
  try {
await branchesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Sucursal eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la sucursal", error });
  }
};
 
// UPDATE - Actualizar una sucursal por ID
branchesController.updateBranch = async (req, res) => {
  const { name, address, telephone, schedule } = req.body;
 
  try {
    const updatedBranch = await branchesModel.findByIdAndUpdate(
req.params.id,
      { name, address, telephone, schedule },
      { new: true }
    );
    res.json({ message: "Sucursal actualizada exitosamente", branch: updatedBranch });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la sucursal", error });
  }
};
 
export default branchesController;