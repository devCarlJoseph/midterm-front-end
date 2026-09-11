interface PandaMascotProps {
  size?: number;
  className?: string;
  mood?: "happy" | "winking" | "hungry";
}

export function PandaMascot({
  size = 72,
  className = "",
  mood = "happy",
}: PandaMascotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        {/* Outer subtle glow/ring */}
        <circle cx="60" cy="60" r="58" fill="#FFF0F5" stroke="#FDE2EC" strokeWidth="2" />

        {/* Left Ear */}
        <circle cx="28" cy="28" r="16" fill="#212121" />
        <circle cx="28" cy="28" r="9" fill="#D70F64" opacity="0.3" />

        {/* Right Ear */}
        <circle cx="92" cy="28" r="16" fill="#212121" />
        <circle cx="92" cy="28" r="9" fill="#D70F64" opacity="0.3" />

        {/* Head Base */}
        <ellipse cx="60" cy="65" rx="46" ry="42" fill="#FFFFFF" stroke="#EAEAEA" strokeWidth="1.5" />

        {/* Left Eye Patch */}
        <ellipse
          cx="42"
          cy="62"
          rx="14"
          ry="17"
          fill="#212121"
          transform="rotate(-12 42 62)"
        />
        {/* Right Eye Patch */}
        <ellipse
          cx="78"
          cy="62"
          rx="14"
          ry="17"
          fill="#212121"
          transform="rotate(12 78 62)"
        />

        {/* Left Eye & Sparkle */}
        {mood === "winking" ? (
          <path
            d="M34 62 Q42 56 48 62"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <>
            <circle cx="43" cy="61" r="5" fill="#FFFFFF" />
            <circle cx="45" cy="59" r="2" fill="#212121" />
          </>
        )}

        {/* Right Eye & Sparkle */}
        <circle cx="77" cy="61" r="5" fill="#FFFFFF" />
        <circle cx="75" cy="59" r="2" fill="#212121" />

        {/* Rosy Blush Cheeks (Foodpanda Pink) */}
        <ellipse cx="29" cy="74" rx="7" ry="4" fill="#D70F64" opacity="0.35" />
        <ellipse cx="91" cy="74" rx="7" ry="4" fill="#D70F64" opacity="0.35" />

        {/* Cute Panda Nose */}
        <ellipse cx="60" cy="71" rx="6.5" ry="4.5" fill="#212121" />
        <ellipse cx="60" cy="70" rx="2.5" ry="1.2" fill="#FFFFFF" opacity="0.6" />

        {/* Smile */}
        {mood === "hungry" ? (
          <path
            d="M53 76 Q60 86 67 76 Z"
            fill="#D70F64"
            stroke="#212121"
            strokeWidth="1.5"
          />
        ) : (
          <path
            d="M52 76 Q60 84 68 76"
            stroke="#212121"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Foodpanda Mini Delivery Chef Hat / Heart Bow */}
        <path
          d="M50 26 C46 16 54 11 60 14 C66 11 74 16 70 26 Z"
          fill="#D70F64"
        />
        <circle cx="60" cy="22" r="3.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
