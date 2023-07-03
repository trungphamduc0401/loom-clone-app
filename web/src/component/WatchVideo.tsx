import { useCallback, useState } from "react";
import SearchInput from "./SearchInput";
import { IComment, IVideo } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { sGetSelectedVideo, sGetUser } from "../redux/common/selector";
import RenderItem from "./RenderItem";
import RenderComment from "./RenderComment";
import { set } from "lodash";
import { setSelectedVideo } from "../redux/common/action";
import { EReduxActionTypes } from "../redux";
const WatchVideo = () => {
  const selectedVideo = useSelector(sGetSelectedVideo);
  const user = useSelector(sGetUser);
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const onClickCloseWatchVideo = useCallback(() => {
    dispatch(setSelectedVideo({}));
  }, [dispatch]);
  const onPostComment = useCallback(() => {
    dispatch({
      type: EReduxActionTypes.CREATE_COMMENT_ASYNC_ACTION,
      payload: {
        comment: { content: commentInput, author: user?._id },
        videoId: selectedVideo?._id,
      },
    });
    setCommentInput("");
  }, [dispatch, commentInput, selectedVideo, user]);
  return (
    <div className="w-screen h-screen bg-[#131327] flex flex-col dark flex flex-col">
      <div className="h-[160px] w-full bg-[#383d51]">
        <div className="w-[90%] mx-auto h-full flex flex-row justify-between items-center">
          <div className="flex flex-col justify-center h-full w-fit">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-fit mb-[12px]">
              {selectedVideo?.title}
            </h5>
            <div className="flex items-space w-fit">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.avatar}
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0 pl-[12px]">
                <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="cursor-pointer" onClick={onClickCloseWatchVideo}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="m9.414 8 5.293-5.293a1 1 0 1 0-1.414-1.414L8 6.586 2.707 1.293a1 1 0 0 0-1.414 1.414L6.586 8l-5.293 5.293a1 1 0 1 0 1.414 1.414L8 9.414l5.293 5.293a1 1 0 0 0 1.414-1.414L9.414 8Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full flex-1">
        <div className="w-[90%] mx-auto h-full flex flex-row items-center">
          <video
            className="w-[70%] w-auto max-w-[1400px] border border-gray-200 rounded-lg dark:border-gray-700"
            controls
          >
            <source src={selectedVideo?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex-1 bg-[#131327] rounded-tr-[12px] rounded-br-[12px] flex flex-col pl-[24px] overflow-y-auto h-[600px]">
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 ">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label className="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                  required
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                  onClick={onPostComment}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Post comment
                </button>
                <div className="flex pl-0 space-x-1 sm:pl-2">
                  <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Attach file</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Set location</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Upload image</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-[#131327]">
              <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-[12px]">
                {selectedVideo?.comments?.map((item) => (
                  <RenderComment comment={item} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WatchVideo;
