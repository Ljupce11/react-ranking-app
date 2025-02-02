import { Button, Container, H2, Icon, P } from "@northlight/ui";
import React, { useState } from "react";

import {
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { ExecutionDuo } from "@northlight/icons";
import { AddUserScoreSection } from "./components/AddUserScoreSection.js";
// import { ExerciseDescription } from "./components/ExerciseDescription.js";
import { UserScoresTable } from "./components/UserScoresTable.js";
import { TOAST_SETTINGS } from "./constants";
import type { DuplicateUser, ExcelRow, NewUser } from "./types/types";
import { handleAddNewScoreUtil } from "./utils/handleAddNewScoreUtil.js";
import { returnImportedUserScores } from "./utils/returnImportedUserScores.js";
import { returnInitialUserScores } from "./utils/returnInitialUserScores.js";

export default function App() {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [userScores, setUserScores] = useState(returnInitialUserScores());
	const [duplicateUser, setDuplicateUser] = useState<DuplicateUser | null>(
		null,
	);

	const handleSheetData = (data: ExcelRow[]) => {
		const updatedUserScores = returnImportedUserScores(userScores, data);
		setUserScores(updatedUserScores);
		toast({
			...TOAST_SETTINGS,
			description: "The excel file has been imported successfully",
		});
	};

	const handleAddNewScore = (newUser: NewUser | null | undefined) => {
		if (!newUser) {
			toast({
				...TOAST_SETTINGS,
				variant: "error",
				description: "Invalid user data",
			});
			return;
		}

		const { updatedUserScores, duplicateUser, isDuplicate } =
			handleAddNewScoreUtil(newUser, userScores);

		if (isDuplicate) {
			if (duplicateUser) {
				setDuplicateUser(duplicateUser);
				onOpen();
			} else {
				toast({
					...TOAST_SETTINGS,
					variant: "error",
					description: "A user with the same name and score already exists",
				});
			}
		} else {
			setUserScores(updatedUserScores);
			toast({
				...TOAST_SETTINGS,
				description: "The user score has been added successfully",
			});
		}
	};

	const overrideExistingUserScore = (duplicateUser: DuplicateUser) => {
		const { newUserScore, name } = duplicateUser;
		const existingUserIndex = userScores.findIndex(
			(user) => user.name === name,
		);
		if (existingUserIndex === -1) {
			toast({
				...TOAST_SETTINGS,
				variant: "error",
				description: `Cannot update score: User "${name}" not found`,
			});
			return;
		}
		const updatedUserScores = [...userScores];
		updatedUserScores[existingUserIndex].score = newUserScore.score;
		setUserScores(updatedUserScores.sort((a, b) => b.score - a.score));
		onClose();
		toast({
			...TOAST_SETTINGS,
			description: "The user score has been updated successfully",
		});
	};

	return (
		<Container maxW="6xl" padding="4">
			<HStack alignItems={"center"} marginBottom={4} gap={4}>
				<Icon size="lg" variant="success" as={ExecutionDuo} />
				<H2>Mediatool exercise</H2>
			</HStack>
			{/* <ExerciseDescription /> */}
			{isOpen && duplicateUser && (
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
							<P>Would you like to override the user's existing score?</P>
						</ModalBody>
						<ModalFooter gap={2}>
							<Button onClick={onClose}>No</Button>
							<Button onClick={() => overrideExistingUserScore(duplicateUser)}>
								Yes
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
			<AddUserScoreSection
				handleSheetData={handleSheetData}
				handleAddNewScore={handleAddNewScore}
			/>
			<UserScoresTable userScores={userScores} />
		</Container>
	);
}
