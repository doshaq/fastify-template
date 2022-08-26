import fastify, { FastifyInstance } from "fastify";
import { healthCheck } from "src/helpers/utils";


const healthCheckRoute = async (server: FastifyInstance) => {
  server.get('/health', async (request, reply) => {
    reply.preventCache();
    const [, dbResolved] = await server.to(healthCheck(server));
    if (dbResolved)
      reply.send('OK');
    else
      reply.internalServerError();
  });

};
export default healthCheckRoute;