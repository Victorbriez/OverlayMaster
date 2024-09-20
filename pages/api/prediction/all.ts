import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const predictions = await prisma.prediction.findMany();

      res.status(200).json(predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      res.status(500).json({ error: "Failed to fetch predictions" });
    }
  } else if (req.method === "POST") {
    const {
      name,
      color_bg_header,
      color_text_header,
      color_bg_body,
      color_bg_left,
      color_bg_right,
      color_text_options_body,
      color_text_results_body,
      color_bg_footer,
      color_text_footer,
    } = req.body;

    if (
      !name ||
      !color_bg_header ||
      !color_text_header ||
      !color_bg_body ||
      !color_bg_left ||
      !color_bg_right ||
      !color_text_options_body ||
      !color_text_results_body ||
      !color_bg_footer ||
      !color_text_footer
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required to create a prediction" });
    }

    try {
      const newPrediction = await prisma.prediction.create({
        data: {
          name,
          color_bg_header,
          color_text_header,
          color_bg_body,
          color_bg_left,
          color_bg_right,
          color_text_options_body,
          color_text_results_body,
          color_bg_footer,
          color_text_footer,
        },
      });

      res.status(201).json(newPrediction);
    } catch (error) {
      console.error("Error creating prediction:", error);
      res.status(500).json({ error: "Failed to create prediction" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
