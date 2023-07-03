import { EReduxActionTypes } from "..";
import { IComment, IUser, IVideo } from "../../type";

export const setUser = (user: IUser) => {
  return {
    type: EReduxActionTypes.SET_USER,
    payload: user,
  };
};
export const setVideos = (videos: IVideo[]) => {
  return {
    type: EReduxActionTypes.SET_VIDEOS,
    payload: videos,
  };
};
export const setComments = (comments: IComment[]) => {
  return {
    type: EReduxActionTypes.SET_COMMENTS,
    payload: comments,
  };
};
export const setCommon = (common: any) => {
  return {
    type: EReduxActionTypes.SET_COMMON,
    payload: common,
  };
};
export const clearStore = () => {
  return {
    type: EReduxActionTypes.CLEAR_STORE,
  };
};
export const setIsLoading = (isLoading: boolean) => {
  return {
    type: EReduxActionTypes.SET_IS_LOADING,
    payload: isLoading,
  };
};
export const setSelectedVideo = (video: IVideo) => {
  return {
    type: EReduxActionTypes.SET_SELECTED_VIDEO,
    payload: video,
  };
};

