import mongoose from "mongoose";

const clienteSchema=new mongoose.Schema({
    idPlan:{type: mongoose.Schema.Types.ObjectId, ref: "plan",  required: true},
    nombre:{type:String,default:"",required:true},
    createAt:{type:Date,default:Date.now},
    documento:{type:Number,default:0,required:true,unique:true}, 
    email:{type:String,default:0,required:true,unique:true},
    direccion:{type:String,default:"", required:true},
    telefono:{type:Number,default:0, required:true},
    fechaNacimiento:{type:Date,required:true},
    estado:{type:Number, default:1},
    foto:{type:String,default:"",required:true},
    objetivo:{type:String,required:true},
    observaciones:{type:String,required:true},
    plan:{type:String,required:true},
    fechaVencimiento:{type:Date,required:true},
    seguimiento:[{
        fecha:{type:Date,required:true, required:true}, 
        peso:{type:Number,default:0, required:true},
        IMC:{type:Number,default:0,required:true},
        tBrazo:{type:Number,default:0, required:true},
        tPierna:{type:Number,default:0, required:true},
        tCintura:{type:Number,default:0, required:true},
        estatura:{type:Number,default:0, required:true},
        createAt:{type:Date,default:Date.now},
    }]
   
    
})

export default mongoose.model("Cliente",clienteSchema)