const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(colorId) => "inventories"
 * addConstraint(colorId) => "inventories" foreignKey
 * raw sql to update colorId => "inventories"
 * changeColumn(colorId) => allowNull: false,
 */

const info = {
  revision: 4,
  name: "add_color_id_to_inventories_table",
  created: "2022-03-31T07:18:02.440Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "inventories",
      "color_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        field: "color_id",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addConstraint",
    params: [
      "inventories",
      {
        type: 'FOREIGN KEY',
        name: 'color_id',
        fields: ["color_id"],
        references: {
          table: "colors",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      { transaction },
    ],
  },
  {
    fn: 'query',
    rawSql: `UPDATE inventories SET color_id = (
      SELECT
        colorId
      FROM (
        SELECT
          inventories.id AS "inventoryId",
          colors.id AS "colorId"
        FROM
          inventories
          INNER JOIN colors ON inventories.color_code = colors.code
        GROUP BY
          inventoryId
      ) AS inventoryIdColorIdMapTable
      WHERE
        inventoryIdColorIdMapTable.inventoryId = inventories.id)
    `,
  },
  {
    fn: "changeColumn",
    params: [
      "inventories",
      "color_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    ],
  }
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: [
      "inventories",
      "color_id",
      {
        type: Sequelize.INTEGER.UNSIGNED,
        field: "color_id",
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
          if (command.fn === 'query') {
            queryInterface.sequelize.query(command.rawSql).then(next, reject);
          } else {
            queryInterface[command.fn](...command.params).then(next, reject); 
          }
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
