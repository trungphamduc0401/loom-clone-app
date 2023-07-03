import { useSelector } from "react-redux";
import { sGetUser } from "../redux/common/selector";
import { IComment } from "../type";
import { type } from "os";

const RenderComment = ({ comment }: { comment: IComment }) => {
  console.log(typeof(comment?.commentAt))
  return (
    <li className="mb-10 ml-6 w-[85%]">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
  </svg>
      </span>
      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
          {(new Date(comment?.commentAt as string)).toLocaleString()}
        </time>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
          {comment?.content}
        </div>
      </div>
    </li>
  );
};
export default RenderComment;
