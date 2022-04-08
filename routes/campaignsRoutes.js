const {
  getAllCampaigns,
} = require("../controllers/campaignsController");

/**
 * @constant
 * @type {string}
 */
const API_PREFIX = "/api/campaigns";

/**
 * @typedef {Function} get
 * @typedef {Function} post
 * @typedef {{
 *  get: get
 * }} Application
 *
 * @param {Application} App
 * @returns {void}
 */
function campaignsRoutes(App) {
  App.get(`${API_PREFIX}/all`, getAllCampaigns);
}

module.exports = campaignsRoutes;
