import mongoose from "mongoose";

const sedeSchema=new mongoose.Schema({
    
    nombre:{type:String,default:"",required:true },
    direccion:{type:String,default:"",required:true},
    horario:{type:String,default:0,required:true},
    telefono:{type:Number,default:0,required:true},
   ciudad:{type:String,default:"",required:true },
    estado:{type:Number,default:1},
    createAt:{type:Date,default:Date.now},  
})
 
export default mongoose.model("Sede",sedeSchema)  
