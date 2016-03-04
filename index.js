'use strict';

const Hapi = require('hapi');
const Omise = require('omise');

let omise = Omise({
  secretKey: '',
  omiseVersion: '2015-09-10'
});

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8900
});

server.route(require('./customers/customer.route'));

server.start(err => {
  console.log(`Server running at ${server.info.uri}`);
});