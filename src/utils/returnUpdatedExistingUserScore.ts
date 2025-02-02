import type { NewUser, UserScore } from "../types/types";

export const returnUpdatedExistingUserScore = (
	newUserScore: NewUser,
	userScores: UserScore[],
	existingUserIndex: number,
): UserScore[] => {
	const updatedUserScores = [...userScores];

	updatedUserScores[existingUserIndex].allScores = Array.from(
		[
			...updatedUserScores[existingUserIndex].allScores,
			newUserScore.score,
		].sort((a, b) => a - b),
	);

	updatedUserScores[existingUserIndex].score = Math.max(
		...updatedUserScores[existingUserIndex].allScores,
	);

	return updatedUserScores.sort((a, b) => b.score - a.score);
};
