"use client";

import ReactPlayer from "react-player";

export default function Video({ isPlaying }: { isPlaying: boolean }) {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isInteracting, setIsInteracting] = useState(false);

  // const handleTogglePlaying = () => {
  //   setIsPlaying(!isPlaying);
  // };

  // const handleToggleInteracting = () => {
  //   setIsInteracting(!isInteracting);
  // };

  // const handleKeyDown = (event: KeyboardEvent) => {
  //   if (event.key === " ") {
  //     handleToggleInteracting();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  // Render a YouTube video player
  return (
    <div className="flex flex-col w-screen items-center justify-center">
      <ReactPlayer
        url="https://ucarecdn.com/398f91ab-6353-4ecc-ac4f-80a7a657c392/"
        playing={isPlaying}
        // loop={true}
        // muted={true}
        // width="100%"
        // height="100%"
      />
      {/* <button onClick={handleTogglePlaying}>
        {isPlaying ? "Pause" : "Play"}
      </button> */}
      {/* <button onClick={handleToggleInteracting}>
        {isInteracting ? "Stop" : "Interact"}
      </button> */}
    </div>
  );
}
