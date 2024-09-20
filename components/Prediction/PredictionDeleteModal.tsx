import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { PredictionDeleteModalProps } from "@/types";

export const PredictionDeleteModal: React.FC<PredictionDeleteModalProps> = ({
  prediction,
  onDelete,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    onDelete(prediction.id);
    onOpenChange();
  };

  return (
    <>
      <Button color="danger" onPress={onOpen}>
        Supprimer
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="md"
        onClose={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Supprimer la prédiction
          </ModalHeader>
          <ModalBody>
            <p>Êtes-vous sûr de vouloir supprimer cette prédiction ?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onOpenChange}>
              Annuler
            </Button>
            <Button color="danger" variant="light" onPress={handleDelete}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
