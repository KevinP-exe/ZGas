import { Schema, model } from "mongoose";
 
const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "El comentario es obligatorio"],
      minlength: [3, "El comentario debe tener al menos 3 caracteres"],
    },
    rating: {
      type: Number,
      required: [true, "La calificación es obligatoria"],
      min: [1, "La calificación mínima es 1"],
      max: [5, "La calificación máxima es 5"],
    },
    idclient: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
      required: [true, "El ID del cliente es obligatorio"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
 
export default model("Reviews", reviewSchema);