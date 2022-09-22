import { FC, useEffect, useState } from "react";

let showToast: (msg: string) => void;

const Toast: FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const openToast = (msg: string) => {
      if (!message) {
        setMessage(msg);

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    };

    showToast = openToast;
  }, [message]);

  return (
    <>
      {message ? (
        <div className="toast fixed z-50 whitespace-nowrap opacity-0 text-white rounded-full bg-black px-4 py-2 -bottom-2 left-1/2 transform -translate-x-1/2">
          {message}
        </div>
      ) : null}
      <style jsx>
        {`
          .toast {
            animation: openToast 3s linear;
            box-shadow: 0px 2px 6px 0px #ffffff40;
          }

          @keyframes openToast {
            0% {
              opacity: 0;
              bottom: -8px;
            }

            10% {
              opacity: 1;
              bottom: 40px;
            }

            90% {
              opacity: 1;
              bottom: 40px;
            }

            100% {
              opacity: 0;
              bottom: -8px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Toast;
export { showToast };
