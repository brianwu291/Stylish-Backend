const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "products", deps: []
 * createTable() => "users", deps: []
 * createTable() => "inventories", deps: [products]
 *
 */

const info = {
  revision: 1,
  name: "newMigration",
  created: "2022-03-23T10:21:47.392Z",
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
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
          defaultValue: Sequelize.Date,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
          defaultValue: Sequelize.Date,
        },
        category: {
          type: Sequelize.STRING(128),
          field: "category",
          allowNull: true,
          defaultValue: null,
        },
        title: {
          type: Sequelize.STRING(128),
          field: "title",
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(128),
          field: "description",
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "price",
          allowNull: false,
        },
        texture: {
          type: Sequelize.STRING(128),
          field: "texture",
          allowNull: false,
        },
        wash: { type: Sequelize.STRING(128), field: "wash", allowNull: false },
        place: {
          type: Sequelize.STRING(128),
          field: "place",
          allowNull: false,
        },
        note: { type: Sequelize.STRING(128), field: "note", allowNull: false },
        story: {
          type: Sequelize.STRING(128),
          field: "story",
          allowNull: false,
        },
        mainPictureId: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "main_pictureId_id",
          allowNull: true,
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
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
          defaultValue: Sequelize.Date,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
          defaultValue: Sequelize.Date,
        },
        provider: {
          type: Sequelize.ENUM("google", "facebook", "stylish"),
          field: "provider",
          allowNull: false,
        },
        name: { type: Sequelize.STRING(255), field: "name", allowNull: false },
        email: {
          type: Sequelize.STRING(191),
          field: "email",
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(128),
          field: "password",
          allowNull: false,
        },
        birthday: {
          type: Sequelize.DATE,
          field: "birthday",
          allowNull: true,
          defaultValue: null,
        },
        profilePictureId: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "profile_picture_id",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "inventories",
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
          allowNull: false,
          defaultValue: Sequelize.Date,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
          defaultValue: Sequelize.Date,
        },
        safetyStock: {
          type: Sequelize.DECIMAL(18, 2),
          field: "safety_stock",
          allowNull: false,
          defaultValue: 0,
        },
        colorCode: {
          type: Sequelize.STRING(100),
          field: "color_code",
          allowNull: false,
        },
        size: {
          type: Sequelize.ENUM("XS", "S", "M", "L", "XL", "XXL"),
          field: "size",
          allowNull: false,
        },
        productId: {
          type: Sequelize.INTEGER.UNSIGNED,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "products", key: "id" },
          field: "product_id",
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
    params: ["inventories", { transaction }],
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
