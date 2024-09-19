import React, { useState } from "react";
import { Card, CardBody, Snippet, Switch, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

import { PredictionComponent } from "./PredictionComponent";
import { PredictionEditModal } from "./PredictionEditModal";

import { PredictionCardProps, PredictionInterface } from "@/types";

const DirectionToggle: React.FC<{
  direction: "vertical" | "horizontal";
  onChange: (newDirection: "vertical" | "horizontal") => void;
}> = ({ direction, onChange }) => (
  <div className="flex items-center justify-between mb-4">
    <span className="font-bold">Horizontal</span>
    <Switch
      checked={direction === "vertical"}
      onChange={(e) => onChange(e.target.checked ? "vertical" : "horizontal")}
    />
    <span className="font-bold">Vertical</span>
  </div>
);

export const PredictionCard: React.FC<PredictionCardProps> = ({
  prediction: initialPrediction,
  onPredictionUpdate,
}) => {
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "horizontal",
  );
  const [prediction, setPrediction] =
    useState<PredictionInterface>(initialPrediction);

  const handlePredictionUpdate = (updatedPrediction: PredictionInterface) => {
    setPrediction(updatedPrediction);
    onPredictionUpdate(updatedPrediction);
  };
  const router = useRouter();

  return (
    <Card>
      <CardBody>
        <h3 className="text-xl font-bold mb-2">{prediction.name}</h3>

        <DirectionToggle direction={direction} onChange={setDirection} />

        <PredictionComponent direction={direction} prediction={prediction} />

        <div className="mt-4 flex flex-col gap-2">
          <Button
            color="danger"
            onClick={() => {
              alert("Supprimer la prédiction");
            }}
          >
            Supprimer
          </Button>

          <PredictionEditModal
            prediction={prediction}
            onSave={handlePredictionUpdate}
          />

          <Button
            color="primary"
            onClick={() => {
              router.push({
                pathname: `/prediction/${prediction.id}`,
                query: {
                  name: prediction.name,
                  color_bg_header: prediction.color_bg_header,
                  color_text_header: prediction.color_text_header,
                  color_bg_body: prediction.color_bg_body,
                  color_bg_left: prediction.color_bg_left,
                  color_bg_right: prediction.color_bg_right,
                  color_text_options_body: prediction.color_text_options_body,
                  color_text_results_body: prediction.color_text_results_body,
                  color_bg_footer: prediction.color_bg_footer,
                  color_text_footer: prediction.color_text_footer,
                  direction: direction,
                },
              });
            }}
          >
            Voir
          </Button>

          <Snippet
            tooltipProps={{
              color: "foreground",
              content: "Copier le lien",
              disableAnimation: true,
              placement: "right",
              closeDelay: 0,
            }}
          >
            {`http://localhost:3000/prediction/${prediction.id}`}
          </Snippet>
        </div>
      </CardBody>
    </Card>
  );
};
