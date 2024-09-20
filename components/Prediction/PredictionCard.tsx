import React, { useState } from "react";
import {
  Card,
  CardBody,
  Snippet,
  Switch,
  CardHeader,
  Divider,
  Button,
} from "@nextui-org/react";

import { PredictionComponentOverview } from "./PredictionComponentOverview";
import { PredictionEditModal } from "./PredictionEditModal";
import { PredictionDeleteModal } from "./PredictionDeleteModal";

import { PredictionCardProps, PredictionInterface } from "@/types";

const DirectionToggle: React.FC<{
  direction: "vertical" | "horizontal";
  onChange: (newDirection: "vertical" | "horizontal") => void;
}> = ({ direction, onChange }) => (
  <div className="flex items-center justify-between mb-4">
    <span className="font-bold">Direction</span>
    <div className="flex items-center gap-2">
      <span>Horizontal</span>
      <Switch
        checked={direction === "vertical"}
        onChange={(e) => onChange(e.target.checked ? "vertical" : "horizontal")}
      />
      <span>Vertical</span>
    </div>
  </div>
);

export const PredictionCard: React.FC<PredictionCardProps> = ({
  prediction: initialPrediction,
  onPredictionUpdate,
  onPredictionDelete,
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

  return (
    <Card>
      <CardHeader className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">{prediction.name}</h1>
      </CardHeader>

      <CardBody className="flex justify-end">
        <PredictionComponentOverview
          direction={direction}
          prediction={prediction}
        />

        <Divider className="my-4" />

        <div className="flex flex-col gap-2">
          <DirectionToggle direction={direction} onChange={setDirection} />

          <Button
            color="primary"
            onClick={() => window.open(`/prediction/${prediction.id}`)}
          >
            Voir
          </Button>

          <PredictionEditModal
            prediction={prediction}
            onSave={handlePredictionUpdate}
          />

          <PredictionDeleteModal
            prediction={prediction}
            onDelete={onPredictionDelete}
          />

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
