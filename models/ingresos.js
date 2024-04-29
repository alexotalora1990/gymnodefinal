import mongoose from "mongoose";

const ingresoSchema=new mongoose.Schema({
    createAt:{type:Date,default:Date.now},
    idsede: { type: mongoose.Schema.Types.ObjectId, ref: "Sede",  required: true,    },
        idcliente: {  type: mongoose.Schema.Types.ObjectId,    ref: "Cliente",   required: true,      },
    
})

export default mongoose.model("Ingreso",ingresoSchema)