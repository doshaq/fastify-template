import { withRefResolver } from "fastify-zod";

const swaggerConfig = withRefResolver({
  routePrefix: "/docs",
  exposeRoute: true,
  staticCSP: true,
  openapi: {
    info: {
      title: "Template fastify API.",
      description:
        "zod typescript fastify",
      version: "1.0.0",
    },
  },
});
export default swaggerConfig;