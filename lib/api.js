'use strict';

const Omise = require('omise');
const dotenv = require('dotenv').config();
const Joi = require('joi');

let omise = Omise({
  secretKey: process.env.OMISE_SECRET_KEY,  // public key for test
  omiseVersion: '2015-09-10'
});

exports.cards = {
  create: {
    validate: {
      payload: {
        name: Joi.string().required(),
        city: Joi.string().required(),
        postal_code: Joi.number().required(),
        number: Joi.string().required(),
        expiration_month: Joi.number().integer().max(2).required(),
        expiration_year: Joi.number().integer().min(4).max(4).required()
      }
    },
    handler: (request, reply) => {

      let payload = request.payload;

      let card = {
        name: payload.name,
        city: payload.city,
        postal_code: payload.postal_code,
        number: payload.number,
        expiration_month: payload.expiration_month,
        expiration_year: payload.expiration_year
      }

      omise.tokens.create(card).then(token => {

        reply({
          data: token
        });

      });
    }
  }
};

exports.customers = {
  create: {
    handler: (request, reply) => {

      let email = request.payload.email;
      let description = request.payload.description;
      let tokenId = request.payload.token_id;

      omise.customers.create({
        'email': email,
        'description': description,
        'card': tokenId
      }, (err, customer) => {

        if (err) {
          reply({message: err});
        } else {
          reply(customer);
        }
      });
    },
    validate: {
      payload: {
        email: Joi.string().email().required(),
        description: Joi.string().required(),
        tokenId: Joi.string().required()
      }
    }
  },

  update: {
    handler: (request, reply) => {

      let customerId = request.payload.customerId;
      let description = request.payload.description;

      omise.customers.update(customerId, {
        description: description
      }, (err, response) => {

        reply({
          data: response
        });
      })
    }
  },

  list: {
    handler: (request, reply) => {

      omise.customer.list((err, list) => {
        reply({
          data: list.data
        });
      });
    }
  },

  retrieve: {
    handler: (request, reply) => {
      reply({});
    }
  },

  destroy: {
    handler: (request, reply) => {
      reply({});
    }
  }
};
