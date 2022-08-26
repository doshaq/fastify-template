import { PrismaClient } from "@prisma/client";

const createPrsima = () =>
  new PrismaClient({
    log: [],
  });

export default createPrsima;

