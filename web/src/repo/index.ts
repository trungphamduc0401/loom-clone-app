import axios from "axios";
import env from "../env";
import {
  IRequestCreateUserResponse,
  IRequestGetVideosResponse,
  IUser,
} from "../type";
export const requestCreateUser = (payload: IUser) => {
  return axios
    .post<IRequestCreateUserResponse>(`${env.baseUrl}user`, payload)
    ?.then((res) => res.data);
};

export const requestGetVideos = () => {
  return axios
    .get<IRequestGetVideosResponse>(`${env.baseUrl}video`, {})
    .then((res) => res.data);
};
