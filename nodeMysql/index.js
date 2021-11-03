const express = require("express");
const app = express();

// ens ajuden a analitzar el cos de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// carregarem les rutes
app.use(require("./routes/carta"));

app.listen(process.env.PORT || 3030, () => {
  console.log("Servidor corrent al port 3030");
});

module.exports = app;
