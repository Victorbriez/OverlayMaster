export const subscribeToTopics = async (
  sessionId: string,
  topics: string[],
) => {
  try {
    const apiUrl = "https://api.twitch.tv/helix/eventsub/subscriptions";
    const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;

    if (!clientId) {
      throw new Error("NEXT_PUBLIC_TWITCH_CLIENT_ID is not defined");
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN}`,
      "Client-Id": clientId,
      "Content-Type": "application/json",
    };

    for (const topic of topics) {
      const data = {
        type: topic,
        version: "1",
        condition: {
          broadcaster_user_id: process.env.NEXT_PUBLIC_TWITCH_USER_ID,
        },
        transport: {
          method: "websocket",
          session_id: sessionId,
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (
        responseData.data &&
        responseData.data.length > 0 &&
        responseData.data[0].status === "enabled"
      ) {
        console.log(`Subscription to ${topic} successful!`);
      } else {
        console.log(`Subscription to ${topic} failed!`);
      }
    }
  } catch (error) {
    console.error("Error subscribing to topics:", error);
  }
};
