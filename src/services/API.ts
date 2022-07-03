import { message } from "antd";
import {
  Axios,
  getSearchConfig,
  URL_GET_USER_DETAILS,
  URL_GET_USERS_BY_SEARCH,
  URL_GET_USERS,
} from "./config";
import { IUser } from "../interfaces";

interface IUsersBySearchResponse {
  items: IUser[];
}

export interface IUsersDetailsResponse {
  avatar_url: string;
  created_at: string;
  location: string;
  email: string;
  login: string;
  bio: string | null;
  followers: number;
  following: number;
}

export interface IReposResponse {
  name: string;
  forks: string;
  stargazers_count: string;
  stars: string;
  repo_url: string;
  html_url: string;
}

export interface IReposResponseNew {
  name: string;
  forks: string;
  stars: string;
  repo_url: string;
}

export const API = {
  getUsers: async () => {
    try {
      const { data } = await Axios.get<IUser[]>(URL_GET_USERS);
      return data;
    } catch (error) {
      message.error(error?.message);
      return null;
    }
  },
  getUsersBySearch: async (userSearch: string | (string | null)[]) => {
    try {
      const { data } = await Axios.get<IUsersBySearchResponse>(
        URL_GET_USERS_BY_SEARCH,
        getSearchConfig(userSearch)
      );

      return data.items;
    } catch (error) {
      message.error(error?.message);
      return null;
    }
  },

  getUserDetails: async (id: string) => {
    try {
      const { data } = await Axios.get<IUsersDetailsResponse>(
        `${URL_GET_USER_DETAILS}/${id}`
      );

      return data;
    } catch (error) {
      message.error(error?.message);
      return null;
    }
  },
  getRepositoriesByUserName: async (userName: string) => {
    try {
      const { data } = await Axios.get<IReposResponse[]>(
        `users/${userName}/repos`
      );

      return data.map((repo: IReposResponse) => ({
        name: repo.name,
        forks: repo.forks,
        stars: repo.stargazers_count,
        repo_url: repo.html_url,
      }));
    } catch (error) {
      message.error(error?.message);
      return null;
    }
  },
};
