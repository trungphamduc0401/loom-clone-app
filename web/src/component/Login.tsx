import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button, Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import "../util/firebase";
import { useDispatch, useSelector } from "react-redux";
import { sGetUser } from "../redux/common/selector";
import { EReduxActionTypes } from "../redux";
import { logError } from "../util";
import { toast } from "react-toastify";

export default function Login() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const user = useSelector(sGetUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch({ type: EReduxActionTypes.SET_VIDEOS_ASYNC_ACTION });
    }
  }, [dispatch, user]);

  const onLoginGoogle = useCallback(async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: EReduxActionTypes.LOGIN_ASYNC_ACTION, payload: user });
      })
      .catch((error) => {
        logError(error);
      });
  }, [dispatch]);
  return (
    <>
      <div
        id="crypto-modal"
        className="dark fixed top-0 left-0 right-0 z-50 w-screen p-4 overflow-x-hidden overflow-y-auto bg-[#131327] md:inset-0 h-[calc(100%-1rem)] h-screen"
      >
        <div className="relative w-full max-w-md max-h-full left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="crypto-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Login
              </h3>
            </div>

            <div className="p-6">
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Login with Social Accounts
              </p>
              <ul className="my-4 space-y-3">
                <li onClick={onLoginGoogle}>
                  <a
                    href="#"
                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <FcGoogle />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Google
                    </span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                      Popular
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <AiFillFacebook color="#1877F2" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Facebook
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
