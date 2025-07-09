import { IncomingMessage, ServerResponse } from "http";
import { PodcastsService } from "../services/podcastsService.js";

export class PodcastsController {
  public static async getAll(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    try {
      if (!req.url || !req.headers.host) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "URL inválida." }));
        return;
      }

      const url = new URL(req.url, `http://${req.headers.host}`);
      const filters = {
        podcastName: url.searchParams.get("podcastName") ?? undefined,
        category: url.searchParams.get("category") ?? undefined,
      };

      const { statusCode, body } = await PodcastsService.getAll(filters);

      res.writeHead(statusCode, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    } catch (error) {
      console.error("Erro ao obter podcasts:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Erro interno no servidor.",
          error: error instanceof Error ? error.message : String(error),
        })
      );
    }
  }
}
