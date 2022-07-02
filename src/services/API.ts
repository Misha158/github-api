import { message } from "antd";
import {
  Axios,
  getSearchConfig,
  URL_GET_USER_DETAILS,
  URL_GET_USERS,
} from "./config";
import { IUser } from "../interfaces";

interface IUsersResponse {
  items: IUser[];
}

interface IUsersDetailsResponse {
  public_repos: string;
}

export const API = {
  getUsers: async (userSearch: string) => {
    try {
      const { data } = await Axios.get<IUsersResponse>(
        URL_GET_USERS,
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
