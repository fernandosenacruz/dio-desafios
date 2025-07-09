import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { Podcast, PodcastFilters } from "../interfaces/podcasts.js";

const __filename = fileURLToPath(import.meta.url);
dirname(__filename);

const filePath = fileURLToPath(
  new URL("../../data/podcasts.json", import.meta.url)
);

export class PodcastsRepository {
  public static async getAll(filters: PodcastFilters): Promise<Podcast[]> {
    try {
      const data = await fs.promises.readFile(filePath, "utf-8");
      let podcasts: Podcast[] = JSON.parse(data);

      if (filters.podcastName) {
        podcasts = podcasts.filter(
          (p) =>
            p.podcastName.toLowerCase() === filters.podcastName!.toLowerCase()
        );
      }

      if (filters.category) {
        podcasts = podcasts.filter(
          (p) =>
            Array.isArray(p.categories) &&
            p.categories.some(
              (c) => c.toLowerCase() === filters.category!.toLowerCase()
            )
        );
      }

      return podcasts;
    } catch (error) {
      console.error("Error reading podcasts file:", error);
      throw new Error("Could not read podcasts data");
    }
  }
}
