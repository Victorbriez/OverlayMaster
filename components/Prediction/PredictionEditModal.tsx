import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { PredictionEditModalProps, PredictionInterface } from "@/types";

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

export const PredictionEditModal: React.FC<PredictionEditModalProps> = ({
  prediction,
  onSave,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editedPrediction, setEditedPrediction] =
    useState<PredictionInterface>(prediction);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setEditedPrediction(prediction);
      setError("");
    }
  }, [isOpen, prediction]);

  const handleChange = (key: keyof PredictionInterface, value: string) => {
    setEditedPrediction((prev) => ({ ...prev, [key]: value }));
    if (key === "name" && value.trim() !== "") {
      setError("");
    }
  };

  const handleSave = () => {
    if (editedPrediction.name.trim() === "") {
      setError("Le nom de la prédiction est obligatoire.");

      return;
    }
    onSave(editedPrediction);
    onOpenChange();
  };

  const colorInputs = [
    { key: "color_bg_header", label: "Couleur du fond de l'en-tête" },
    { key: "color_text_header", label: "Couleur du texte de l'en-tête" },
    { key: "color_bg_body", label: "Couleur du fond du corps" },
    { key: "color_bg_left", label: "Couleur de la barre de gauche" },
    { key: "color_bg_right", label: "Couleur de la barre de droite" },
    { key: "color_text_options_body", label: "Couleur du texte des options" },
    { key: "color_text_results_body", label: "Couleur du texte des résultats" },
    { key: "color_bg_footer", label: "Couleur du fond du pied de page" },
    { key: "color_text_footer", label: "Couleur du texte du pied de page" },
  ];

  return (
    <>
      <Button color="warning" onPress={onOpen}>
        Modifier
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="3xl"
        onClose={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            <h2 className="text-2xl font-bold">Modifier la prédiction</h2>
            <p className="text-gray-500">
              Vous pouvez ajuster les couleurs et le nom de votre prédiction.
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                error={error}
                label="Nom de la prédiction"
                value={editedPrediction.name}
                onChange={(value) => handleChange("name", value)}
              />
              {colorInputs.map(({ key, label }) => (
                <ColorInput
                  key={key}
                  label={label}
                  value={String(
                    editedPrediction[key as keyof PredictionInterface],
                  )}
                  onChange={(value) =>
                    handleChange(key as keyof PredictionInterface, value)
                  }
                />
              ))}
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-end">
            <Button
              className="mr-2"
              color="danger"
              variant="light"
              onPress={onOpenChange}
            >
              Annuler
            </Button>
            <Button color="primary" onPress={handleSave}>
              Sauvegarder les modifications
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
