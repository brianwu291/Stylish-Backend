const Sequelize = require("sequelize");

const { PROVIDERS } = require("../constants")

/**
 * Actions summary:
 *
 * changeColumn(password) => "users" password allow null
 * changeColumn(profile_image) => "users" profile_image allow null
 * removeColumn(provider) => "users" provider no need
 * addColumn(auth_token) => "user" add auth_token for stylish authenticate
 * addColumn(google_token) => "user" add google_token for google login
 * addColumn(facebook_token) => "user" add facebook_token for google login
 */

const info = {
  revision: 5,
  name: "change_users_table_schema",
  created: "2022-04-01T04:12:03.340Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "users",
      "password",
      {
        type: Sequelize.STRING(128),
        field: "password",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "users",
      "profile_image",
      {
        type: Sequelize.STRING(500),
        allowNull: true,
        field: "profile_image",
      },
      { transaction },
    ],
  },
  {
    fn: "removeColumn",
    params: [
      "users",
      "provider",
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "auth_token",
      {
        type: Sequelize.STRING(600),
        allowNull: true,
        field: "auth_token",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "google_token",
      {
        type: Sequelize.STRING(600),
        allowNull: true,
        field: "google_token",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "facebook_token",
      {
        type: Sequelize.STRING(600),
        allowNull: true,
        field: "facebook_token",
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "users",
      "password",
      {
        type: Sequelize.STRING(128),
        field: "password",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "users",
      "profile_image",
      {
        type: Sequelize.STRING(500),
        allowNull: false,
        field: "profile_image",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "provider",
      {
        type: Sequelize.ENUM(Object.values(PROVIDERS)),
        allowNull: false,
        field: "provider",
      },
      { transaction },
    ],
  },
  {
    fn: "removeColumn",
    params: [
      "users",
      "auth_token",
      { transaction },
    ],
  },
  {
    fn: "removeColumn",
    params: [
      "users",
      "google_token",
      { transaction },
    ],
  },
  {
    fn: "removeColumn",
    params: [
      "users",
      "facebook_token",
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
