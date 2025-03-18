import reviewsModel from "../models/Reviews.js";
 
const reviewsController = {};
 
// SELECT - Obtener todas las reseñas
reviewsController.getReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel.find().populate("idclient");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas", error });
  }
};
 
// INSERT - Agregar una nueva reseña
reviewsController.insertReview = async (req, res) => {
  const { comment, rating, idclient } = req.body;
 
  const newReview = new reviewsModel({ comment, rating, idclient });
 
  try {
    await newReview.save();
    res.json({ message: "Reseña guardada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar la reseña", error });
  }
};
 
// DELETE - Eliminar una reseña por ID
reviewsController.deleteReview = async (req, res) => {
  try {
await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Reseña eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reseña", error });
  }
};
 
// UPDATE - Actualizar una reseña por ID
reviewsController.updateReview = async (req, res) => {
  const { comment, rating, idclient } = req.body;
 
  try {
    const updatedReview = await reviewsModel.findByIdAndUpdate(
req.params.id,
      { comment, rating, idclient },
      { new: true }
    );
    res.json({ message: "Reseña actualizada exitosamente", review: updatedReview });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la reseña", error });
  }
};
 
export default reviewsController;