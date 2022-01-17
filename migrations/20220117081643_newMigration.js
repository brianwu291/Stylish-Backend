const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "products", deps: []
 * createTable() => "users", deps: []
 * createTable() => "favorites", deps: [users, products, users]
 *
 */

const info = {
  revision: 1,
  name: "newMigration",
  created: "2022-01-17T08:16:43.633Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "products",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "id",
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING(128), field: "name", allowNull: false },
        price: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "price",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "category_id",
          allowNull: true,
          defaultValue: null,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "id",
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: Sequelize.STRING(128),
          field: "first_name",
          allowNull: false,
          defaultValue: "",
        },
        lastName: {
          type: Sequelize.STRING(128),
          field: "last_name",
          allowNull: false,
          defaultValue: "",
        },
        birthday: {
          type: Sequelize.DATE,
          field: "birthday",
          allowNull: true,
          defaultValue: null,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "favorites",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          unique: "favorites_id_id_unique",
          field: "id",
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        productId: {
          type: Sequelize.INTEGER.UNSIGNED,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "products", key: "id" },
          field: "product_id",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER.UNSIGNED,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          field: "user_id",
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
    params: ["favorites", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["products", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
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
