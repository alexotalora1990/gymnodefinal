import { Router } from "express";
import httpMaquina from "../controllers/maquinas.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersMaquinas from "../helpers/maquinas.js";
import helpersSedes from "../helpers/sedes.js";

const router = Router();

router.get("/", httpMaquina.getMaquina);
router.get("/maquina/:id", httpMaquina.getMaquinaPorId);
router.get("/activos", httpMaquina.getMaquinasActivas);
router.get("/inactivos", httpMaquina.getMaquinasInactivas);

// router.get("/:id/mantenimientos", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const maquina = await Maquina.findById(id).populate("idmantenimiento");
//     if (!maquina) {
//       return res.status(404).json({ message: "Máquina no encontrada" });
//     }
//     res.json({ mantenimientos: maquina.idmantenimiento });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "Error al obtener mantenimientos por máquina" });
//   }
// });
// router.get(
//   "/valor-entre-fechas",
//   httpMaquina.obtenerValorMantenimientoEntreFechas
// );
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
  "/inactivar/:id", 
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersMaquinas.validarExistaId),
    validarCampos,
  ],
  httpMaquina.putinactivarMaquina
);

export default router;
