import axios from "axios";

const token = import.meta.env.VITE_TOKEN;
export const URL_GET_USERS = "/search/users";
export const URL_GET_USER_DETAILS = "/user";

const baseURL = "https://api.github.com";

export const Axios = axios.create({
  baseURL,
  headers: {
    Authorization: `token ${token}`,
  },
});

export const getSearchConfig = (userSearch: string) => ({
  params: {
    q: userSearch || null,
  },
});
