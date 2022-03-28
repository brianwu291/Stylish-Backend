const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(profile_image_id) => "users"
 * removeColumn(main_image_id) => "campaigns"
 * addColumn(profile_image) => "users"
 * addColumn(main_image) => "campaigns"
 * changeColumn(main_image) => "products"
 *
 */

const info = {
  revision: 3,
  name: "dd",
  created: "2022-03-28T07:18:01.440Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["users", "profile_image_id", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["campaigns", "main_image_id", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "profile_image",
      { type: Sequelize.STRING(500), field: "profile_image", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "campaigns",
      "main_image",
      { type: Sequelize.STRING(500), field: "main_image", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "products",
      "main_image",
      { type: Sequelize.STRING(500), field: "main_image", allowNull: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["users", "profile_image", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["campaigns", "main_image", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "profile_image_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        field: "profile_image_id",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "campaigns",
      "main_image_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        field: "main_image_id",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "products",
      "main_image",
      { type: Sequelize.STRING(128), field: "main_image", allowNull: false },
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
