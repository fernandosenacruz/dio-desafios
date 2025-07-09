import { IncomingMessage, ServerResponse } from "http";
import { PodcastsController } from "../controllers/podcastsController.js";

export class PodcastsRoutes {
  public static async getAll(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    await PodcastsController.getAll(req, res);
  }
}
