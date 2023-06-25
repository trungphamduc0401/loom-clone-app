import { EReduxActionTypes, defaultState } from "..";
interface IAction {
  type: EReduxActionTypes;
  payload: any;
}
const commonReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case EReduxActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case EReduxActionTypes.SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case EReduxActionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case EReduxActionTypes.SET_COMMON:
      return {
        ...state,
        common: action.payload,
      };
    case EReduxActionTypes.CLEAR_STORE:
      return {
        ...state,
        user: undefined,
        videos: [],
        comments: [],
        common: {},
      };
    case EReduxActionTypes.SET_IS_LOADING:
      return {
        ...state,
        common: {
          ...state.common,
          isLoading: action.payload,
        },
      };
    case EReduxActionTypes.SET_SELECTED_VIDEO:
      return {
        ...state,
        selectedVideo: action.payload,
      };
    default:
      return state;
  }
};
export default commonReducer;
