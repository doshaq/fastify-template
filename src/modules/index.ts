import { FastifyInstance } from "fastify";
import healthCheck from "./health-check";
import orderRoutes from "./orders";

const registerRoutes = (server: FastifyInstance) => {
  server.register(healthCheck, { prefix: '' });
  server.register(orderRoutes, { prefix: '/order' });
  return server;
};

export default registerRoutes;