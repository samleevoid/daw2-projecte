const express = require("express");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const app = express();

app.post("/login", (req, res) => {
  let body = req.body;

  User.findOne({ username: body.username }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "(Usuari) o constrasenya incorrectes",
        },
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuari o (contrasenya) incorrectes",
        },
      });
    }

    let token = jwt.sign(
      {
        usuari: userDB,
      },
      process.env.SEED,
      { expiresIn: process.env.CADUCITAT_TOKEN }
    );

    return res.json({
      ok: true,
      usuari: userDB,
      token,
    });
  });
});

module.exports = app;
