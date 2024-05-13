import mongoose from "mongoose";

const maquinaSchema = new mongoose.Schema({
  idSede: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sede",
    required: true,
  },
  
  descripcion: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  fechaUltimoMant: { type: Date, required: true },
  estado: { type: Number, default: 1 },
});

export default mongoose.model("Maquina", maquinaSchema);  

