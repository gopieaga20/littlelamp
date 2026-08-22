import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="LittleLamp home">
      <svg width="36" height="36" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="navFlame" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFE29A" />
            <stop offset="45%" stopColor="#F5A524" />
            <stop offset="100%" stopColor="#C2790C" />
          </radialGradient>
          <linearGradient id="navBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A3A5C" />
            <stop offset="100%" stopColor="#1B2740" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="31" fill="#FFF8EC" stroke="#F0E4CC" strokeWidth="1" />
        <path
          d="M32 12c3.6 4.4 6.4 8 6.4 12.4 0 4-2.9 6.6-6.4 6.6s-6.4-2.6-6.4-6.6c0-4.4 2.8-8 6.4-12.4z"
          fill="url(#navFlame)"
        />
        <path
          d="M16 32c0 3.6 2 6.6 4.6 8.6-1 1.6-1.6 3.4-1.6 5.4 0 6.6 5.8 10 13 10s13-3.4 13-10c0-2-.6-3.8-1.6-5.4 2.6-2 4.6-5 4.6-8.6 0-1.1-.9-2-2-2H18c-1.1 0-2 .9-2 2z"
          fill="url(#navBase)"
        />
        <ellipse cx="32" cy="32" rx="14" ry="2.6" fill="#3C4E77" />
        <rect x="27" y="55" width="10" height="3" rx="1.5" fill="#1B2740" />
      </svg>
      <span className="font-display text-xl font-bold leading-none text-ink-800">
        Little<span className="text-primary-600">Lamp</span>
      </span>
    </Link>
  );
}
