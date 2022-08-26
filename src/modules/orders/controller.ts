import { v4 as uuidv4 } from "uuid";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateOrderInput,
  GetOrderParamsInput,
  GetOrderQueryInput,
} from "src/schema/order.schema";

export const createOrderHandler = async (
  request: FastifyRequest<{ Body: CreateOrderInput; }>,
  reply: FastifyReply
) => {
  const [error, order] = await request.server.to(request.server.db.order.create({
    data: {
      total: request.body.total
    }
  }));
  if (!!order)
    reply.send(order);
  else
    reply.internalServerError();
};

export const getOrderHandler = async (
  request: FastifyRequest<{ Params: GetOrderParamsInput; }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const [error, order] = await request.server.to(request.server.db.order.findFirst({
    where: {
      id: id,
    }
  }));
  console.log('odd', error);
  if (!!order)
    reply.send(order);
  else
    reply.notFound();
};
export const getOrdersHandler = async (
  request: FastifyRequest<{ Querystring: GetOrderQueryInput; }>,
  reply: FastifyReply
) => {
  const { createdAt } = request.query;
  const [error, order] = await request.server.to(request.server.db.order.findMany({
    where: {
      createdAt: createdAt
    }
  }));
  console.log('odd', error);
  if (!!order)
    reply.send(order);
  else
    reply.notFound();
};