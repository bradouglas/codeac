"use client";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#111111";
  const iconBg = variant === "light" ? "#FFFFFF" : "#1DB954";
  const checkColor = variant === "light" ? "#1DB954" : "#FFFFFF";

  const sizes = {
    sm: { icon: 24, text: 18 },
    md: { icon: 32, text: 22 },
    lg: { icon: 40, text: 28 },
  };

  const s = sizes[size];

  return (
    <span className="inline-flex items-center gap-2" aria-label="Oprix">
      {/* Rounded square icon with checkmark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill={iconBg} />
        <path
          d="M9 16.5L13.5 21L23 11"
          stroke={checkColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark */}
      <svg
        height={s.text}
        viewBox="0 0 72 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <text
          x="0"
          y="18"
          fontFamily="DM Sans, sans-serif"
          fontWeight="800"
          fontSize="22"
          fill={textColor}
          letterSpacing="-0.5"
        >
          oprix
        </text>
      </svg>
    </span>
  );
}
