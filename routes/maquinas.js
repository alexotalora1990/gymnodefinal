import { Router } from "express";
import httpMaquina from "../controllers/maquinas.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersMaquinas from "../helpers/maquinas.js";
import helpersSedes from "../helpers/sedes.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

 
const router = Router();

router.get("/", httpMaquina.getMaquina);
router.get("/maquina/:id", httpMaquina.getMaquinaPorId);
router.get("/activos", httpMaquina.getMaquinasActivas);
router.get("/inactivos", httpMaquina.getMaquinasInactivas);  


router.post(
  "/",
  [
    check("idSede", "Id sede no puede estar vacio").notEmpty(),
    
    check("idSede", "se requiere un mongoId valido").isMongoId(),
    check("descripcion", "La descripción es requerida").notEmpty(),
    check(
      "fechaUltimoMant",
      "La ultima fecha de mantenimiento es requerida"
    ).notEmpty(),
        check("idSede").custom(helpersSedes.validarExistaId),
    validarCampos,
  ],
  httpMaquina.postcrearMaquina
);

router.put(
  "/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersMaquinas.validarExistaId),
    validarCampos,
  ],
  httpMaquina.putactualizarMaquina
);

router.put(
  "/activar/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersMaquinas.validarExistaId),
    validarCampos,
  ],
  httpMaquina.putactivarMaquina
);
router.put(
  "/desactivar/:id", 
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersMaquinas.validarExistaId),
    validarCampos,
  ],
  httpMaquina.putinactivarMaquina
);

export default router;
