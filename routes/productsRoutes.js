const {
  getOneProduct,
  getAllProducts,
  getAllProductsByCategory,
} = require("../controllers/productsController");

const validateProductId = require("../middleware/validateProductId");
const validateProductCategory = require("../middleware/validateProductCategory");

/**
 * @constant
 * @type {string}
 */
const API_PREFIX = "/api/products";

/**
 * @typedef {Function <(path: string, validateProductId: function, getOneProduct: function) => (returns: any)>} get
 * @typedef {Object <string, get>} Application
 *
 * @param {Application} App
 * @returns {void}
 */
function productsRoutes(App) {
  App.get(`${API_PREFIX}/all`, getAllProducts);

  App.get(`${API_PREFIX}/:category`, validateProductCategory, getAllProductsByCategory);

  App.get(`${API_PREFIX}/details/:id`, validateProductId, getOneProduct);

  // App.post(`${API_PREFIX}/create`, createOneProduct);
}

module.exports = productsRoutes;
