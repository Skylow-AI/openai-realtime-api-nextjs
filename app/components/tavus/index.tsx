"use client";

import { useEffect, useState } from "react";
import { DailyProvider } from "@daily-co/daily-react";
import { WelcomeScreen } from "@/components/tavus/WelcomeScreen";
import { HairCheckScreen } from "@/components/tavus/HairCheckScreen";
import { CallScreen } from "@/components/tavus/CallScreen";
import { createConversation, endConversation } from "@/app/api/tavus";
import { IConversation } from "@/types/tavus";
import { useToast } from "@/hooks/use-toast";

function Tavus() {
  const { toast } = useToast();
  const [screen, setScreen] = useState<"welcome" | "hairCheck" | "call">(
    "welcome"
  );
  const [conversation, setConversation] = useState<IConversation | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (conversation) {
        void endConversation(conversation.conversation_id);
      }
    };
  }, [conversation]);

  const handleStart = async () => {
    try {
      setLoading(true);
      const conversation = await createConversation();
      setConversation(conversation);
      setScreen("hairCheck");
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Check console for details",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnd = async () => {
    try {
      if (!conversation) return;
      await endConversation(conversation.conversation_id);
    } catch (error) {
      console.error(error);
    } finally {
      setConversation(null);
      // setScreen("welcome");
    }
  };

  const handleJoin = () => {
    setScreen("call");
  };

  return (
    <main>
      <DailyProvider>
        {screen === "welcome" && (
          <WelcomeScreen onStart={handleStart} loading={loading} />
        )}
        {screen === "hairCheck" && (
          <HairCheckScreen handleEnd={handleEnd} handleJoin={handleJoin} />
        )}
        {screen === "call" && conversation && (
          <CallScreen conversation={conversation} handleEnd={handleEnd} />
        )}
      </DailyProvider>
    </main>
  );
}

export default Tavus;
