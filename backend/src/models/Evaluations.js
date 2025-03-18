import { Schema, model } from "mongoose";
 
const evaluationSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "El comentario es obligatorio"],
      minlength: [3, "El comentario debe tener al menos 3 caracteres"],
    },
    grade: {
      type: Number,
      required: [true, "La calificación es obligatoria"],
      min: [0, "La calificación mínima es 0"],
      max: [100, "La calificación máxima es 100"],
    },
    role: {
      type: String,
      required: [true, "El rol es obligatorio"],
      enum: ["admin", "manager", "employee"], 
    },
    idEmployee: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      required: [true, "El ID del empleado es obligatorio"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
 
export default model("Evaluations", evaluationSchema);