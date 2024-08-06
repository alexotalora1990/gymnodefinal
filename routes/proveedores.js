import { Router } from "express";
import httpProveedores from "../controllers/proveedores.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersProveedores from "../helpers/proveedores.js";

import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();




export default router;