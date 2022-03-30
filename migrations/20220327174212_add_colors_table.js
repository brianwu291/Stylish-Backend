const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "colors", deps: []
 *
 */

const info = {
  revision: 6,
  name: "add_colors_table",
  created: "2022-03-27T17:42:12.937Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "colors",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "id",
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          defaultValue: Sequelize.fn("now"),
        },
        code: {
          type: Sequelize.STRING(128),
          field: "code",
          unique: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(128),
          field: "name",
          unique: true,
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["colors", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
