import evaluationsModel from "../models/Evaluations.js";
 
const evaluationsController = {};
 
// SELECT - Obtener todas las evaluaciones
evaluationsController.getEvaluations = async (req, res) => {
  try {
    const evaluations = await evaluationsModel.find().populate("idEmployee");
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las evaluaciones", error });
  }
};
 
// INSERT - Agregar una nueva evaluación
evaluationsController.insertEvaluation = async (req, res) => {
  const { comment, grade, role, idEmployee } = req.body;
 
  const newEvaluation = new evaluationsModel({ comment, grade, role, idEmployee });
 
  try {
    await newEvaluation.save();
    res.json({ message: "Evaluación guardada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar la evaluación", error });
  }
};
 
// DELETE - Eliminar una evaluación por ID
evaluationsController.deleteEvaluation = async (req, res) => {
  try {
await evaluationsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Evaluación eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la evaluación", error });
  }
};
 
// UPDATE - Actualizar una evaluación por ID
evaluationsController.updateEvaluation = async (req, res) => {
  const { comment, grade, role, idEmployee } = req.body;
 
  try {
    const updatedEvaluation = await evaluationsModel.findByIdAndUpdate(
req.params.id,
      { comment, grade, role, idEmployee },
      { new: true }
    );
    res.json({ message: "Evaluación actualizada exitosamente", evaluation: updatedEvaluation });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la evaluación", error });
  }
};
 
export default evaluationsController;