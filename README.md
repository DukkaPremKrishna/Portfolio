# Prem Krishna: 3D Portfolio
React + Vite. Animation: GSAP (hero reveal, scroll-drawn timeline), Framer Motion (tilt cards, counters), React Three Fiber (3D hero), Spline (optional scene), LottieFiles/lottie-react (status pulse), inline SVG.

    npm install
    npm run dev       # local
    npm run build     # production in /dist, deploy to Vercel

## Use your own Spline scene (optional)
Design a scene at spline.design > Export > Code > React, copy the `.splinecode` URL, then:
    cp .env.example .env     # set VITE_SPLINE_SCENE=<url>
The hero swaps the built-in 3D scene for your Spline scene automatically.

## Edit content
All text lives in `src/data.js`. Replace `public/Prem_Krishna_Resume.pdf` to update the resume download.
Swap the Lottie by replacing `src/pulse.json` with any file from lottiefiles.com.
