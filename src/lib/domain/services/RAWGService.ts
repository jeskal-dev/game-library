import { inject, Injectable } from "@/core";
import axios from "axios";
import { ConfigService } from "./ConfigService";
import type { RAWGGameRequest } from "../request/RAWGRequest";
import { parseFilters } from "@/lib/helpers/parseFilters";
import type { RAWGResponse } from "../response/RAWGResponse";
import type { Game } from "../models";

@Injectable()
export class RAWGService {
  private readonly config = inject(ConfigService);
  private readonly http;
  private readonly baseURL = "https://api.rawg.io/api";

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      params: {
        key: this.config.get("API_KEY"),
      },
    });
  }

  async fetchGames(params?: RAWGGameRequest) {
    const parsedParams = parseFilters(params);
    const { data: response } = await this.http.get("/games", {
      params: parsedParams,
    });
    return response as RAWGResponse<Game>;
  }

  async fetchGenres() {
    const { data } = await this.http.get("/genres");
  }
  async fetchTags() {}
  async fetchPublisher() {}
  async fetchPlatforms() {}
}
