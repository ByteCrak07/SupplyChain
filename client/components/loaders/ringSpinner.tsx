import { FC } from "react";

interface RingSpinnerProps {
  width: number;
  color?: string;
  className?: string;
}

const RingSpinner: FC<RingSpinnerProps> = ({ width, color, className }) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-full ${
        className ? className : ""
      }`}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <style jsx>
          {`
            .lds-ring {
              display: inline-block;
              position: relative;
              width: ${width}px;
              height: ${width}px;
              border-radius: 50%;
              overflow: hidden;
            }
            .lds-ring div {
              box-sizing: border-box;
              display: block;
              position: absolute;
              width: ${width}px;
              height: ${width}px;
              margin: auto;
              border: ${width / 10}px solid ${color ? color : "#0B1D25"};
              border-radius: 50%;
              animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
              border-color: ${color ? color : "#0B1D25"} transparent transparent
                transparent;
            }
            .lds-ring div:nth-child(1) {
              animation-delay: -0.45s;
            }
            .lds-ring div:nth-child(2) {
              animation-delay: -0.3s;
            }
            .lds-ring div:nth-child(3) {
              animation-delay: -0.15s;
            }
            @keyframes lds-ring {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default RingSpinner;
