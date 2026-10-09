"use client";

import dynamic from "next/dynamic";

// Lazy-load lottie-react — it's a heavy library (~200KB) and the JSON
// animation files can be 100–500KB each. Dynamic import means they're
// only fetched when this component actually mounts, not at page load.
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square flex items-center justify-center opacity-20">
      <div className="w-16 h-16 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
    </div>
  ),
});

const AnimationLottie = ({ animationPath }) => {
  return (
    <Lottie
      animationData={animationPath}
      loop
      autoplay
      style={{ width: "95%" }}
    />
  );
};

export default AnimationLottie;
