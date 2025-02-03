import type { NewUser, UserScore } from "../types/types";

/**
 * Handles adding a new score to the user scores list
 * @param newUser - The new user data to be added
 * @param userScores - The existing array of user scores
 * @returns An object containing:
 * - updatedUserScores: Array of updated user scores
 * - duplicateUser: Information about duplicate user if exists, null otherwise
 * - isDuplicate: Boolean indicating if the user already exists
 */

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
      allScores: [newUser.score],
    },
  ];
  return {
    updatedUserScores: updatedUserScores.sort((a, b) => b.score - a.score),
    duplicateUser: null,
    isDuplicate: false,
  };
};
