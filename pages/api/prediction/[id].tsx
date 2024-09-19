import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updatedPrediction = req.body;

      const prediction = await prisma.prediction.update({
        where: {
          id: Number(id),
        },
        data: updatedPrediction,
      });

      return res.status(200).json(prediction);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: "Une erreur est survenue." });
    }
  } else {
    return res.status(405).json({ error: "Méthode non autorisée." });
  }
}
