const {
  getOneProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByKeyword,
} = require("../controllers/productsController");

const validateProductId = require("../middleware/validateProductId");
const validateProductCategory = require("../middleware/validateProductCategory");
const validateSearchProductsKeyword = require("../middleware/validateSearchProductsKeyword");

/**
 * @constant
 * @type {string}
 */
const API_PREFIX = "/api/products";

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
function productsRoutes(App) {
  App.get(`${API_PREFIX}/all`, getAllProducts);

  App.get(`${API_PREFIX}/search`, validateSearchProductsKeyword, getProductsByKeyword);

  App.get(`${API_PREFIX}/:category`, validateProductCategory, getProductsByCategory);

  App.get(`${API_PREFIX}/details/:id`, validateProductId, getOneProduct);

  // App.post(`${API_PREFIX}/create`, createOneProduct);
}

module.exports = productsRoutes;
