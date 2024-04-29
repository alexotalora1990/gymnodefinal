import Mantenimiento from "../models/mantenimiento.js"

const helpersMantenimientos={
    
      validarExistaId:async (id)=>{
        const existe = await Mantenimiento.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
   


    
}



export default helpersMantenimientos