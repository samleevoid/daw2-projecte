require("colors");

const { inquirerMenu, pausa, nouAlumne } = require("./helpers/inquirer");
const { guardarDB } = require("./helpers/guardarFitxer");

const AlumnesHores = require("./models/alumneshores");

const main = async () => {
  let opt = "";
  const alumnes = new AlumnesHores();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const nomAlumne = await nouAlumne("Nom alumne:");
        alumnes.crearAlumne(nomAlumne, 0);
        // const alumne = new Alumne("Ricard", 10);
        // console.log(alumne);
        break;

      case "2":
        break;

      case "3":
        break;

      case "4":
        break;

      case "5":
        break;

      default:
        break;
    }

    guardarDB(alumnes.llistatArr);

    await pausa();
  } while (opt !== "0");
};

main();
