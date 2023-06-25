import { useDispatch, useSelector } from "react-redux";
import { IVideo } from "../type";
import { sGetUser } from "../redux/common/selector";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { set } from "lodash";
import { setSelectedVideo } from "../redux/common/action";

const RenderItem = ({ video }: { video: IVideo }) => {
  const [isHover, setIsHover] = useState(false);
  const [shouldShowActionButton, setShouldShowActionButton] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const dispatch = useDispatch();
  const [latestVideo, setLatestVideo] = useState<IVideo>(video);
  const onMouseOver = useCallback(() => {
    setIsHover(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHover(false);
    setShouldShowActionButton(false);
  }, []);
  const user = useSelector(sGetUser);
  const onClickWatchVideo = useCallback(() => {
    dispatch(setSelectedVideo(video));
  }, [video, dispatch]);
  const onBlurInput = useCallback(() => {
    setIsRenaming(false);
  }, []);
  const onChangeInput = useCallback((e: any) => {
    setLatestVideo((value) => ({
      ...value,
      title: e.target.value,
    }));
  }, []);
  return (
    <div
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className="relative w-[24%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-fit dark:hover:bg-gray-700 dark:hover:border-blue-800 "
    >
      <a href="#">
        <video autoPlay className="rounded-tr-[12px] rounded-tl-[12px]">
          <source src={video.url} type="video/mp4" />
        </video>
      </a>
      <div className="px-5 pb-5 mt-[24px]">
        <div className="flex flex-row justify-between min-h-[60px]">
          {!isRenaming && (
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {latestVideo?.title}
            </h5>
          )}
          {isRenaming && (
            <>
              <input
                autoFocus
                onBlur={onBlurInput}
                className="bg-gray-700 outline-0 text-xl font-semibold tracking-tight text-gray-900 dark:text-white max-w-[80%]"
                value={latestVideo?.title}
                onChange={onChangeInput}
              />
              <svg
                className="w-6 h-6 text-gray-800 dark:text-[#00C853] cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </>
          )}
        </div>
        <div className="flex items-center mt-2.5 mb-5"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center w-[60%]">
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
          <a
            onClick={onClickWatchVideo}
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Watch
          </a>
        </div>
        <div className="w-full mt-[24px] flex flex-row">
          <div className="flex flex-row items-center">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 14"
            >
              <g
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
              </g>
            </svg>
            <div className="ml-[6px] dark:text-gray-400">{video?.viewers}</div>
          </div>

          <div className="flex flex-row items-center ml-[12px]">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
            </svg>
            <div className="ml-[6px] dark:text-gray-400">
              {video?.comments?.length}
            </div>
          </div>
        </div>
      </div>
      {isHover && (
        <div className="w-full h-[100px] absolute top-0 z-[999] flex flex-col items-end p-[12px]">
          <div className="cursor-pointer " data-tooltip-target="tooltip-share">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 15"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m13.717 1 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-5.73-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646L9.418 1.685a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"
              />
            </svg>
          </div>
          <div className="mt-[12px] cursor-pointer flex flex-col items-end ">
            <button
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              type="button"
              onClick={() => setShouldShowActionButton((value) => !value)}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>
            {shouldShowActionButton && (
              <div
                id="dropdownDots"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconButton"
                >
                  <li>
                    <a
                      onClick={() => {
                        setShouldShowActionButton(false);
                        setIsRenaming(true);
                      }}
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Rename
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Download
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Share
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default RenderItem;
