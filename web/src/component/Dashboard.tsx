import { useCallback } from "react";
import SearchInput from "./SearchInput";
import { IVideo } from "../type";
import { useSelector } from "react-redux";
import { sGetUser } from "../redux/common/selector";
import RenderItem from "./RenderItem";
const mock: IVideo = {
  title: " Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
  url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  viewers: 6,
  comments: ["1", "2", "3"],
};
const Dashboard = () => {
  return (
    <div className="w-screen h-screen bg-[#131327] flex flex-col dark">
      <div className="w-[80%] mx-auto pt-[50px]">
        <SearchInput />
      </div>
      <div className="w-[80%] mx-auto flex-1 mt-[50px] flex flex-row flex-wrap gap-[12px] content-start justify-start overflow-y-auto ">
        <RenderItem video={mock} />
        <RenderItem video={mock} />
      
      </div>
    </div>
  );
};
export default Dashboard;
