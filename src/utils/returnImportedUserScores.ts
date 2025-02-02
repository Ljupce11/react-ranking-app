import type { ExcelRow } from "../types/types";
import type { UserScore } from "../types/types";

export const returnImportedUserScores = (
	userScores: UserScore[],
	excelData: ExcelRow[],
): UserScore[] => {
	const scoreMap = new Map<string, UserScore>();
	userScores.forEach(({ name, score, userId }, _index) => {
		scoreMap.set(name, { name, score, userId });
	});

	excelData.forEach((row, index) => {
		const existingUser = scoreMap.get(row.name);

		if (existingUser) {
			// If the user already exists, update only if the new score is higher
			if (row.score > existingUser.score) {
				scoreMap.set(row.name, { ...existingUser, score: row.score });
			}
		} else {
			// If it's a new user, assign a new userId
			const newUserId =
				Math.max(0, ...userScores.map((user) => user.userId)) + index + 1;
			scoreMap.set(row.name, {
				name: row.name,
				score: row.score,
				userId: newUserId,
			});
		}
	});

	// Convert map values to an array and sort by score descending
	return Array.from(scoreMap.values()).sort((a, b) => b.score - a.score);
};
