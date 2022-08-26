import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { bindExamples } from "src/helpers/open-api";
import { FastifyInstance } from "fastify/types/instance";
const orderInput = {
  id: z.string().min(3).max(50).describe("created order id"),
  total: z.number().max(900000).default(100).describe("total bill of order"),
};

const orderGenerated = {
  id: z.string().uuid().describe("order id"),
  createdAt: z.date().describe("when order was created"),
  updatedAt: z.date().describe("when order was last updated"),
};

// Zod schema definitions.
const createOrderBodySchema = z.object({
  ...orderInput,
});

const orderResponseSchema = z
  .object({
    ...orderInput,
    ...orderGenerated,
  })
  .describe("Order response schema");

const getOrderParamsSchema = z.object({
  id: orderGenerated.id,
});
const getOrderQuerySchema = z.object({
  id: z.optional(orderInput.id),
});

// Generate types from zod schemas.
export type CreateOrderInput = z.infer<typeof createOrderBodySchema>;
export type OrderOutput = z.infer<typeof orderResponseSchema>;
export type GetOrderParamsInput = z.infer<typeof getOrderParamsSchema>;
export type GetOrderQueryInput = z.infer<typeof getOrderQuerySchema>;

// Examples of schemas from types definitions.
const exampleOrder: OrderOutput = {
  total: 10_000,
  id: "c165ad23-2ac3-4d80-80d7-d7b6c3e526bd",
  createdAt: new Date(),
  updatedAt: new Date()
};
const createOrderBodySchemaExample: CreateOrderInput = {
  id: exampleOrder.id,
  total: exampleOrder.total
};
const orderResponseSchemaExample: OrderOutput = { ...exampleOrder };
const getOrderParamsSchemaExample: GetOrderParamsInput = {
  id: exampleOrder.id,
};
const getOrderQuerySchemaExample: GetOrderQueryInput = {
  id: exampleOrder.id,
};
const schemaExamples = {
  createOrderBodySchemaExample: createOrderBodySchemaExample,
  orderResponseSchemaExample: orderResponseSchemaExample,
  getOrderParamsSchemaExample: getOrderParamsSchemaExample,
  getOrderQuerySchemaExample: getOrderQuerySchemaExample,
};

// Generate jsonschemas from zod schamas.
const { schemas: orderSchemas, $ref } = buildJsonSchemas(
  {
    createOrderBodySchema: createOrderBodySchema,
    orderResponseSchema: orderResponseSchema,
    getOrderParamsSchema: getOrderParamsSchema,
    getOrderQuerySchema: getOrderQuerySchema,
  },
  {
    $id: "orderSchemas",
  }
);
export const getRef = (server: FastifyInstance) => {
  for (const schema of orderSchemas) {
      if(!server.getSchema(schema.$id))
        server.addSchema(schema);
  }
  return $ref;
}
bindExamples(orderSchemas, schemaExamples);