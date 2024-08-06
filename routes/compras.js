import { Router } from "express";
import httpCompras from "../controllers/compras.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersCompras from "../helpers/compras.js";

import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();




export default router;