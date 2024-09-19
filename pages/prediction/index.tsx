import { useSession } from "next-auth/react";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

import DefaultLayout from "@/layouts/default";
import { SessionUnauthenticated } from "@/components/SessionUnauthenticated";
import { SessionLoading } from "@/components/SessionLoading";
import { PredictionInterface } from "@/types";
import { PredictionCard } from "@/components/Prediction/PredictionCard";

const NewPredictionCard: React.FC = () => {
  const router = useRouter();

  return (
    <Card isHoverable isPressable onPress={() => router.push("/overlays/new")}>
      <CardBody className="flex items-center justify-center h-full">
        <div className="text-center">
          <p>+ Add New Overlay</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default function PredictionPage() {
  const { status } = useSession();
  const [predictions, setPredictions] = useState<PredictionInterface[]>([]);

  const fetchPredictions = useCallback(async () => {
    try {
      const response = await fetch("/api/prediction/all");
      const data = await response.json();

      setPredictions(data);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPredictions();
    }
  }, [status, fetchPredictions]);

  const handlePredictionUpdate = useCallback(
    async (updatedPrediction: PredictionInterface) => {
      try {
        const response = await fetch(
          `/api/prediction/${updatedPrediction.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPrediction),
          },
        );

        if (response.ok) {
          setPredictions((prev) =>
            prev.map((p) =>
              p.id === updatedPrediction.id ? updatedPrediction : p,
            ),
          );
        } else {
          console.error("Failed to update prediction");
        }
      } catch (error) {
        console.error("Error updating prediction:", error);
      }
    },
    [],
  );

  if (status === "unauthenticated") return <SessionUnauthenticated />;
  if (status === "loading") return <SessionLoading />;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-full text-center justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NewPredictionCard />
            {predictions.map((prediction) => (
              <PredictionCard
                key={prediction.id}
                prediction={prediction}
                onPredictionUpdate={handlePredictionUpdate}
              />
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
