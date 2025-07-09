import { StatusCodes } from "http-status-codes";

export interface Podcast {
  podcastName: string;
  episode: string;
  videoId: string;
  categories: string[];
}

export interface PodcastResponse {
  statusCode: StatusCodes;
  body: Podcast[];
}

export interface PodcastFilters {
  podcastName?: string;
  category?: string;
}
