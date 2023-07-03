import axios from "axios";
import env from "../env";
import {
  IComment,
  IRequestCreateUserResponse,
  IRequestCreateVideoResponse,
  IRequestGetVideosResponse,
  IUser,
  IVideo,
} from "../type";
export const requestCreateUser = (payload: IUser) => {
  return axios
    .post<IRequestCreateUserResponse>(`${env.baseUrl}user`, payload)
    ?.then((res) => res.data);
};

export const requestGetVideos = () => {
  return axios
    .get<IRequestGetVideosResponse>(`${env.baseUrl}video`, {
      params: { page: 1 },
    })
    .then((res) => res.data);
};
export const requestCreateVideo = (payload: IVideo) => {
  return axios
    .post<IRequestCreateVideoResponse>(`${env.baseUrl}video`, payload)
    .then((res) => res.data);
};
export const requestUpdateVideo = (payload: IVideo) => {
  return axios
    .post<IRequestCreateVideoResponse>(`${env.baseUrl}video/${payload._id}`, {
      title: payload.title,
    })
    .then((res) => res.data);
};
export const requestCreateComment = (payload: IComment, videoId: string) => {
  return axios
    .post<any>(`${env.baseUrl}video/comment/${videoId}`, {
      userId: payload?.author,
      content: payload?.content,
    })
    .then((res) => res.data);
};

export const requestDeleteVideo = (payload: IVideo) => {
  return axios
    .delete<IRequestCreateVideoResponse>(`${env.baseUrl}video/${payload._id}`)
    .then((res) => res.data);
};
