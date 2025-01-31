import type { ExcelRow } from "../types/types";

import type { UserScore } from "../types/types";

export const returnImportedUserScores = (
	userScores: UserScore[],
	excelData: ExcelRow[],
) => {
	const finalData: UserScore[] = [];
	const combinedData = [
		...userScores,
		...excelData.map((row, index) => ({
			...row,
			userId: userScores.length + index + 1,
		})),
	];
	const uniqueUsers = Array.from(new Set(combinedData.map(({ name }) => name)));

	uniqueUsers.forEach((user, _i) => {
		const updatedUserScores = combinedData.filter(
			(score) => score.name === user,
		);
		const maxValueObject = updatedUserScores.reduce((maxObj, currentObj) => {
			return currentObj.score > maxObj.score ? currentObj : maxObj;
		}, updatedUserScores[0]);

		finalData.push(maxValueObject);
	});

	return finalData.sort((a, b) => b.score - a.score);
};
