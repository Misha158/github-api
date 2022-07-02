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

interface IUsersDetailsResponse {
  public_repos: number;
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
  getUsersBySearch: async (userSearch: string) => {
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

      return data.public_repos;
    } catch (error) {
      message.error(error?.message);
      return null;
    }
  },
};
