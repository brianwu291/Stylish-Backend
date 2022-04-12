const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "orders", deps: []
 * createTable() => "order_recipients", deps: [orders]
 * createTable() => "order_purchased_product_records", deps: [orders]
 *
 */

const info = {
  revision: 8,
  name: "add_basic_order_related_tables",
  created: "2022-04-11T18:19:44.972Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "orders",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "id",
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        uuid: {
          type: Sequelize.UUID,
          field: "uuid",
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
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
        shippingWay: {
          type: Sequelize.STRING(128),
          field: "shipping_way",
          allowNull: false,
        },
        paymentType: {
          type: Sequelize.STRING(128),
          field: "payment_type",
          allowNull: false,
        },
        subtotal: {
          type: Sequelize.DECIMAL(18, 2),
          field: "subtotal",
          allowNull: false,
          defaultValue: 0,
        },
        freight: {
          type: Sequelize.DECIMAL(18, 2),
          field: "freight",
          allowNull: false,
          defaultValue: 0,
        },
        total: {
          type: Sequelize.DECIMAL(18, 2),
          field: "total",
          allowNull: false,
          defaultValue: 0,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "order_recipients",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "id",
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        uuid: {
          type: Sequelize.UUID,
          field: "uuid",
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
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
        name: { type: Sequelize.STRING(128), field: "name", allowNull: false },
        phone: { type: Sequelize.STRING(20), field: "phone", allowNull: false },
        email: {
          type: Sequelize.STRING(128),
          field: "email",
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(500),
          field: "address",
          allowNull: false,
        },
        receivedStartTime: {
          type: Sequelize.TIME,
          field: "received_start_time",
          allowNull: false,
        },
        receivedEndTime: {
          type: Sequelize.TIME,
          field: "received_end_time",
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
        orderId: {
          type: Sequelize.INTEGER.UNSIGNED,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "orders", key: "id" },
          field: "order_id",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "order_purchased_product_records",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "id",
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        uuid: {
          type: Sequelize.UUID,
          field: "uuid",
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
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
        name: { type: Sequelize.STRING(128), field: "name", allowNull: false },
        price: {
          type: Sequelize.DECIMAL(18, 2),
          defaultValue: 0,
          allowNull: false,
          field: "price",
        },
        size: {
          type: Sequelize.ENUM("XS", "S", "M", "L", "XL", "XXL"),
          field: "size",
          allowNull: false,
        },
        quantity: {
          type: Sequelize.DECIMAL(18, 2),
          field: "quantity",
          allowNull: false,
          defaultValue: 0,
        },
        colorId: {
          type: Sequelize.INTEGER.UNSIGNED,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "colors", key: "id" },
          field: "color_id",
          allowNull: false,
        },
        orderId: {
          type: Sequelize.INTEGER.UNSIGNED,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "orders", key: "id" },
          field: "order_id",
          allowNull: false,
        },
      },
      { transaction },
    ],
  }
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["orders", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["order_recipients", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["order_purchased_product_records", { transaction }],
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
