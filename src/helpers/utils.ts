import { FastifyInstance } from 'fastify';
import logger from 'src/services/logger';
export const isJSON = (data: string) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};
export const healthCheck = (server: FastifyInstance): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    server.db
      .$queryRaw`SELECT 1`
      .then(() => {
        resolve(true);
      })
      .catch((e) => {
        logger.fatal(`prisma error ${e}`);
        reject(false);
      });
  });
};