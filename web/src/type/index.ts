import { EReduxActionTypes } from "../redux";

export interface IUser {
  email?: string;
  name?: string;
  avatar?: string;
  createdAt?: Date;
}
export interface IComment {
  id?: string;
  content?: string;
  commentAt?: Date;
  author?: string;
}
export interface IVideo {
  url?: string;
  viewers?: number;
  createdAt?: Date;
  comments?: string[];
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
  videos: IVideo[];
}
