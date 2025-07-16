import { Request, Response } from "express";
import PlayersService from "../services/playersServices";

import { StatusCodes } from "http-status-codes";

export class PlayerController {
  private readonly playersService: PlayersService;

  constructor(playersService: PlayersService) {
    this.playersService = playersService;
  }

  async getAllPlayers(_req: Request, res: Response): Promise<Response> {
    try {
      const players = await this.playersService.getAllPlayers();
      return res.status(StatusCodes.OK).json(players);
    } catch (error) {
      console.error("Error fetching players:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error fetching players" });
    }
  }

  async getPlayerById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const player = await this.playersService.getPlayerById(Number(id));
      if (!player) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Player not found" });
      }
      return res.status(StatusCodes.OK).json(player);
    } catch (error) {
      console.error("Error fetching player:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error fetching player" });
    }
  }

  async addPlayer(req: Request, res: Response): Promise<Response> {
    const player = req.body;
    try {
      await this.playersService.addPlayer(player);
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "Player added successfully" });
    } catch (error) {
      console.error("Error adding player:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error adding player" });
    }
  }

  async updatePlayer(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const playerUpdates = req.body;
    try {
      const updatedPlayer = await this.playersService.updatePlayer(
        Number(id),
        playerUpdates
      );
      if (!updatedPlayer) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Player not found" });
      }
      return res.status(StatusCodes.OK).json(updatedPlayer);
    } catch (error) {
      console.error("Error updating player:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error updating player" });
    }
  }

  async deletePlayer(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const deleted = await this.playersService.deletePlayer(Number(id));
      if (!deleted) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Player not found" });
      }
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      console.error("Error deleting player:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error deleting player" });
    }
  }
}

export default PlayerController;
