const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(main_image_id) => "products"
 * addColumn(main_image) => "products"
 *
 */

const info = {
  revision: 9,
  name: "fff",
  created: "2022-03-27T19:44:12.151Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["products", "main_image_id", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "products",
      "main_image",
      { type: Sequelize.STRING(128), field: "main_image", allowNull: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["products", "main_image", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["products", "productId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "products",
      "main_image_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        field: "main_image_id",
        allowNull: true,
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
