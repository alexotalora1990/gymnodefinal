import Plan from "../models/planes.js"


const helpersPlanes={
    
      validarExistaId:async (id)=>{
        const existe = await Plan.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
 


    
}
export default helpersPlanes