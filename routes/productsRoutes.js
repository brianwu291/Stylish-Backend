import {
  getOneProduct,
  createOneProduct,
} from '../controllers/productsController.js';

import {
  validateProductId
} from '../middleware/validateProductId.js';

/**
 * @constant
 * @type {string}
*/
const API_PREFIX = '/api/products';


/**
 * @typedef {Function <(path: string, validateProductId: function, getOneProduct: function) => (returns: any)>} get
 * @typedef {Object <string, get>} Application
 * 
 * @param {Application} App
 * @returns {void}
*/
function productsRoutes(App) {
  App.get(`${API_PREFIX}/:id`, validateProductId, getOneProduct);

  App.post(`${API_PREFIX}/create`, createOneProduct)
}

export default productsRoutes;
