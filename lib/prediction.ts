import { PredictionInterface } from "@/types";

export const fetchPredictionById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/prediction/${id}`,
    );
    const prediction: PredictionInterface | null = await res.json();

    if (!prediction) {
      return null;
    }

    return prediction;
  } catch (error) {
    console.error("Erreur lors de la récupération de la prédiction :", error);

    return null;
  }
};
