import Usuario from "../models/usuarios.js"


const helpersUsuarios={
    validarEmailUnico:async (email)=>{
        const existe = await Usuario.findOne({email})
        if (existe){
            throw new Error ("Cliente ya Existe")
        }
    },

    validarDocumento:async (documento)=>{
      const existe = await Usuario.findOne({documento})
      if (existe){
          throw new Error ("Cliente ya Existe")
      }
  },
  
    validarExistaId:async (id)=>{
        const existe = await Usuario.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },

   
}



export default helpersUsuarios;