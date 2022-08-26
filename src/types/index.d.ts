import { PrismaClient } from "@prisma/client";
import { JsonSchema } from "fastify-zod";

declare module "fastify-zod" {
  type MyJsonSchema = JsonSchema & {
    properties?: {
      [key: string]: {
        type: string;
        properties: {
          [key: string]: object;
        };
        example: object;
      };
    };
  };
}
declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient
    
  }
}