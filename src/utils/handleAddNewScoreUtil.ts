import type { NewUser, UserScore } from "../types/types";

export const handleAddNewScoreUtil = (
	newUser: NewUser,
	userScores: UserScore[],
) => {
	const existingUserIndex = userScores.findIndex(
		(user) => user.name === newUser.name,
	);
	let updatedUserScores: UserScore[];

	if (existingUserIndex !== -1) {
		updatedUserScores = [...userScores];
		if (newUser.score !== userScores[existingUserIndex].score) {
			return {
				updatedUserScores: [...userScores],
				duplicateUser: {
					...userScores[existingUserIndex],
					newUserScore: newUser,
					isScoreHigher: userScores[existingUserIndex].score > newUser.score,
				},
				isDuplicate: true,
			};
		}
		return {
			updatedUserScores: [...userScores],
			duplicateUser: null,
			isDuplicate: true,
		};
	}

	updatedUserScores = [
		...userScores,
		{
			...newUser,
			userId: Math.max(0, ...userScores.map((user) => user.userId)) + 1,
		},
	];
	return {
		updatedUserScores: updatedUserScores.sort((a, b) => b.score - a.score),
		duplicateUser: null,
		isDuplicate: false,
	};
};
