require("colors");

const {
  inquirerMenu,
  pausa,
  nouAlumne,
  alumneSelect,
  introHores,
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");

const AlumnesHores = require("./models/alumneshores");
const Alumne = require("./models/alumne");

const main = async () => {
  let opt = "";
  const alumnes = new AlumnesHores();

  const alumnesDB = readDB();

  if (alumnesDB) {
    // si hi ha dades, carrégales
    alumnes.carregarAlumnesFromArray(alumnesDB);
  }

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
        alumnes.llistarAlumnes();
        break;

      case "3":
        alumnes.llistarAlumnesHores();
        break;

      case "4":
        const id1 = await alumneSelect(alumnes.llistatArr);

        if (id1 !== "0") {
          const hores = await introHores("Hores fetes:");
          const nomAlumne = await alumnes.introNumHores(id1, hores);
          console.log(
            `Alumne: ${nomAlumne} ${"::".yellow} ${hores} hores guardades! `
          );
        }

        break;

      case "5":
        // eliminar alumne de la base de dades

        // const id2 = ....
        // if (id2 !== "0") {
        // const ok -> cridem a confirmar
        // if( ok ) {
        //   alumnes.eliminarAlumne(id2);
        //   console.log('Alumne eliminat!');
        // }
        // }
        break;

      default:
        break;
    }

    guardarDB(alumnes.llistatArr);

    await pausa();
  } while (opt !== "0");
};

main();
