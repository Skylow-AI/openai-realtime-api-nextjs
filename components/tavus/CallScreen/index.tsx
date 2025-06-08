import { useEffect, useState } from "react";
import { useDaily } from "@daily-co/daily-react";
import { IConversation } from "@/types/tavus";
import { CameraSettings } from "../CameraSettings";

import { Call } from "../Call";
import Video from "@/app/components/video";

export const CallScreen = ({
  conversation,
  handleEnd,
}: {
  conversation: IConversation;
  handleEnd: () => void;
}) => {
  const daily = useDaily();

  useEffect(() => {
    if (conversation && daily) {
      const { conversation_url } = conversation;
      daily.join({
        url: conversation_url,
      });
    }
  }, [daily, conversation]);

  const handleLeave = async () => {
    await daily?.leave();
    handleEnd();
  };

  const [isInteracting, setIsInteracting] = useState(false);

  const handleToggleInteracting = () => {
    setIsInteracting(!isInteracting);
  };

  return (
    <>
      <div>
        <div className={isInteracting ? "hidden" : ""}>
          <Video />
        </div>
        <div className={isInteracting ? "" : "hidden"}>
          <Call />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col justify-center items-center">
          <CameraSettings actionLabel="Leave Call" onAction={handleLeave} />
          <button onClick={handleToggleInteracting}>
            {isInteracting ? "Stop" : "Interact"}
          </button>
        </div>
      </div>
    </>
  );
};
