import { IComment, IUser, IVideo } from "../type";
import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";
export interface ICommonState {
  isLoading?: boolean;
}
export interface IDefaultState {
  user?: IUser;
  videos?: IVideo[];
  comments?: IComment[];
  common?: ICommonState;
  selectedVideo?: IVideo;
}
export const defaultState: IDefaultState = {
  user: undefined,
  videos: [],
  comments: [],
  common: {
    isLoading: false,
  },
  selectedVideo: undefined,
};
export enum EReduxActionTypes {
  SET_USER = "SET_USER",
  SET_VIDEOS = "SET_VIDEOS",
  SET_COMMENTS = "SET_COMMENTS",
  SET_COMMON = "SET_COMMON",
  CLEAR_STORE = "CLEAR_STORE",
  LOGIN_ASYNC_ACTION = "LOGIN_ASYNC_ACTION",
  SET_VIDEOS_ASYNC_ACTION = "SET_VIDEOS_ASYNC_ACTION",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_SELECTED_VIDEO = "SET_SELECTED_VIDEO",
  UPDATE_TITLE_VIDEO_ASYNC_ACTION = "UPDATE_TITLE_VIDEO_ASYNC_ACTION",
  CREATE_COMMENT_ASYNC_ACTION = "CREATE_COMMENT_ASYNC_ACTION",
  DELETE_VIDEO_ASYNC_ACTION = "DELETE_VIDEO_ASYNC_ACTION",
}
const sagaMiddleware = createSagaMiddleware();
export default configureStore({
  reducer: commonReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
