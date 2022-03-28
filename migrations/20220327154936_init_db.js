const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "campaigns", deps: []
 * createTable() => "products", deps: []
 * createTable() => "users", deps: []
 * createTable() => "campaign_products", deps: [campaigns, products]
 * createTable() => "images", deps: [users, products, campaigns]
 * createTable() => "inventories", deps: [products]
 *
 */

const info = {
  revision: 1,
  name: "test",
  created: "2022-03-27T15:49:36.112Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "campaigns",
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
        title: {
          type: Sequelize.STRING(128),
          field: "title",
          allowNull: false,
        },
        mainImageId: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "main_image_id",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
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
          defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          defaultValue: Sequelize.fn("now"),
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
        mainImage: {
          type: Sequelize.STRING(128),
          field: "main_image",
          allowNull: false,
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
          defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
          defaultValue: Sequelize.fn("now"),
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
        profileImageId: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "profile_image_id",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "campaign_products",
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
        campaignId: {
          type: Sequelize.INTEGER.UNSIGNED,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "campaigns", key: "id" },
          field: "campaign_id",
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
  {
    fn: "createTable",
    params: [
      "images",
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
        url: { type: Sequelize.STRING(128), field: "url", allowNull: false },
        userId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "user_id",
          allowNull: true,
        },
        productId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: { model: "products", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "product_id",
          allowNull: true,
        },
        campaignId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: { model: "campaigns", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "campaign_id",
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
          defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
          defaultValue: Sequelize.fn("now"),
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
    params: ["campaign_products", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["campaigns", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["images", { transaction }],
  },
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
