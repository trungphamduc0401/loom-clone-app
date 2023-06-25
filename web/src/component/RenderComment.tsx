import { useSelector } from "react-redux";
import { sGetUser } from "../redux/common/selector";
import { IComment } from "../type";

const RenderComment = ({ comment }: { comment: IComment }) => {
  const user = useSelector(sGetUser);
  return (
    <li className="mb-10 ml-6 w-[85%]">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <img
          className="rounded-full shadow-lg"
          src={user?.avatar}
          alt="Bonnie image"
        />
      </span>
      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
          {comment?.commentAt?.toLocaleString()}
        </time>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
          {comment?.content}
        </div>
      </div>
    </li>
  );
};
export default RenderComment;
