import { IDefaultState } from "..";

export const sGetUser = (state: IDefaultState) => state.user;
export const sGetVideos = (state: IDefaultState) => state.videos;
export const sGetComments = (state: IDefaultState) => state.comments;
export const sGetCommon = (state: IDefaultState) => state.common;
export const sGetIsLoading = (state: IDefaultState) => state.common?.isLoading;
export const sGetSelectedVideo = (state: IDefaultState) => state.selectedVideo;
