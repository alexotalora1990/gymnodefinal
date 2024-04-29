import Producto from "../models/productos.js"


const helpersProductos={
    
      validarExistaId:async (id)=>{
        const existe = await Producto.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
   

    
}
export default helpersProductos