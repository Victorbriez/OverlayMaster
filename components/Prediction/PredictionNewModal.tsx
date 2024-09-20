import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { PredictionInterface } from "@/types";

const ColorInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm font-semibold mb-2">{label}</label>
    <Input
      className="w-full h-10 p-0 rounded-md cursor-pointer"
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const TextInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}> = ({ label, value, onChange, error }) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm font-semibold mb-2">{label}</label>
    <Input
      isRequired
      className="w-full h-10 p-0 rounded-md"
      placeholder={label}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

export const PredictionNewModal: React.FC<{
  onAdd: (prediction: PredictionInterface) => void;
}> = ({ onAdd }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newPrediction, setNewPrediction] = useState<
    Omit<PredictionInterface, "id">
  >({
    name: "",
    color_bg_header: "#ffffff",
    color_text_header: "#000000",
    color_bg_body: "#ffffff",
    color_bg_left: "#ffffff",
    color_bg_right: "#ffffff",
    color_text_options_body: "#000000",
    color_text_results_body: "#000000",
    color_bg_footer: "#ffffff",
    color_text_footer: "#000000",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    key: keyof Omit<PredictionInterface, "id">,
    value: string,
  ) => {
    setNewPrediction((prev) => ({ ...prev, [key]: value }));
    if (key === "name" && value) {
      setError("");
    }
  };

  useEffect(() => {
    if (isOpen) {
      setNewPrediction({
        name: "",
        color_bg_header: "#ffffff",
        color_text_header: "#000000",
        color_bg_body: "#ffffff",
        color_bg_left: "#ffffff",
        color_bg_right: "#ffffff",
        color_text_options_body: "#000000",
        color_text_results_body: "#000000",
        color_bg_footer: "#ffffff",
        color_text_footer: "#000000",
      });
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!newPrediction.name) {
      setError("Le nom de la prédiction est obligatoire");

      return;
    }
    onAdd(newPrediction);
    onOpenChange();
  };

  return (
    <>
      <Card isHoverable isPressable onPress={onOpen}>
        <CardBody className="flex items-center justify-center h-full">
          <div className="text-center">
            <p>+ Ajouter Prédiction</p>
          </div>
        </CardBody>
      </Card>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="3xl"
        onClose={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            <h2 className="text-2xl font-bold">
              Ajouter une nouvelle prédiction
            </h2>
            <p className="text-gray-500">
              Veuillez remplir les détails de la nouvelle prédiction.
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                error={error}
                label="Nom de la prédiction"
                value={newPrediction.name}
                onChange={(value) => handleChange("name", value)}
              />

              <ColorInput
                label="Couleur du fond de l'en-tête"
                value={newPrediction.color_bg_header}
                onChange={(value) => handleChange("color_bg_header", value)}
              />

              <ColorInput
                label="Couleur du texte de l'en-tête"
                value={newPrediction.color_text_header}
                onChange={(value) => handleChange("color_text_header", value)}
              />

              <ColorInput
                label="Couleur du fond du corps"
                value={newPrediction.color_bg_body}
                onChange={(value) => handleChange("color_bg_body", value)}
              />

              <ColorInput
                label="Couleur de la barre de gauche"
                value={newPrediction.color_bg_left}
                onChange={(value) => handleChange("color_bg_left", value)}
              />

              <ColorInput
                label="Couleur de la barre de droite"
                value={newPrediction.color_bg_right}
                onChange={(value) => handleChange("color_bg_right", value)}
              />

              <ColorInput
                label="Couleur du texte des options"
                value={newPrediction.color_text_options_body}
                onChange={(value) =>
                  handleChange("color_text_options_body", value)
                }
              />

              <ColorInput
                label="Couleur du texte des résultats"
                value={newPrediction.color_text_results_body}
                onChange={(value) =>
                  handleChange("color_text_results_body", value)
                }
              />

              <ColorInput
                label="Couleur du fond du pied de page"
                value={newPrediction.color_bg_footer}
                onChange={(value) => handleChange("color_bg_footer", value)}
              />

              <ColorInput
                label="Couleur du texte du pied de page"
                value={newPrediction.color_text_footer}
                onChange={(value) => handleChange("color_text_footer", value)}
              />
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-end">
            <Button color="danger" variant="light" onPress={onOpenChange}>
              Annuler
            </Button>
            <Button color="primary" onPress={handleSave}>
              Ajouter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
