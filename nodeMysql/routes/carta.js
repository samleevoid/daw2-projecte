const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// connexió base de dades mysql
const { connection } = require("../config.db");

const getCarta = (request, response) => {
  connection.query("SELECT * FROM carta", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};

app.route("/carta").get(getCarta);

const postCarta = (request, response) => {
  const { plato, descripcion, precio, disponible } = request.body;

  // insertar a la bbdd
  connection.query(
    "INSERT INTO carta(plato, descripcion, precio, disponible) VALUES (?,?,?,?) ",
    [plato, descripcion, precio, disponible],
    (error, results) => {
      if (error) throw error;
      response
        .status(201)
        .json({ "Item afegit correctament": results.affectedRows });
    }
  );
};

app.route("/carta").post(postCarta);

const delCarta = (request, response) => {
  const id = request.params.id;
  console.log("el id és", id);
  connection.query("Delete from carta where id = ?", [id], (error, results) => {
    if (error) throw error;
    response.status(201).json({ "Item eliminat!": results.affectedRows });
  });
};

app.route("/carta/:id").delete(delCarta);

// Default response per a les rutes no definides
app.use(function (req, res) {
  res.status(404).json();
});

module.exports = app;
