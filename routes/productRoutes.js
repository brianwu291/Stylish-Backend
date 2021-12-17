const {
  getOneProduct,
} = require('../controllers/productController');

const {
  validateProductId
} = require('../middleware/validateProductId');

/**
 * @constant
 * @type {string}
*/
const API_PREFIX = '/api/product';


/**
 * @typedef {Function <(path: string, validateProductId: function, getOneProduct: function) => (returns: any)>} get
 * @typedef {Object <string, get>} Application
 * 
 * @param {Application} App
 * @returns {void}
*/
function productRoutes(App) {
  App.get(`${API_PREFIX}/:id`, validateProductId, getOneProduct);
}

module.exports = productRoutes;
