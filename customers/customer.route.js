'use strict';

const customerController = require('./customer.controller.js');

const routes = [
  {
    method: 'GET',
    path: '/customers',
    config: customerController.getAll
  },
  {
    method: 'GET',
    path: '/customers/{id}',
    config: customerController.getById
  },

];

module.exports = routes;