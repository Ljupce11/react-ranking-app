import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { P } from "@northlight/ui";
import React from "react";

import type { DuplicateUser } from "../types/types";

type Props = {
	isOpen: boolean;
	duplicateUser: DuplicateUser;
	onClose: () => void;
	overrideExistingUserScore: (duplicateUser: DuplicateUser) => void;
};

export default function DuplicateUserModal({
	isOpen,
	duplicateUser,
	onClose,
	overrideExistingUserScore,
}: Props) {
	return (
		<Modal size={"xl"} onClose={onClose} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>User already exists</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<P>
						The user with name <strong>{duplicateUser.name}</strong> already
						exists and has a
						<strong>
							{duplicateUser.isScoreHigher ? " higher " : " lower "}
						</strong>
						score ({duplicateUser.score})
					</P>
					<P>Would you like to add the new score anyway?</P>
				</ModalBody>
				<ModalFooter gap={2}>
					<Button onClick={onClose}>No</Button>
					<Button onClick={() => overrideExistingUserScore(duplicateUser)}>
						Yes
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
