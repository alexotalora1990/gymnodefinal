import mongoose from "mongoose";

const mantenimientoSchema = new mongoose.Schema({
   idmaquina: {    type: mongoose.Schema.Types.ObjectId,    ref: "Maquina",    required: true,  },
  responsable:{type:String,default:"",required:true},
  descripcion:{type:String,required:true},
  valor: { type: Number, default: 1 },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("Mantenimiento", mantenimientoSchema); 