import axios from "axios";
import { isEmpty } from "lodash";
import { logError } from ".";
export const setAuthorizationHeader = async (token: string) => {
  if (!isEmpty(token)) {
    try {
      await axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    } catch (err) {
      logError(err);
    }
  }
};
