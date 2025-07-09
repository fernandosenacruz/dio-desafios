import { StatusCodes } from "http-status-codes";
import { PodcastFilters, PodcastResponse } from "../interfaces/podcasts.js";
import { PodcastsRepository } from "../repositories/podcastsRepository.js";

export class PodcastsService {
  public static async getAll(
    filters: PodcastFilters
  ): Promise<PodcastResponse> {
    const podcasts = await PodcastsRepository.getAll(filters);
    const response: PodcastResponse = {
      statusCode: StatusCodes.OK,
      body: podcasts,
    };

    return response;
  }
}
