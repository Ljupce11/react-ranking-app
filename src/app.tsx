import { Container, H1 } from "@northlight/ui";
import React, { useState } from "react";

import { AddUserScoreSection } from "./components/AddUserScoreSection.js";
import { ExerciseDescription } from "./components/ExerciseDescription.js";
import { UserScoresTable } from "./components/UserScoresTable.js";
import type { ExcelRow } from "./types/types";
import { returnImportedUserScores } from "./utils/returnImportedUserScores.js";
import { returnInitialUserScores } from "./utils/returnInitialUserScores.js";

export default function App() {
	const [userScores, setUserScores] = useState(returnInitialUserScores());

	const handleSheetData = (data: ExcelRow[]) => {
		const updatedUserScores = returnImportedUserScores(userScores, data);
		setUserScores(updatedUserScores);
	};

	const handleAddNewScore = (newUser: { name: string; score: number }) => {
		const updatedUserScores = [
			...userScores,
			{ ...newUser, userId: userScores.length + 1 },
		];
		setUserScores(updatedUserScores.sort((a, b) => b.score - a.score));
	};

	return (
		<Container maxW="6xl" padding="4">
			<H1 marginBottom="4">Mediatool exercise</H1>
			<ExerciseDescription />
			<AddUserScoreSection
				handleSheetData={handleSheetData}
				handleAddNewScore={handleAddNewScore}
			/>
			<UserScoresTable userScores={userScores} />
		</Container>
	);
}
