"use server";

import { TAVUS_API_KEY } from "@/config/tavus";
import { IConversation } from "@/types/tavus";

export const createConversation = async (): Promise<IConversation> => {
  try {
    const response = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": TAVUS_API_KEY,
      },
      body: JSON.stringify({
        replica_id: "rf4703150052", // Charlie
        persona_id: "p9a95912", // Stock Demo Persona
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
