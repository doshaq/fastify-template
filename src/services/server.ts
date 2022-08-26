import fastify from "fastify";
import { Logger } from "pino";

const createServer = (logger: Logger) => fastify({
  logger: logger,
  ajv: {
    customOptions: {
      strict: "log",
      keywords: ["example"],
    },
  },
});
const addPlugin = () => {

};
export default createServer;