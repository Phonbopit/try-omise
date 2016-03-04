'use strict';

const Omise = require('omise');
const dotenv = require('dotenv').config();
const Joi = require('joi');

let omise = Omise({
  secretKey: process.env.OMISE_SECRET_KEY,  // public key for test
  omiseVersion: '2015-09-10'
});

exports.customers = {
  create: {
    handler: (request, reply) => {

      let email = request.payload.email;
      let description = request.payload.description;
      let tokenId = request.payload.token_id;

      // console.log(`email : ${email} tokenId : ${tokenId}}`);

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

  list: {
    handler: (request, reply) => {
      reply({message: 'ok list()'});
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
}
