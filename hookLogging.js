'use strict';

const fp = require('fastify-plugin');

const hookLogging = async (fastify, _opts) => {
  [
    'onRequest',
    'preParsing',
    'preValidation',
    'preHandler',
    'onSend',
    'onResponse'
  ].forEach((hook, index) => {
    fastify.addHook(hook, async (request, reply) => {
      request.log.warn('%s - %s', index, hook);
    });
  });
};

module.exports = fp(hookLogging, {
  fastify: '4.x',
  name: 'hookLogging',
});
