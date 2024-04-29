import Maquina from "../models/maquinas.js"

const helpersMaquinas={
    
      validarExistaId:async (id)=>{
        const existe = await Maquina.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
    
    
}



export default helpersMaquinas