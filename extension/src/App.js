import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Autocomplete, Fab, IconButton, TextField } from "@mui/material";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import { SketchPicker } from "react-color";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import { saveAs } from "file-saver";

import * as React from "react";
import Webcam from "react-webcam";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
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
  const [allowAudio, setAllowAudio] = useState(!false);
  const [allowVideo, setAllowVideo] = useState(!false);
  const [isRecording, setIsRecording] = useState(false);
  // eslint-disable-next-line no-mixed-operators
  const [shouldDisplayAudioOptions, setShouldDisplayAudioOptions] =
    React.useState(false);
  const [shouldDisplayVideoOptions, setShouldDisplayVideoOptions] =
    React.useState(false);
  const [allowDisplayWebcam, setAllowDisplayWebcam] = React.useState(false);

  const toggleAllowAudio = React.useCallback(() => {
    setAllowAudio((allowAudio) => !allowAudio);
  }, []);
  const toggleAllowVideo = React.useCallback(() => {
    setAllowVideo((allowVideo) => !allowVideo);
  }, []);

  const saveRecording = React.useCallback((blob) => {
    const videoFileName = "recorded_video.webm";
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = videoFileName;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  }, []);
  const startShareScreen = React.useCallback(async () => {
    try {
      let audioStream;
      let videoStream;
      let mediaRecorder;
      const combinedStream = new MediaStream();
      if (allowAudio) {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioStream.getAudioTracks().forEach((track) => {
          combinedStream.addTrack(track);
        });
      }
      if (allowVideo) {
        videoStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        videoStream.getVideoTracks().forEach((track) => {
          combinedStream.addTrack(track);
          track.onended = () => {
            mediaRecorder.stop();
          };
        });
      }
      const chunks = [];
      mediaRecorder = new MediaRecorder(combinedStream);

      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const recordedBlob = new Blob(chunks, { type: mediaRecorder.mimeType });
        saveRecording(recordedBlob);
      });

      mediaRecorder.start();
    } catch (error) {
      console.log(error);
    }
  }, [allowAudio, allowVideo, saveRecording]);

  const [shouldDisplaySketchPicker, setShouldDisplaySketchPicker] =
    React.useState(false);
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
            onInputChange={(event, value) => {
              if (value === "Camera Only") {
                setShouldDisplayAudioOptions(false);
                setShouldDisplayVideoOptions(true);
              } else if (value === "Screen Only") {
                setShouldDisplayAudioOptions(true);
                setShouldDisplayVideoOptions(false);
              } else {
                setShouldDisplayAudioOptions(true);
                setShouldDisplayVideoOptions(true);
              }
            }}
          />
        </div>
        {shouldDisplayAudioOptions && (
          <div className="px-[12px] my-[12px] flex flex-row">
            <IconButton>
              <div
                className="bg-[#e9e9fd] w-[36px] h-[36px] rounded-[12px]"
                onClick={toggleAllowAudio}
              >
                {allowAudio ? (
                  <MicIcon style={{ color: "#8380f6" }} />
                ) : (
                  <MicOffIcon style={{ color: "#8380f6" }} />
                )}
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
        )}
        {shouldDisplayVideoOptions && (
          <div className="px-[12px] my-[12px] flex flex-row">
            <IconButton>
              <div
                className="bg-[#e9e9fd] w-[36px] h-[36px] rounded-[12px]"
                onClick={toggleAllowVideo}
              >
                {allowVideo ? (
                  <VideocamIcon style={{ color: "#8380f6" }} />
                ) : (
                  <VideocamOffIcon style={{ color: "#8380f6" }} />
                )}
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
        )}
        <div className="px-[12px]"></div>
        <div className="font-[600] text-center my-[12px] text-[14x] hover:bg-[#ececef] w-fit m-auto p-[12px] hover:rounded-[12px] cursor-pointer">
          Show advanced options
        </div>
        <div className="w-[100%] h-[2px] bg-[#ececef]" />
        <div
          className="px-[12px] my-[12px] text-white  text-center"
          onClick={startShareScreen}
        >
          <div className="bg-[#ef5d3d] px-[12px]  text-white py-[12px] text-center rounded-[12px]">
            Start Recording
          </div>
        </div>
      </div>
      <div className="w-screen absolute bottom-[0px] flex flex-row items-end p-[24px]">
        {allowDisplayWebcam && (
          <div className="bg-[#212121] w-[200px] h-[150px] rounded-[12px] relative">
            <Webcam
              audio={false}
              style={{ borderRadius: "12px" }}
              className="absolute "
            />
            {allowDisplayWebcam && (
              <div>
                <IconButton
                  onClick={() => {
                    setAllowDisplayWebcam(false);
                  }}
                  className="absolute top-[0px] right-[0px] left-[100%] translate-x-[-100%] "
                >
                  <HighlightOffIcon />
                </IconButton>
              </div>
            )}
          </div>
        )}
        {!allowDisplayWebcam && (
          <IconButton>
            <div
              className="bg-[#e9e9fd] w-[36px] h-[36px] rounded-[12px]"
              onClick={() => setAllowDisplayWebcam(true)}
            >
              <PersonalVideoIcon style={{ color: "#8380f6" }} />
            </div>
          </IconButton>
        )}
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
