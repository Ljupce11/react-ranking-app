import { Container, H1, useToast } from "@northlight/ui";
import React, { useState } from "react";

import { AddUserScoreSection } from "./components/AddUserScoreSection.js";
// import { ExerciseDescription } from "./components/ExerciseDescription.js";
import { UserScoresTable } from "./components/UserScoresTable.js";
import { TOAST_SETTINGS } from "./constants";
import type { ExcelRow } from "./types/types";
import { returnImportedUserScores } from "./utils/returnImportedUserScores.js";
import { returnInitialUserScores } from "./utils/returnInitialUserScores.js";

export default function App() {
	const toast = useToast();
	const [userScores, setUserScores] = useState(returnInitialUserScores());

	const handleSheetData = (data: ExcelRow[]) => {
		const updatedUserScores = returnImportedUserScores(userScores, data);
		setUserScores(updatedUserScores);
		// @ts-expect-error
		toast({
			description: "The excel file has been imported successfully",
			...TOAST_SETTINGS,
		});
	};

	const handleAddNewScore = (newUser: { name: string; score: number }) => {
		const updatedUserScores = [
			...userScores,
			{ ...newUser, userId: userScores.length + 1 },
		];
		setUserScores(updatedUserScores.sort((a, b) => b.score - a.score));
		// @ts-expect-error
		toast({
			description: "The user score has been added successfully",
			...TOAST_SETTINGS,
		});
	};

	return (
		<Container maxW="6xl" padding="4">
			<H1 marginBottom="4">Mediatool exercise</H1>
			{/* <ExerciseDescription /> */}
			<AddUserScoreSection
				handleSheetData={handleSheetData}
				handleAddNewScore={handleAddNewScore}
			/>
			<UserScoresTable userScores={userScores} />
		</Container>
	);
}
