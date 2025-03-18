import { Schema, model } from "mongoose";
 
const branchSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
    },
    address: {
      type: String,
      required: [true, "La dirección es obligatoria"],
    },
    telephone: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      match: [/^\d{6,15}$/, "El teléfono debe contener entre 6 y 15 dígitos"],
    },
    schedule: {
      type: String,
      required: [true, "El horario es obligatorio"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
 
export default model("Branches", branchSchema);
 