import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede exceder los 50 caracteres"]
    },
    lastname: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      minlength: [3, "El apellido debe tener al menos 3 caracteres"],
      maxlength: [50, "El apellido no puede exceder los 50 caracteres"]
    },
    birthday: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
      validate: {
        validator: function(v) {
          return v instanceof Date && !isNaN(v);
        },
        message: "Fecha de nacimiento no válida"
      }
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Por favor ingresa un correo electrónico válido"]
    },
    address: {
        type: String,
        required: [true, "La direccion es obligatoria"]
    },
    hireDate: {
        type: Date,
        required: [true, "La fecha de contratacion es obligatoria"],
      validate: {
        validator: function(v) {
          return v instanceof Date && !isNaN(v);
        },
        message: "Fecha de nacimiento no válida"
      }
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    telephone: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      match: [/^\d{6}$/, "El teléfono debe contener 6 dígitos"]
    },
    dui: {
      type: String,
      required: [true, "El DUI es obligatorio"],
      match: [/^\d{8}-\d$/, "El DUI debe tener el formato 12345678-9"]
    },
    isssNumber: {
        type: String,
        required: [true, "El DUI es obligatorio"],
      match: [/^\d{9}-\d$/, "El DUI debe tener 9 digitos"]
    },
    isVerified: {
      type: Boolean,
      required: [true, "El estado de verificación es obligatorio"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Clients", employeesSchema);
