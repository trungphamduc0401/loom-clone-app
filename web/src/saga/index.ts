import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { EReduxActionTypes } from "../redux";
import {
  requestCreateComment,
  requestCreateUser,
  requestDeleteVideo,
  requestGetVideos,
  requestUpdateVideo,
} from "../repo";
import { logError } from "../util";
import {
  IAction,
  IComment,
  IRequestCreateUserResponse,
  IRequestGetVideosResponse,
  IVideo,
} from "../type";
import { setAuthorizationHeader } from "../util/axios";
import { setSelectedVideo } from "../redux/common/action";
import { sGetSelectedVideo, sGetVideos } from "../redux/common/selector";

function* loginAction(action: IAction<any>) {
  try {
    yield put({ type: EReduxActionTypes.SET_IS_LOADING, payload: true });
    const response: IRequestCreateUserResponse = yield call(
      requestCreateUser,
      action.payload
    );
    yield call(setAuthorizationHeader, response.token);
    yield put({ type: EReduxActionTypes.SET_USER, payload: response.user });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: EReduxActionTypes.SET_IS_LOADING, payload: false });
  }
}
function* watchLogin() {
  yield takeEvery(EReduxActionTypes.LOGIN_ASYNC_ACTION, loginAction);
}

function* setVideos() {
  try {
    const response: IRequestGetVideosResponse = yield call(requestGetVideos);
    yield put({ type: EReduxActionTypes.SET_VIDEOS, payload: response.video });
    const videos: IVideo[] = yield select(sGetVideos);
    const selectedVideo: IVideo = yield select(sGetSelectedVideo);
    const selectedVideoLatest = videos.find(
      (video) => video._id === selectedVideo._id
    );
    yield put(setSelectedVideo(selectedVideoLatest as IVideo));
  } catch (error) {
    logError(error);
  }
}
function* watchSetVideos() {
  yield takeEvery(EReduxActionTypes.SET_VIDEOS_ASYNC_ACTION, setVideos);
}

function* updateTitleVideo(action: IAction<IVideo>) {
  try {
    yield call(requestUpdateVideo, action.payload);
    yield put({ type: EReduxActionTypes.SET_VIDEOS_ASYNC_ACTION });
  } catch (error) {
    logError(error);
  }
}
function* watchUpdateTitleVideo() {
  yield takeEvery(
    EReduxActionTypes.UPDATE_TITLE_VIDEO_ASYNC_ACTION,
    updateTitleVideo
  );
}
function* createComment(
  action: IAction<{ comment: IComment; videoId: string }>
) {
  try {
    yield call(
      requestCreateComment,
      action.payload.comment,
      action.payload.videoId
    );
    yield put({ type: EReduxActionTypes.SET_VIDEOS_ASYNC_ACTION });
  } catch (error) {
    logError(error);
  }
}
function* watchCreateComment() {
  yield takeEvery(EReduxActionTypes.CREATE_COMMENT_ASYNC_ACTION, createComment);
}

function* deleteVideo(action: IAction<IVideo>) {
  try {
    yield call(requestDeleteVideo, action.payload);
    yield put({ type: EReduxActionTypes.SET_VIDEOS_ASYNC_ACTION });
  } catch (error) {
    logError(error);
  }
}
function* watchDeleteVideo() {
  yield takeEvery(EReduxActionTypes.DELETE_VIDEO_ASYNC_ACTION, deleteVideo);
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSetVideos(),
    watchUpdateTitleVideo(),
    watchCreateComment(),
    watchDeleteVideo(),
  ]);
}
