import * as React from "react";

export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none w-full h-full max-w-full"
      style={{ contain: "strict", overflow: "clip" }}
      aria-hidden="true"
    >
      {/* 1. Light Theme: ChaiCode Exact Warm Ambient Cream & Honeycomb System */}
      <div className="absolute inset-0 overflow-hidden w-full h-full opacity-100 dark:opacity-0 transition-opacity duration-500">
        {/* Warm Chai Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5ED] via-[#FBF4EB] to-[#FAF3E5]" />

        {/* Luminous Top-Center Warm Chai Glow */}
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[760px] sm:w-[1150px] lg:w-[1500px] h-[520px] sm:h-[680px] rounded-full bg-gradient-to-b from-[#FCE4C0]/55 via-[#FDF0DC]/35 to-transparent blur-3xl" />

        {/* Top-Right Warm Cream Radial Glow */}
        <div className="absolute -top-24 right-[-10%] w-[580px] h-[580px] rounded-full bg-gradient-to-bl from-[#FBE8CA]/40 via-[#FDF2E2]/25 to-transparent blur-3xl" />

        {/* Bottom-Left Warm Peach / Apricot Wash */}
        <div className="absolute bottom-[-15%] left-[-8%] w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#FCE2C4]/45 via-[#FDF0DE]/25 to-transparent blur-3xl" />

        {/* Mid-Page Organic Soft Orange Amber Accents */}
        <div className="absolute top-[35%] right-[-5%] w-[520px] h-[520px] rounded-full bg-gradient-to-l from-[#FEDCB4]/30 via-transparent to-transparent blur-2xl" />

        {/* Signature ChaiCode Floating 3D Honeycomb Hexagonal Clusters (Left) */}
        <div className="absolute top-[120px] sm:top-[160px] left-[-30px] sm:left-4 lg:left-10 w-[240px] sm:w-[320px] h-[440px] animate-float-slow opacity-85">
          <svg viewBox="0 0 260 380" className="w-full h-full" fill="none">
            <defs>
              {/* Top face gradient */}
              <linearGradient id="hc-top" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF4EB" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#F2E6D4" stopOpacity="0.80" />
              </linearGradient>
              {/* Left face gradient */}
              <linearGradient id="hc-left" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EFE1CD" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E4D2B8" stopOpacity="0.75" />
              </linearGradient>
              {/* Right face gradient */}
              <linearGradient id="hc-right" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E9D9C2" stopOpacity="0.80" />
                <stop offset="100%" stopColor="#DDCAAE" stopOpacity="0.70" />
              </linearGradient>
              {/* Subtle stroke gradient */}
              <linearGradient id="hc-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFCEB6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#CEBA9E" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Honeycomb Cell 1 - Upper Left */}
            <g transform="translate(40, 30)">
              {/* Top Isometric Face */}
              <polygon points="50,0 90,20 50,40 10,20" fill="url(#hc-top)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              {/* Left Isometric Face */}
              <polygon points="10,20 50,40 50,85 10,65" fill="url(#hc-left)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              {/* Right Isometric Face */}
              <polygon points="50,40 90,20 90,65 50,85" fill="url(#hc-right)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
            </g>

            {/* Honeycomb Cell 2 - Center Prominent */}
            <g transform="translate(95, 80)">
              <polygon points="50,0 90,20 50,40 10,20" fill="url(#hc-top)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              <polygon points="10,20 50,40 50,85 10,65" fill="url(#hc-left)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              <polygon points="50,40 90,20 90,65 50,85" fill="url(#hc-right)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
            </g>

            {/* Honeycomb Cell 3 - Stacked Below Cell 1 */}
            <g transform="translate(40, 130)">
              <polygon points="50,0 90,20 50,40 10,20" fill="url(#hc-top)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              <polygon points="10,20 50,40 50,85 10,65" fill="url(#hc-left)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              <polygon points="50,40 90,20 90,65 50,85" fill="url(#hc-right)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
            </g>

            {/* Honeycomb Cell 4 - Lower Mid */}
            <g transform="translate(95, 180)">
              <polygon points="50,0 90,20 50,40 10,20" fill="url(#hc-top)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              <polygon points="10,20 50,40 50,85 10,65" fill="url(#hc-left)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              <polygon points="50,40 90,20 90,65 50,85" fill="url(#hc-right)" stroke="url(#hc-stroke)" strokeWidth="0.75" />
            </g>

            {/* Honeycomb Cell 5 - Bottom Left Outlined Silhouette */}
            <g transform="translate(40, 230)">
              <polygon points="50,0 90,20 50,40 10,20" fill="url(#hc-top)" opacity="0.6" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              <polygon points="10,20 50,40 50,85 10,65" fill="url(#hc-left)" opacity="0.6" stroke="url(#hc-stroke)" strokeWidth="0.75" />
              <polygon points="50,40 90,20 90,65 50,85" fill="url(#hc-right)" opacity="0.6" stroke="url(#hc-stroke)" strokeWidth="0.75" />
            </g>

            {/* Outlined Wireframe Honeycomb Accents */}
            <polygon points="20,100 45,112 45,138 20,150 -5,138 -5,112" fill="none" stroke="#D8C5A8" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.7" />
            <polygon points="180,60 205,72 205,98 180,110 155,98 155,72" fill="none" stroke="#D8C5A8" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
          </svg>
        </div>

        {/* Honeycomb Secondary Cluster (Right Side, Subtle Floating) */}
        <div className="hidden lg:block absolute top-[280px] right-6 w-[220px] h-[340px] animate-float-slow opacity-60 [animation-delay:2s]">
          <svg viewBox="0 0 200 280" className="w-full h-full" fill="none">
            <g transform="translate(20, 20)">
              <polygon points="40,0 75,18 40,35 5,18" fill="url(#hc-top)" stroke="url(#hc-stroke)" strokeWidth="0.6" />
              <polygon points="5,18 40,35 40,75 5,58" fill="url(#hc-left)" stroke="url(#hc-stroke)" strokeWidth="0.6" />
              <polygon points="40,35 75,18 75,58 40,75" fill="url(#hc-right)" stroke="url(#hc-stroke)" strokeWidth="0.6" />
            </g>
            <g transform="translate(65, 65)">
              <polygon points="40,0 75,18 40,35 5,18" fill="url(#hc-top)" stroke="url(#hc-stroke)" strokeWidth="0.6" />
              <polygon points="5,18 40,35 40,75 5,58" fill="url(#hc-left)" stroke="url(#hc-stroke)" strokeWidth="0.6" />
              <polygon points="40,35 75,18 75,58 40,75" fill="url(#hc-right)" stroke="url(#hc-stroke)" strokeWidth="0.6" />
            </g>
            <polygon points="130,30 150,40 150,60 130,70 110,60 110,40" fill="none" stroke="#D8C5A8" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.4" />
          </svg>
        </div>

        {/* Large Decorative Precision Architectural Lines */}
        <svg
          className="absolute inset-0 h-full w-full overflow-hidden stroke-neutral-900/[0.035] [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent_88%)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="engineering-grid-light"
              width="64"
              height="64"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 64V.5H64" fill="none" strokeDasharray="2 4" />
              <circle cx="0.5" cy="0.5" r="1.5" fill="#D87824" fillOpacity="0.25" />
            </pattern>
            <linearGradient id="warm-orange-arc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D87824" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#FE9332" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid pattern */}
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#engineering-grid-light)" />

          {/* Abstract Architectural Line Motifs */}
          <g className="opacity-70">
            <circle cx="50%" cy="180" r="420" fill="none" stroke="url(#warm-orange-arc)" strokeWidth="1" strokeDasharray="8 6" />
            <circle cx="50%" cy="180" r="560" fill="none" stroke="url(#warm-orange-arc)" strokeWidth="0.75" />
            <circle cx="50%" cy="180" r="700" fill="none" stroke="#D87824" strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="16 12" />

            <circle cx="50%" cy="180" r="5" fill="#D87824" fillOpacity="0.3" />
            <line x1="45%" y1="180" x2="55%" y2="180" stroke="#D87824" strokeOpacity="0.2" strokeWidth="1" />
            <line x1="50%" y1="130" x2="50%" y2="230" stroke="#D87824" strokeOpacity="0.2" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* 2. Dark Theme Ambient Grid (Preserves Dark Identity) */}
      <div className="absolute inset-0 overflow-hidden w-full h-full opacity-0 dark:opacity-100 transition-opacity duration-300">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[1100px] h-[480px] rounded-full bg-gradient-to-b from-yellow-500/10 via-amber-500/5 to-transparent blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full stroke-zinc-800/[0.3] [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent_80%)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="engineering-grid-dark"
              width="64"
              height="64"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 64V.5H64" fill="none" strokeDasharray="2 4" />
              <circle cx="0.5" cy="0.5" r="1" fill="#FFDF20" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#engineering-grid-dark)" />
        </svg>
      </div>
    </div>
  );
}
