import { inject, Injectable } from "@/core";
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { ConfigService } from "./ConfigService";
import type { RAWGGameRequest, RAWGPageRequest } from "../request/RAWGRequest";
import { parseFilters } from "@/lib/helpers/parseFilters";
import type { RAWGResponse } from "../response/RAWGResponse";
import type { Game, Genre, Platform, Publisher, Tag } from "../models";

@Injectable()
export class RAWGService {
  private readonly config = inject(ConfigService);
  private readonly http: AxiosInstance;
  private readonly baseURL = "https://api.rawg.io/api";

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      params: {
        key: this.config.get("API_KEY"),
      },
    });
  }

  async fetchGames(params?: RAWGGameRequest, config?: AxiosRequestConfig) {
    const parsedParams = parseFilters(params);
    const { data: response } = await this.http.get("/games", {
      params: parsedParams,
      ...config,
    });
    return response as RAWGResponse<Game>;
  }

  async fetchGenres(params?: RAWGPageRequest, config?: AxiosRequestConfig) {
    const parsedParams = parseFilters(params);
    const { data: response } = await this.http.get("/genres", {
      params: parsedParams,
      ...config,
    });

    return response as RAWGResponse<Genre>;
  }
  async fetchTags(params?: RAWGPageRequest, config?: AxiosRequestConfig) {
    const parsedParams = parseFilters(params);
    const { data: response } = await this.http.get("/tags", {
      params: parsedParams,
      ...config,
    });
    return response as RAWGResponse<Tag>;
  }
  async fetchPublishers(params?: RAWGPageRequest, config?: AxiosRequestConfig) {
    const parsedParams = parseFilters(params);
    const { data: response } = await this.http.get("/publishers", {
      params: parsedParams,
      ...config,
    });

    return response as RAWGResponse<Publisher>;
  }
  async fetchPlatforms(params?: RAWGPageRequest, config?: AxiosRequestConfig) {
    const parsedParams = parseFilters(params);

    const { data: response } = await this.http.get("/platforms", {
      params: parsedParams,
      ...config,
    });

    return response as RAWGResponse<Platform>;
  }
}
