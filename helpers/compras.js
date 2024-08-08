import Compras from "../models/compras.js";

const helpersCompras={
    validarExistaId:async (id)=>{
        const existe = await Compras.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },

}



export default helpersCompras