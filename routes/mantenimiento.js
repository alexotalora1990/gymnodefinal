import { Router } from "express";
import httpMantenimiento from "../controllers/mantenimiento.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersMantenimientos from "../helpers/mantenimiento.js";
import helpersMaquinas from "../helpers/maquinas.js";

const router = Router();

router.get("/", httpMantenimiento.getMantenimientos);
router.get("mantenimiento/:id", httpMantenimiento.getMantenimientoPorId);
// router.get("/activos", httpMantenimiento.getMantenimientosActivos);
// router.get("/inactivos", httpMantenimiento.getMantenimientosInactivos);

router.post(
  "/",
  [
    check("idmaquina", "El id de la máquina es requerido").notEmpty(),
    check("responsable", "El responsable es requerido").notEmpty(),
    check("descripcion", "La descripción es requerida").notEmpty(),
    check("valor", "El valor debe ser númerico").optional().isNumeric(),
    check("idmaquina").custom(helpersMaquinas.validarExistaId),

    validarCampos,
  ],
  httpMantenimiento.postcrearMantenimiento
);

router.put(  "/:id",[
  check("id", "Se necesita un mongoId válido").isMongoId(), validarCampos,
  check("id").custom(helpersMantenimientos.validarExistaId),
  validarCampos,
], 
  httpMantenimiento.putactualizarMantenimiento
);


export default router;
