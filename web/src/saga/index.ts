import { all, call, put, takeEvery } from "redux-saga/effects";
import { EReduxActionTypes } from "../redux";
import { requestCreateUser, requestGetVideos } from "../repo";
import { logError } from "../util";
import { IAction, IRequestCreateUserResponse, IVideo } from "../type";
import { setAuthorizationHeader } from "../util/axios";

function* loginAction(action: IAction<any>) {
  try {
    yield put({ type: EReduxActionTypes.SET_IS_LOADING, payload: true });
    const response: IRequestCreateUserResponse = yield call(
      requestCreateUser,
      action.payload
    );
    console.log(response);
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
    const response: IVideo[] = yield call(requestGetVideos);
    yield put({ type: EReduxActionTypes.SET_VIDEOS, payload: response });
  } catch (error) {
    logError(error);
  }
}
function* watchSetVideos() {
  yield takeEvery(EReduxActionTypes.SET_VIDEOS_ASYNC_ACTION, setVideos);
}
export default function* rootSaga() {
  yield all([watchLogin(), watchSetVideos()]);
}
