//create hook for using media recorder
import { useCallback, useRef, useState } from "react";
export default function useMediaRecorder(startTimer, clearTimer) {
  const [constraints] = useState({ audio: true, video: true });
  const chunks = useRef([]);
  const recordScreen = useCallback(() => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
          chunks.current = [...chunks.current, e.data];
        };
        mediaRecorder.onstop = (e) => {
          const blob = new Blob(chunks.current, { type: "video/mp4" });
          chunks.current = [];

          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            var base64data = reader.result;
        
            var a = document.createElement("a"); //Create <a>
            a.href = base64data; //Image Base64 Goes here
            a.download = "video.mp4"; //File name Here
            a.click(); //Downloaded file
          };
        };
        mediaRecorder.start();
      });
  }, []);
  return { recordScreen };
}
