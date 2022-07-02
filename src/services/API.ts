import axios from "axios";

const token = import.meta.env.VITE_TOKEN;
const URL_GET_USERS = "https://api.github.com/search/users";
const URL_GET_USER_DETAILS = "https://api.github.com/user";

export const API = {
  getUsers: async (userSearch: string) =>
    axios.get(URL_GET_USERS, {
      params: {
        q: userSearch || null,
      },
      headers: {
        Authorization: `token ${token}`,
      },
    }),

  getUserDetails: async (id: string) =>
    axios.get(`${URL_GET_USER_DETAILS}/${id}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    }),
};
