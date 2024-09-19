import React, { useState } from "react";
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
  <Input
    fullWidth
    label={label}
    type="color"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export const PredictionEditModal: React.FC<PredictionEditModalProps> = ({
  prediction,
  onSave,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editedPrediction, setEditedPrediction] =
    useState<PredictionInterface>(prediction);

  const handleChange = (key: keyof PredictionInterface, value: string) => {
    setEditedPrediction((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
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
          <ModalHeader className="flex flex-col gap-1">
            Modifier la prédiction
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                fullWidth
                label="Nom de la prédiction"
                value={editedPrediction.name}
                onChange={(e) => handleChange("name", e.target.value)}
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
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
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
