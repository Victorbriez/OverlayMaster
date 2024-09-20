import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { CircularProgress } from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";
import { SessionUnauthenticated } from "@/components/SessionUnauthenticated";
import { SessionLoading } from "@/components/SessionLoading";
import { PredictionInterface } from "@/types";
import { PredictionCard } from "@/components/Prediction/PredictionCard";
import { PredictionNewModal } from "@/components/Prediction/PredictionNewModal";

export default function PredictionPage() {
  const { status } = useSession();
  const [predictions, setPredictions] = useState<PredictionInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPredictions = useCallback(async () => {
    try {
      const response = await fetch("/api/prediction/all");
      const data = await response.json();

      setPredictions(data);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddPrediction = useCallback(
    async (newPrediction: PredictionInterface) => {
      try {
        const response = await fetch("/api/prediction/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPrediction),
        });

        if (response.ok) {
          const createdPrediction = await response.json();

          setPredictions((prev) => [...prev, createdPrediction]);
        } else {
          console.error("Failed to add new prediction");
        }
      } catch (error) {
        console.error("Error adding new prediction:", error);
      }
    },
    [],
  );

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

  const handlePredictionDelete = useCallback(
    async (predictionId: number) => {
      try {
        const response = await fetch(`/api/prediction/${predictionId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPredictions((prev) =>
            prev.filter((prediction) => prediction.id !== predictionId),
          );

          await fetchPredictions();
        } else {
          console.error("Failed to delete prediction");
        }
      } catch (error) {
        console.error("Error deleting prediction:", error);
      }
    },
    [fetchPredictions],
  );

  useEffect(() => {
    if (status === "authenticated") {
      fetchPredictions();
    }
  }, [status, fetchPredictions]);

  if (status === "unauthenticated") return <SessionUnauthenticated />;
  if (status === "loading") return <SessionLoading />;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-full text-center justify-center w-full">
          {loading ? (
            <CircularProgress
              color="secondary"
              label="Chargement..."
              size="lg"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <PredictionNewModal onAdd={handleAddPrediction} />
              {predictions.map((prediction) => (
                <PredictionCard
                  key={prediction.id}
                  prediction={prediction}
                  onPredictionDelete={handlePredictionDelete}
                  onPredictionUpdate={handlePredictionUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
