'use strict';

const api = require('./api');

module.exports = [
  {
    method: 'GET',
    path: '/customers',
    config: api.customers.list
  },
  {
    method: 'GET',
    path: '/customers/{id}',
    config: api.customers.retrieve
  },
  {
    method: 'POST',
    path: '/customers',
    config: api.customers.create
  }

];
