import type { NewUser, UserScore } from "../types/types";

/**
 * Updates the scores for an existing user and returns the sorted array of user scores.
 * @param newUserScore - Object containing the new score for the user
 * @param userScores - Array of existing user scores
 * @param existingUserIndex - Index of the user to update in the userScores array
 * @returns Sorted array of user scores with updated scores for the existing user
 */

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
