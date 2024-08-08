import mongoose from "mongoose";
const proveedorSchema=new mongoose.Schema({
    nombre:{type:String,default:"",required:true},
    documento:{type:Number,default:0,required:true,unique:true}, 
    email:{type:String,default:0,required:true,unique:true},
    direccion:{type:String,default:"", required:true},
    telefono:{type:Number,default:0, required:true},
    fechaNacimiento:{type:Date,required:true},
    estado:{type:Number, default:1},
})

export default mongoose.model("Proveedor",proveedorSchema)