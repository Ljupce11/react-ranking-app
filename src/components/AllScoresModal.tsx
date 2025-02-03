import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Button, Card, CardBody, H2, VStack } from "@northlight/ui";
import React from "react";

import type { ActiveUser } from "../types/types";

type Props = {
  isOpen: boolean;
  activeUser: ActiveUser;
  onClose: () => void;
};

export default function AllScoresModal({ isOpen, activeUser, onClose }: Props) {
  return (
    <Modal
      scrollBehavior="inside"
      size={"xl"}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Scores for {activeUser.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {activeUser.allScores
              .sort((a, b) => b - a)
              .map((score: number, _index) => (
                <Card width={"100%"} key={score}>
                  <CardBody textAlign={"center"}>
                    <H2>{score}</H2>
                  </CardBody>
                </Card>
              ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
