import { DarkThemeToggle, Flowbite } from "flowbite-react";

import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./component/Dashboard";
import LoadingIndicator from "./component/LoadingIndicator";
import Login from "./component/Login";
import {
  sGetIsLoading,
  sGetSelectedVideo,
  sGetUser,
} from "./redux/common/selector";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmpty } from "lodash";
import WatchVideo from "./component/WatchVideo";
import ScreenRecord from "./component/ScreenRecord";

export default function App() {
  const user = useSelector(sGetUser);
  const selectedVideo = useSelector(sGetSelectedVideo);
  const shouldDisplayScreenRecord =
    localStorage?.getItem("shouldDisplayScreenRecord") === "true";
  const shouldDisplayLogin = useMemo(() => {
    return isEmpty(user);
  }, [user]);
  const isLoading = useSelector(sGetIsLoading);
  if (!isEmpty(selectedVideo)) {
    return <WatchVideo />;
  }
  if (isLoading) return <LoadingIndicator />;
  return (
    <Flowbite>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {shouldDisplayLogin && <Login />}
      {!shouldDisplayLogin && !shouldDisplayScreenRecord && <Dashboard />}
      {!shouldDisplayLogin && shouldDisplayScreenRecord && <ScreenRecord />}
      <DarkThemeToggle className="fixed top-0 right-0 m-[12px] z-[999]" />
    </Flowbite>
  );
}
