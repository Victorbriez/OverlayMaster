import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const predictionId = Number(id);

  if (isNaN(predictionId)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  if (req.method === "PUT") {
    try {
      const updatedPrediction = req.body;

      if (!updatedPrediction || !updatedPrediction.name) {
        return res
          .status(400)
          .json({ error: "Données manquantes ou invalides." });
      }

      const prediction = await prisma.prediction.update({
        where: { id: predictionId },
        data: updatedPrediction,
      });

      return res.status(200).json(prediction);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);

      return res
        .status(500)
        .json({ error: "Une erreur est survenue lors de la mise à jour." });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.prediction.delete({
        where: { id: predictionId },
      });

      return res
        .status(200)
        .json({ message: "Prédiction supprimée avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);

      return res
        .status(500)
        .json({ error: "Une erreur est survenue lors de la suppression." });
    }
  } else if (req.method === "GET") {
    try {
      const prediction = await prisma.prediction.findUnique({
        where: { id: predictionId },
      });

      if (!prediction) {
        return res.status(404).json({ error: "Prédiction non trouvée." });
      }

      return res.status(200).json(prediction);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);

      return res.status(500).json({ error: "Une erreur est survenue." });
    }
  } else {
    return res.status(405).json({ error: "Méthode non autorisée." });
  }
}
