import { PrismaClient } from "@prisma/client";

const createPrsima = () =>
  new PrismaClient({
    log: ["error", 'warn', 'info', 'query'],
  });

export default createPrsima;

