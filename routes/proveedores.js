import { Router } from "express";
import httpProveedores from "../controllers/proveedores.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersProveedores from "../helpers/proveedores.js";

import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get("/",[
    // validarJWT,
     
  ], httpProveedores.getProveedor1);
  router.get("/",[
    // validarJWT  
  ], httpProveedores.getProveedor);
  router.get("/proveedor/:id", httpProveedores.getProveedor);
  router.get("/activos", httpProveedores.getProveedoresActivos);
  router.get("/inactivos", httpProveedores.getProveedoresInactivos);
  router.get("/cumpleanios/mes/:mes", httpProveedores.getProveedoresPorMesCumpleanios);
  
  router.post(
    "/",
    [
      check("nombre", "El nombre no puede estar vacio").notEmpty(),
      check("documento", "Documento no puede estar vacio").notEmpty(),
      check("direccion", "El nombre no puede estar vacio").notEmpty(),
      check("email", "El email no puede estar vacio").notEmpty(),
      check("telefono", "El telefono no puede estar vacio").notEmpty(),
      check( 
        "fechaNacimiento",
        "La fecha de nacimiento no puede estar vacio"
      ).notEmpty(),
      check("documento", "Solo numeros").isNumeric(),
      check("telefono", "Solo numeros").isNumeric(),
      check("email", "ingrese un correo valido").isEmail(),
      check("email").custom(helpersProveedores.validarEmailUnico),
      check("documento").custom(helpersProveedores.validarDocumento),
      
      validarCampos,
  
    ],
    httpProveedores.postProveedores
  );
   
  router.put(
    "/:id",
    [
      check("id", "Se necesita un mongoid valido").isMongoId(),
      check("id").custom(helpersProveedores.validarExistaId),
      validarCampos,
    ],
    httpProveedores.putProveedores
  );
  
  router.put(
    "/activar/:id",
    [
      check("id", "Se necesita un mongoid valido").isMongoId(),
      check("id").custom(helpersProveedores.validarExistaId),
      validarCampos,
    ],
    httpProveedores.putProveedoresActivar
  );
  
  
  router.put(
    "/desactivar/:id",
    [
      check("id", "Se necesita un mongoid valido").isMongoId(),
      check("id").custom(helpersProveedores.validarExistaId),
      validarCampos,
    ],
    httpProveedores.putProveedoresDesactivar
  );
  
  router.put(
      "Listar/:id",
      [
        check("id", "Se necesita un mongoid valido").isMongoId(),
        check("id").custom(helpersProveedores.validarExistaId),
        validarCampos,
      ],
      httpProveedores.putListar
    );
  
export default router;