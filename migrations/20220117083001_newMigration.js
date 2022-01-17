const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn(user_id) => "favorites"
 * changeColumn(product_id) => "favorites"
 *
 */

const info = {
  revision: 2,
  name: "newMigration",
  created: "2022-01-17T08:30:01.220Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "favorites",
      "user_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "id" },
        field: "user_id",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "favorites",
      "product_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "products", key: "id" },
        field: "product_id",
        allowNull: false,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "favorites",
      "user_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "id" },
        field: "user_id",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "favorites",
      "product_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "products", key: "id" },
        field: "product_id",
        allowNull: false,
      },
      { transaction },
    ],
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
