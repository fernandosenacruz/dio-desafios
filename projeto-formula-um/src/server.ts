import fastify from "fastify";
import cors from "@fastify/cors";
import { StatusCodes } from "http-status-codes";

import { teams } from "./data/teams";
import { drivers } from "./data/drivers";

const server = fastify();

server.register(cors, {
  origin: "*",
  methods: ["GET"],
});

server.get("/teams", async (_request, response) => {
  response.type("application/json").code(StatusCodes.OK);
  response.send({ teams });
});

server.get("/drivers", async (_request, response) => {
  response.type("application/json").code(StatusCodes.OK);
  return response.send({ drivers });
});

server.get<{ Params: { id: string } }>(
  "/drivers/:id",
  async (request, response) => {
    const { id } = request.params;
    const driver = drivers.find((d) => d.driver_number === +id);

    if (!driver) {
      response.type("application/json").code(StatusCodes.NOT_FOUND);
      return response.send({ error: "Driver not found" });
    }

    response.type("application/json").code(StatusCodes.OK);
    return response.send({ driver });
  }
);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
