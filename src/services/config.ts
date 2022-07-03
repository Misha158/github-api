import axios from "axios";

const token = import.meta.env.VITE_TOKEN_NEW;
export const URL_GET_USERS = "/users";
export const URL_GET_USERS_BY_SEARCH = "/search/users";
export const URL_GET_USER_DETAILS = "/user";

const baseURL = "https://api.github.com";

export const Axios = axios.create({
  baseURL,
  headers: {
    Authorization: `token ${token}`,
  },
});

export const getSearchConfig = (userSearch: string | (string | null)[]) => ({
  params: {
    q: userSearch || null,
  },
});
