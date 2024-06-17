import mongoose from "mongoose";

const usuarioSchema=new mongoose.Schema({
    sede:{type:String,default:""},  
    idsede: {type:mongoose.Schema.Types.ObjectId,ref:"Sede",required:true},    
    nombre:{type:String,default:"",required:true },
    email:{type:String,default:0,required:true,unique:true},
    password:{type:String,default:0,required:true},
    telefono:{type:Number,default:0,required:true}, 
    roll:{type:String,default:"",required:true },
    estado:{type:Number,default:1},
    createAt:{type:Date,default:Date.now},
}) 

export default mongoose.model("Usuario",usuarioSchema)   
