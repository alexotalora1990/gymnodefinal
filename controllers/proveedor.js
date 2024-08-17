import Proveedor from '../models/proveedor.js'

const httpProveedor = {
    getProveedor: async (req, res) => {
        const { buscar } = req.query;
        const proveedor = await Proveedor.find({
            $or: [{ nombre: new RegExp(buscar, "i") }]
        });
        res.json({ proveedor })
    },
    getProveedorID: async (req, res) => {
        const { id } = req.params;
        const proveedor = await Proveedor.findById(id);
        res.json({ proveedor })
    },
    getProveedorActivo:async (req, res)=>{
        const proveedorActivo = await Proveedor.find({estado:1})
        res.json({proveedorActivo})
    },
    getProveedorInactivo: async (req, res)=>{
        const proveedorInactivo = await Proveedor.find({estado:0})
        res.json({proveedorInactivo})
    },

    postProveedor: async (req, res) => {
        try {
          
            const { nombre,documento, direccion, telefono, correo } = req.body;
            if (!correo) {
                return res.status(400).json({ msg: "El correo no puede estar vacío" });
            }
            const proveedores = new Proveedor({ nombre,documento, direccion, telefono, correo });
            await proveedores.save()
            res.json({ proveedores })
        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Error no se pudo crear el Proveedor" })
        }
    },
    putProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, ...resto } = req.body;
    
            // Actualiza el proveedor sin incluir el campo _id
            const proveedores = await Proveedor.findByIdAndUpdate(id, resto, { new: true });
    
            if (!proveedores) {
                return res.status(404).json({ msg: "Proveedor no encontrado" });
            }
    
            res.json({ proveedores });
        } catch (error) {
            console.error("Error al actualizar el proveedor:", error);
            res.status(500).json({ msg: "Error al actualizar el proveedor" });
        }
    },
    putProveedorActivo: async (req, res)=>{
        const {id} = req.params;
        const usuarios  = await Proveedor.findByIdAndUpdate(id, {estado:1}, {new: true})
        res.json({usuarios})
    },
    putProveedorInactivo: async (req, res)	=>{
        const {id} = req.params;
        const usuarios  = await Proveedor.findByIdAndUpdate(id, {estado:0}, {new: true})
        res.json({usuarios})
    }



}

export default httpProveedor