import { GetServerSideProps } from "next";
import { useEffect, useState, useCallback } from "react";
import useWebSocket from "react-use-websocket";

import { PredictionInterface, PredictionState } from "@/types";
import { fetchPredictionById } from "@/lib/prediction";
import {
  type TwitchWebsocketMessage,
  twitchWebsocketMessageSchema,
} from "@/types/twitch";
import { subscribeToTopics } from "@/lib/twitch";

// URL initiale pour la connexion WebSocket
const INITIAL_SOCKET_URL = "wss://eventsub.wss.twitch.tv/ws";

const PredictionPage = ({
  initialPrediction,
}: {
  initialPrediction: PredictionInterface | null;
}) => {
  // États du composant
  const [prediction] = useState<PredictionInterface | null>(initialPrediction);
  const [socketUrl, setSocketUrl] = useState(INITIAL_SOCKET_URL);
  const [predictionState, setPredictionState] = useState(
    PredictionState.NOT_STARTED,
  );
  const [predictionEvent, setPredictionEvent] =
    useState<TwitchWebsocketMessage | null>(null);

  // Hook pour gérer la connexion WebSocket
  const { lastMessage } = useWebSocket(socketUrl);

  // Fonction pour gérer les changements d'état des prédictions
  const handlePredictionState = useCallback(
    (subscriptionType: string, parsed: TwitchWebsocketMessage) => {
      switch (subscriptionType) {
        case "channel.prediction.begin":
          console.log("Prediction started");
          setPredictionState(PredictionState.STARTED);
          setPredictionEvent(parsed);
          break;
        case "channel.prediction.lock":
          console.log("Prediction locked");
          setPredictionState(PredictionState.LOCKED);
          setPredictionEvent(parsed);
          break;
        case "channel.prediction.end":
          console.log("Prediction ended");
          setPredictionState(PredictionState.ENDED);
          setPredictionEvent(parsed);
          // Reset l'état après 30 secondes
          setTimeout(() => {
            setPredictionState(PredictionState.NOT_STARTED);
          }, 30000);
          break;
      }
    },
    [],
  );

  // Effet pour gérer les messages WebSocket
  useEffect(() => {
    if (lastMessage) {
      try {
        // Parse le message WebSocket
        const parsed = twitchWebsocketMessageSchema.parse(
          JSON.parse(lastMessage.data),
        );

        switch (parsed.metadata.message_type) {
          case "session_welcome":
            // S'abonne aux topics nécessaires lors de la connexion initiale
            if (parsed.payload.session) {
              const topics = [
                "channel.prediction.begin",
                "channel.prediction.progress",
                "channel.prediction.lock",
                "channel.prediction.end",
              ];

              subscribeToTopics(parsed.payload.session.id, topics);
            }
            break;
          case "session_reconnect":
            // Gère la reconnexion en cas de déconnexion
            if (parsed.payload.session) {
              setSocketUrl(
                parsed.payload.session.reconnect_url ?? INITIAL_SOCKET_URL,
              );
            }
            break;
          case "notification":
            // Gère les notifications de changement d'état des prédictions
            if (parsed.metadata.subscription_type) {
              handlePredictionState(parsed.metadata.subscription_type, parsed);
            }
            break;
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  }, [lastMessage, handlePredictionState]);

  // Effet pour vérifier si la prédiction initiale est chargée
  useEffect(() => {
    if (!initialPrediction) {
      console.error("Prediction not found");
    }
  }, [initialPrediction]);

  // Rendu du composant
  return (
    <section className="flex items-center justify-center h-screen">
      {prediction ? (
        <PredictionComponent
          outcomes={predictionEvent?.payload.event?.outcomes ?? []}
          predictionCustom={prediction}
          status={predictionState}
          title={predictionEvent?.payload.event?.title ?? ""}
          winner={predictionEvent?.payload.event?.winning_outcome_id}
        />
      ) : (
        <p className="text-center text-red-500">Prédiction non trouvée</p>
      )}
    </section>
  );
};

// Fonction pour charger les données côté serveur
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const prediction = await fetchPredictionById(id);

  if (!prediction) {
    return { notFound: true };
  }

  return { props: { initialPrediction: prediction } };
};

export default PredictionPage;
