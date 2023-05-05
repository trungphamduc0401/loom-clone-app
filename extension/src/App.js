import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { Autocomplete, Fab, IconButton, TextField } from "@mui/material";
import useMediaRecorder from "./useMediaRecorder";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { SketchPicker } from "react-color";

import Webcam from "react-webcam";
import * as React from "react";
const recordingOptions = [
  { label: "Screen and Camera" },
  { label: "Screen Only" },
  { label: "Camera Only" },
];
const cameraOptions = [{ label: "Integrated Camera" }];
const audioOptions = [
  { label: "Default" },
  { label: "Built-in Audio Analog Stereo" },
];

export default function App() {
  const [backgroundColor, setBackgroundColor] = React.useState("#F0C5C5");
  const [timer, setTimer] = React.useState(0);
  const [timerInterval, setTimerInterval] = React.useState(null);
  const clearTimer = React.useCallback(() => {
    setTimer(0);
    clearInterval(timerInterval);
  }, [timerInterval]);
  const startTimer = React.useCallback(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    setTimerInterval(interval);
  }, []);
  const [shouldDisplaySketchPicker, setShouldDisplaySketchPicker] =
    React.useState(false);
  const { recordScreen } = useMediaRecorder(startTimer, clearTimer);
  if (timer > 0 && timer < 4) {
    return (
      <div
        className={`w-screen h-screen relative text-[100px] font-bold text-center flex flex-row items-center justify-center bg-[${backgroundColor}] cursor-pointer fixed z-[10000000]`}
        style={{ backgroundColor: backgroundColor }}
      >
        {timer}
      </div>
    );
  }
  return (
    <div
      className={`w-screen h-screen relative bg-[${backgroundColor}] cursor-pointer fixed z-[10000000]`}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="w-[400px] absolute  right-[24px] top-[24px] rounded-[12px] bg-white">
        <div className="text-[14px] font-[600] px-[12px] my-[12px] flex flex-row items-center">
          <div className=" flex-1 h-[20px]">Recording settings</div>
          <div>
            <IconButton aria-label="notification" size="small">
              <NotificationsNoneOutlinedIcon style={{ color: "black" }} />
            </IconButton>
          </div>
          <div>
            <IconButton aria-label="notification" size="small">
              <MoreHorizOutlinedIcon style={{ color: "black" }} />
            </IconButton>
          </div>
        </div>
        <div className="px-[12px] my-[12px]">
          <Autocomplete
            defaultValue={recordingOptions[0]}
            disableClearable
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={recordingOptions}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="px-[12px] my-[12px] flex flex-row">
          <IconButton aria-label="delete">
            <div className="bg-[#e9e9fd] w-[36px] h-[36px] rounded-[12px]">
              <KeyboardVoiceOutlinedIcon style={{ color: "#8380f6" }} />
            </div>
          </IconButton>
          <div className="flex-1">
            <Autocomplete
              defaultValue={audioOptions[0]}
              disableClearable
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={audioOptions}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
        <div className="px-[12px] my-[12px] flex flex-row">
          <IconButton aria-label="delete">
            <div className="bg-[#e9e9fd] w-[36px] h-[36px] rounded-[12px]">
              <VideocamOutlinedIcon style={{ color: "#8380f6" }} />
            </div>
          </IconButton>
          <div className="flex-1">
            <Autocomplete
              defaultValue={cameraOptions[0]}
              disableClearable
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={cameraOptions}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
        <div className="px-[12px]"></div>
        <div className="font-[600] text-center my-[12px] text-[14x] hover:bg-[#ececef] w-fit m-auto p-[12px] hover:rounded-[12px] cursor-pointer">
          Show advanced options
        </div>
        <div className="w-[100%] h-[2px] bg-[#ececef]" />
        <div className="px-[12px] my-[12px] text-white  text-center">
          <div
            className="bg-[#ef5d3d] px-[12px]  text-white py-[12px] text-center rounded-[12px]"
            onClick={() => {
              recordScreen();
            }}
          >
            Start Recording
          </div>
        </div>
      </div>
      <div className="w-screen absolute bottom-[0px] flex flex-row items-end p-[24px]">
        <div className="bg-[#212121] w-[200px] h-[150px] rounded-[12px]">
          <Webcam audio={false} style={{ borderRadius: "12px" }} />
        </div>
        <div className="w-[200px] h-[50px] bg-[#212121] rounded-[30px] flex flex-row items-center px-[24px] justify-between mx-[12px]">
        
      
          <IconButton aria-label="notification" size="small">
            <UndoOutlinedIcon style={{ color: "#9797a5" }} />
          </IconButton>
          <IconButton aria-label="notification" size="small">
            <PauseOutlinedIcon style={{ color: "#9797a5" }} />
          </IconButton>
          <IconButton aria-label="notification" size="small">
            <DeleteOutlinedIcon style={{ color: "#9797a5" }} />
          </IconButton>
        </div>
      </div>
      <div className="absolute bottom-[24px] right-[24px]">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            setShouldDisplaySketchPicker(!shouldDisplaySketchPicker);
          }}
        >
          <ColorLensOutlinedIcon />
        </Fab>
      </div>
      <div className="absolute bottom-[84px] right-[24px]">
        {shouldDisplaySketchPicker && (
          <SketchPicker
            color={backgroundColor}
            onChange={(color) => {
              setBackgroundColor(color.hex);
            }}
          />
        )}
      </div>
    </div>
  );
}
