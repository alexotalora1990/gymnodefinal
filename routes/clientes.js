import { Router } from "express";
import httpClientes from "../controllers/clientes.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersClientes from "../helpers/clientes.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/",[
  // validarJWT,
  
], httpClientes.getClientes1);
router.get("/",[
  // validarJWT  
], httpClientes.getClientes);
router.get("/cliente/:id", httpClientes.getClientes);
router.get("/activos", httpClientes.getClientesActivos);
router.get("/inactivos", httpClientes.getClientesInactivos);
router.get("/plan/:plan", httpClientes.getClientesPorPlan);
router.get("/cumpleanios/mes/:mes", httpClientes.getClientesPorMesCumpleanios);

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
    check("plan", "El plan no puede estar vacio").notEmpty(),
    check("foto", "la foto no puede estar vacio").notEmpty(),
    check("objetivo", "El objetivo no puede estar vacio").notEmpty(),
    check("observaciones", "Las observaciones no puede estar vacio").notEmpty(),
    check(
      "fechaVencimiento",
      "La fecha de vencimiento no puede estar vacio"
    ).notEmpty(),

    check("documento", "Solo numeros").isNumeric(),
    check("telefono", "Solo numeros").isNumeric(),
    check("email", "ingrese un correo valido").isEmail(),

    check("email").custom(helpersClientes.validarEmailUnico),
    check("documento").custom(helpersClientes.validarDocumento),
    validarCampos,

  ],
  httpClientes.postClientes
);

router.post(
  "/seguimiento/:id",
  [
    check("fecha", "Fecha no puede estar vacía").notEmpty(),
    check("peso", "Peso no puede estar vacío").notEmpty(),
    check("IMC", "IMC no puede estar vacío").notEmpty(),
    check("tBrazo", "Brazo no puede estar vacío").notEmpty(),
    check("tPierna", "Pierna no puede estar vacío").notEmpty(),
    check("tCintura", "Cintura no puede estar vacío").notEmpty(),
    check("estatura", "Estatura no puede estar vacío").notEmpty(),
  ],
  httpClientes.postSeguimiento
);

router.put(
  "/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  httpClientes.putClientes
);

router.put(
  "/activar/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  httpClientes.putClientesActivar
);


router.put(
  "/Desactivar/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  httpClientes.putClientesDesactivar
);

router.put(
    "Listar/:id",
    [
      check("id", "Se necesita un mongoid valido").isMongoId(),
      check("id").custom(helpersClientes.validarExistaId),
      validarCampos,
    ],
    httpClientes.putListar
  );

  router.put(
    "Seguimiento/:id",
    [
      check("id", "Se necesita un mongoid valido").isMongoId(),
      check("id").custom(helpersClientes.validarExistaId),
      validarCampos,
    ],
    httpClientes.putSeguimiento
  );

export default router;
