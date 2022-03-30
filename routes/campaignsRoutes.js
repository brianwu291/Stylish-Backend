const {
  getAllCampaigns,
} = require("../controllers/campaignsController");

/**
 * @constant
 * @type {string}
 */
const API_PREFIX = "/api/campaigns";

/**
 * @typedef {Object <string, get>} Application
 *
 * @param {Application} App
 * @returns {void}
 */
function campaignsRoutes(App) {
  App.get(`${API_PREFIX}/all`, getAllCampaigns);

  // App.get(`${API_PREFIX}/:id`, validateProductId, getOneProduct);

  // App.post(`${API_PREFIX}/create`, createOneProduct);
}

module.exports = campaignsRoutes;
