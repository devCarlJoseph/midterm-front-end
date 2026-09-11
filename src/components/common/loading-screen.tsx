import React from "react";

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading, please wait...",
  fullScreen = false,
}) => {
  return (
    <div className={fullScreen ? "fixed inset-0 z-50 flex w-full flex-col items-center justify-center bg-white select-none" : "flex min-h-[36vh] w-full flex-col items-center justify-center py-10 select-none"}>
      <div className="w-72 max-w-full px-2">
        {/* Track Area with seamless continuous driving truck */}
        <div className="relative h-9 w-full overflow-hidden">
          {/* Green Delivery Truck driving smoothly in a continuous loop */}
          <div className="absolute bottom-0 w-full animate-[driveContinuous_1.4s_linear_infinite]">
            <div className="relative w-11">
              <svg
                width="44"
                height="24"
                viewBox="0 0 46 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-xs"
              >
                {/* Cargo Box */}
                <rect x="1" y="2" width="28" height="17" rx="2" fill="#047857" />
                <rect x="2" y="3" width="26" height="15" rx="1" fill="#059669" />

                {/* DALI Label on Truck Cargo */}
                <text
                  x="15"
                  y="13"
                  fill="#ffffff"
                  fontSize="6"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  letterSpacing="0.5"
                >
                  DALI
                </text>

                {/* Cabin */}
                <path
                  d="M29 7H37C38.5 7 39.8 7.8 40.5 9L43.5 14.5C43.8 15.2 44 16 44 16.8V19H29V7Z"
                  fill="#047857"
                />

                {/* Windshield */}
                <path
                  d="M31 9H36.5C37.2 9 37.8 9.4 38.2 10L40.8 14H31V9Z"
                  fill="#a7f3d0"
                />

                {/* Headlight */}
                <rect x="43" y="16" width="1.5" height="2.5" rx="0.5" fill="#fef08a" />

                {/* Wheels */}
                <circle cx="10" cy="21" r="3.5" fill="#1e293b" />
                <circle cx="10" cy="21" r="1.5" fill="#e2e8f0" />

                <circle cx="35" cy="21" r="3.5" fill="#1e293b" />
                <circle cx="35" cy="21" r="1.5" fill="#e2e8f0" />
              </svg>
            </div>
          </div>
        </div>

        {/* Road Track with matching seamless moving dash */}
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="absolute inset-0 h-full w-[200%] animate-[roadDash_1.4s_linear_infinite] bg-[repeating-linear-gradient(90deg,#059669_0_100%,transparent_100%)]" />
        </div>

        {/* Message */}
        {message && (
          <p className="mt-3 text-center text-xs font-medium text-gray-500">
            {message}
          </p>
        )}
      </div>

      <style>{`
        @keyframes driveContinuous {
          0% {
            transform: translateX(-48px);
          }
          100% {
            transform: translateX(290px);
          }
        }
        @keyframes roadDash {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
