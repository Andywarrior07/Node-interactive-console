const inquirer = require('inquirer');
require('colors');

const MENU_OPTIONS = [
  {
    type: 'list',
    name: 'option',
    message: 'Que desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`,
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tarea`,
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`,
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log('================================'.green);
  console.log('     Selecciona una opcion'.white);
  console.log('================================\n'.green);

  const { option } = await inquirer.prompt(MENU_OPTIONS);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presiones ${'ENTER'.green} para continuar`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async message => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listDeleteTaskMessage = async tasks => {
  const choices = tasks.map((task, index) => {
    const indentifier = `${index + 1}.`.green;

    return {
      value: task.id,
      name: `${indentifier} ${task.description}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0. '.green + 'Cancelar',
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async message => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showChecklist = async tasks => {
  const choices = tasks.map((task, index) => {
    const indentifier = `${index + 1}.`.green;

    return {
      value: task.id,
      name: `${indentifier} ${task.description}`,
      checked: !!task.completedAt,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'id',
      message: 'Seleccione',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(question);
  return id;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listDeleteTaskMessage,
  confirm,
  showChecklist,
};
