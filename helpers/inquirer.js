const { countReset } = require("console");
const inquirer = require("inquirer");
require("colors");

const preguntes = [
  {
    type: "list",
    name: "opcio",
    message: "Què vols fer?",
    choices: [
      {
        value: "1",
        name: `${"1 ".green} Nou alumne`,
      },
      {
        value: "2",
        name: `${"2 ".green} Llistar alumnes`,
      },
      {
        value: "3",
        name: `${"3 ".green} Llistar alumnes i hores`,
      },
      {
        value: "4",
        name: `${"4 ".green} Introduir hores`,
      },
      {
        value: "5",
        name: `${"5 ".green} Eliminar alumne`,
      },
      {
        value: "0",
        name: `${"0 ".green} Sortir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("========================".cyan);
  console.log("   Secciona una opció".yellow);
  console.log("========================\n".cyan);

  const { opcio } = await inquirer.prompt(preguntes);

  return opcio; // retorno un valor entre 0 i 5
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presiona ${"enter".yellow} per a continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const nouAlumne = async (message) => {
  const question = [
    {
      type: "input",
      name: "nom",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Si us plau, introdueix un nom";
        }
        return true;
      },
    },
  ];

  const { nom } = await inquirer.prompt(question);
  return nom;
};

module.exports = {
  inquirerMenu,
  pausa,
  nouAlumne,
};
