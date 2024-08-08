import Proveedor from "../models/proveedores.js";

const helpersProveedores={
    validarEmailUnico:async (email)=>{
        const existe = await Proveedor.findOne({email})
        if (existe){
            throw new Error ("Proveedor ya Existe")
        }
    },

    validarDocumento:async (documento)=>{
      const existe = await Proveedor.findOne({documento})
      if (existe){
          throw new Error ("Proveedor ya Existe")
      }
  },
  
    validarExistaId:async (id)=>{
        const existe = await Proveedor.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    }

}



export default helpersProveedores