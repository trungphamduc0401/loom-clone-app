import { EReduxActionTypes } from "../redux";

export interface IUser {
  _id?: string;
  email?: string;
  name?: string;
  avatar?: string;
  createdAt?: Date;
}
export interface IComment {
  id?: string;
  content?: string;
  commentAt?: string;
  author?: string;
}
export interface IVideo {
  _id?: string;
  url?: string;
  viewers?: any[];
  createdAt?: Date;
  comments?: IComment[];
  userId?: string;
  title?: string;
}
export interface IAction<T> {
  type: EReduxActionTypes;
  payload: T;
}
export interface IRequestCreateUserResponse {
  token: string;
  user: IUser;
}
export interface IRequestGetVideosResponse {
  video: IVideo[];
}
export interface IRequestCreateVideoResponse {
  video: IVideo;
}
