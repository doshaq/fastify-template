import { v4 as uuidv4 } from "uuid";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateOrderInput,
  GetOrderParamsInput,
} from "src/schema/order.schema";

export const createOrderHandler = async (
  request: FastifyRequest<{ Body: CreateOrderInput; }>,
  reply: FastifyReply
) => {
  // Generate attributes.
  const id = uuidv4();
  const createdAt = new Date();
  const updatedAt = new Date();
  // TODO: Register to repository.
  const order = await request.server.db?.order.create({
    data: {
      total: 100
    }
  });
  reply.code(201).send({
    id: 'xcz',
    createdAt,
    updatedAt,
    total: order?.total,
  });
};

export const getOrderHandler = async (
  request: FastifyRequest<{ Params: GetOrderParamsInput; }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  // TODO: Fetch from repository.
  // const order = await request.prisma.order.findFirst({
  //   where: {
  //   id:1
  //   }
  // })
  reply.code(200).send({
    id,
    total: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};