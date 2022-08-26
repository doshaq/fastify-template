import fastify, { FastifyInstance } from "fastify";
import { healthCheck } from "src/helpers/utils";


const healthCheckRoute = async (server: FastifyInstance) => {
  server.get('/health', async (request, reply) => {
    reply.preventCache();
    const [error, resolve] = await server.to(healthCheck(server));
    if (error)
      reply.status(200).send('OK');
    else
      reply.status(500).send('ERROR');
  });

};
export default healthCheckRoute;