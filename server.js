'use strict'

const Fastify = require('fastify')
const fastifyCors = require('@fastify/cors');
const hookLoggingPlugin = require('./hookLogging');

(async function startServer () {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  });
  fastify.register(hookLoggingPlugin);
  fastify.register(fastifyCors, {
    // hook: 'preHandler',
    delegator: (req, callback) => {
      const corsOptions = { origin: false };
      if (/^success$/m.test(req.headers.origin)) {
        corsOptions.origin = true;
      }
      callback(null, corsOptions);
    },
  });

  fastify.get('/', async function (request, reply) {
    return reply.code(200).type('text/plain').send('Hello world');
  })

  fastify.post('/', async function (request, reply) {
    return reply.code(200).type('text/plain').send('Hello world');
  })

  fastify.setNotFoundHandler(async (_request, reply) => {
    reply.code(404).type('text/plain').send('Not found');
  });
  
  return fastify.listen({ port: 3000 });
})();
