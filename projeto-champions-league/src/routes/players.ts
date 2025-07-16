import { Router, Request, Response } from "express";
import PlayerController from "../controllers/playerController";
import PlayersService from "../services/playersServices";
import {
  validatePlayerIdParam,
  validatePlayerBody,
} from "../middlewares/playersMiddleware";

const playersRouter = Router();
const playerController = new PlayerController(new PlayersService());

playersRouter.get("/players", async (_req: Request, res: Response) => {
  await playerController.getAllPlayers(_req, res);
});

playersRouter.get(
  "/players/:id",
  validatePlayerIdParam,
  async (req: Request, res: Response) => {
    await playerController.getPlayerById(req, res);
  }
);

playersRouter.post(
  "/players",
  validatePlayerBody,
  async (req: Request, res: Response) => {
    await playerController.addPlayer(req, res);
  }
);

playersRouter.put(
  "/players/:id",
  validatePlayerIdParam,
  validatePlayerBody,
  async (req: Request, res: Response) => {
    await playerController.updatePlayer(req, res);
  }
);

playersRouter.delete(
  "/players/:id",
  validatePlayerIdParam,
  async (req: Request, res: Response) => {
    await playerController.deletePlayer(req, res);
  }
);

export default playersRouter;
