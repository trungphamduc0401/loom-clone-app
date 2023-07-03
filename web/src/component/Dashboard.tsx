import { useCallback, useEffect, useMemo, useState } from "react";
import SearchInput from "./SearchInput";
import { IVideo } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { sGetUser, sGetVideos } from "../redux/common/selector";
import RenderItem from "./RenderItem";
import { EReduxActionTypes } from "../redux";
import { isEmpty } from "lodash";
const Dashboard = () => {
  const user = useSelector(sGetUser);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    if (!isEmpty(user)) {
      dispatch({ type: EReduxActionTypes.SET_VIDEOS_ASYNC_ACTION });
    }
  }, [dispatch, user]);
  const videos = useSelector(sGetVideos);
  const displayVideos = useMemo(() => {
    return videos?.filter((item) =>
      item?.title?.toLowerCase().includes(searchInput)
    );
  }, [videos, searchInput]);
  return (
    <div className="w-screen h-screen bg-[#131327] flex flex-col dark">
      <div className="w-[80%] mx-auto pt-[50px]">
        <SearchInput input={searchInput} setInput={setSearchInput} />
      </div>
      <div className="w-[80%] mx-auto flex-1 mt-[50px] flex flex-row flex-wrap gap-[12px] content-start justify-start overflow-y-auto ">
        {!isEmpty(displayVideos) &&
          displayVideos?.map((item) => (
            <RenderItem video={item} key={item?.url} />
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
