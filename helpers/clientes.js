import Cliente from "../models/clientes.js"
const helpersClientes={
    validarEmailUnico:async (email)=>{
        const existe = await Cliente.findOne({email})
        if (existe){
            throw new Error ("Cliente ya Existe")
        }
    },

    validarDocumento:async (documento)=>{
      const existe = await Cliente.findOne({documento})
      if (existe){
          throw new Error ("Cliente ya Existe")
      }
  },
  
    validarExistaId:async (id)=>{
        const existe = await Cliente.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    }
}



export default helpersClientes