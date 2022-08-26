import { FastifyInstance } from "fastify";
import { createOrderHandler, getOrderHandler } from "./controller";
import { getRef } from "src/schema/order.schema";

const orderRoutes = async (server: FastifyInstance) => {
  const $ref = getRef(server);
  server.post("/", {
    schema: {
      body: $ref("createOrderBodySchema"),
      response: {
        200: { ...$ref("orderResponseSchema"), description: "order successfuly added" },
      },
      tags: ["Order"],
    },
    handler: createOrderHandler,
  });
  server.get("/", {
    schema: {
      querystring: $ref("getOrderQuerySchema"),
      response: {
        200: {
          ...$ref("orderResponseSchema"),
          description: "Order queried successfully",
        },
      },
      tags: ["Order"],
    },
    handler: getOrderHandler,
  });
  server.get("/:id", {
    schema: {
      params: $ref("getOrderParamsSchema"),
      querystring: $ref("getOrderQuerySchema"),
      response: {
        200: {
          ...$ref("orderResponseSchema"),
          description: "Order queried successfully",
        },
      },
      tags: ["Order"],
    },
    handler: getOrderHandler,
  });
};

export default orderRoutes;