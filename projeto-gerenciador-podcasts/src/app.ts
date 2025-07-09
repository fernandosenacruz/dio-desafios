import * as http from "http";
import { PodcastsRoutes } from "./routes/podcastsRoutes.js";

export const app = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  if (req.method === "GET") {
    await PodcastsRoutes.getAll(req, res);
  }
};
