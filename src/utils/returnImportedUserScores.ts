import type { ExcelRow } from "../types/types";
import type { UserScore } from "../types/types";

/**
 * Merges and updates user scores with imported Excel data.
 * @param userScores - Array of existing user scores
 * @param excelData - Array of imported Excel rows containing new score data
 * @returns Array of merged and updated user scores, sorted by score in descending order
 */

export const returnImportedUserScores = (
  userScores: UserScore[],
  excelData: ExcelRow[],
): UserScore[] => {
  const scoreMap = new Map<string, UserScore>();
  userScores.forEach(({ name, ...rest }, _index) => {
    scoreMap.set(name, { name, ...rest });
  });

  excelData.forEach((row, index) => {
    const existingUser = scoreMap.get(row.name);

    if (existingUser) {
      // If the user already exists, update the score and allScores
      if (existingUser?.allScores) {
        existingUser.allScores = Array.from(
          new Set([...existingUser.allScores, row.score].sort((a, b) => a - b)),
        );
        existingUser.score = Math.max(...existingUser.allScores);
      } else {
        existingUser.allScores = [row.score];
      }
    } else {
      // If it's a new user, assign a new userId
      const newUserId =
        Math.max(0, ...userScores.map((user) => user.userId)) + index + 1;
      scoreMap.set(row.name, {
        name: row.name,
        score: row.score,
        userId: newUserId,
        allScores: [row.score],
      });
    }
  });

  // Convert map values to an array and sort by score descending
  return Array.from(scoreMap.values()).sort((a, b) => b.score - a.score);
};
