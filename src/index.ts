import fs from "fs";
import loadConfig from './config';
import swaggerConfig from './config/swagger';
import logger from './services/logger';
import createPrisma from './services/db';
import createServer from './services/server';
import registerRoutes from './modules';
import sensible from '@fastify/sensible';
import swagger from '@fastify/swagger';
import formBody from '@fastify/formbody';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
loadConfig();

const port = 5000;

const startServer = async () => {
  try {
    const server = createServer(logger);
    server.db = createPrisma();
    server.register(swagger, swaggerConfig);
    server.register(sensible);
    server.register(formBody);
    server.register(cors);
    server.register(helmet);
    server.register(registerRoutes, { prefix: '/api' });

    // server.setErrorHandler((error) => {
    //   server.log.error(error);
    // });
    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((err) => {
            console.log(`close application on ${signal}`);
            process.exit(err ? 1 : 0);
          }),
        );
      }
    }
    await server.listen({
      port: port
    });
    const responseYaml = await server.inject("/docs/yaml");
    fs.writeFileSync("docs/openapi.yaml", responseYaml.payload);
  } catch (e) {
    console.error(e);
  }

};

process.on('unhandledRejection', (e) => {
  console.error(e);
  process.exit(1);
});

startServer();

