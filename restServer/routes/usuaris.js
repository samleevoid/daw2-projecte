const { Router } = require("express");
const { response, request } = require("express");

const { check, validationResult } = require("express-validator");

const { usuarisGet, usuarisPost } = require("../controllers/usuaris");

const router = Router();

const validarCamps = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

router.get("/", (req = request, res = response) => {
  res.send("Accés denegat...");
});

router.get("/usuaris", usuarisGet);

router.post(
  "/usuaris",
  [
    check("correu", "El correu no és vàlid").isEmail(),
    // check("correu").custom(emailExisteix)
    check("nom", "El nom és obligatori").not().isEmpty(),
    check("password", "El password ha de tenir més de 6 caràcters").isLength({
      min: 6,
    }),

    validarCamps,
  ],
  usuarisPost
);

module.exports = router;
