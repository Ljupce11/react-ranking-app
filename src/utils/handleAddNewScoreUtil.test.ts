import { describe, expect, it } from "vitest";
import type { NewUser, UserScore } from "../types/types";
import { handleAddNewScoreUtil } from "./handleAddNewScoreUtil";

describe("handleAddNewScoreUtil", () => {
  const baseUserScores: UserScore[] = [
    {
      name: "Alice",
      score: 100,
      userId: 1,
      allScores: [100],
    },
    {
      name: "Bob",
      score: 90,
      userId: 2,
      allScores: [90],
    },
  ];

  it("should add a new user with correct userId and sorted position", () => {
    const newUser: NewUser = {
      name: "Charlie",
      score: 95,
    };

    const result = handleAddNewScoreUtil(newUser, baseUserScores);

    expect(result).toEqual({
      updatedUserScores: [
        {
          name: "Alice",
          score: 100,
          userId: 1,
          allScores: [100],
        },
        {
          name: "Charlie",
          score: 95,
          userId: 3,
          allScores: [95],
        },
        {
          name: "Bob",
          score: 90,
          userId: 2,
          allScores: [90],
        },
      ],
      duplicateUser: null,
      isDuplicate: false,
    });
  });

  it("should handle duplicate user with same score", () => {
    const newUser: NewUser = {
      name: "Alice",
      score: 100,
    };

    const result = handleAddNewScoreUtil(newUser, baseUserScores);

    expect(result).toEqual({
      updatedUserScores: baseUserScores,
      duplicateUser: null,
      isDuplicate: true,
    });
  });

  it("should handle duplicate user with higher score", () => {
    const newUser: NewUser = {
      name: "Alice",
      score: 120,
    };

    const result = handleAddNewScoreUtil(newUser, baseUserScores);

    expect(result).toEqual({
      updatedUserScores: baseUserScores,
      duplicateUser: {
        name: "Alice",
        score: 100,
        userId: 1,
        allScores: [100],
        newUserScore: newUser,
        isScoreHigher: false,
      },
      isDuplicate: true,
    });
  });

  it("should handle duplicate user with lower score", () => {
    const newUser: NewUser = {
      name: "Alice",
      score: 80,
    };

    const result = handleAddNewScoreUtil(newUser, baseUserScores);

    expect(result).toEqual({
      updatedUserScores: baseUserScores,
      duplicateUser: {
        name: "Alice",
        score: 100,
        userId: 1,
        allScores: [100],
        newUserScore: newUser,
        isScoreHigher: true,
      },
      isDuplicate: true,
    });
  });

  it("should assign correct userId when adding first user", () => {
    const newUser: NewUser = {
      name: "First",
      score: 100,
    };

    const result = handleAddNewScoreUtil(newUser, []);

    expect(result.updatedUserScores).toEqual([
      {
        name: "First",
        score: 100,
        userId: 1,
        allScores: [100],
      },
    ]);
    expect(result.isDuplicate).toBe(false);
    expect(result.duplicateUser).toBeNull();
  });

  it("should maintain correct sorting with multiple users", () => {
    const existingScores: UserScore[] = [
      {
        name: "First",
        score: 100,
        userId: 1,
        allScores: [100],
      },
      {
        name: "Second",
        score: 80,
        userId: 2,
        allScores: [80],
      },
      {
        name: "Third",
        score: 90,
        userId: 3,
        allScores: [90],
      },
    ];

    const newUser: NewUser = {
      name: "Fourth",
      score: 85,
    };

    const result = handleAddNewScoreUtil(newUser, existingScores);

    expect(result.updatedUserScores.map((user) => user.score)).toEqual([
      100, 90, 85, 80,
    ]);
    expect(result.updatedUserScores.map((user) => user.name)).toEqual([
      "First",
      "Third",
      "Fourth",
      "Second",
    ]);
  });

  it("should handle edge case with very high scores", () => {
    const newUser: NewUser = {
      name: "HighScorer",
      score: 999999,
    };

    const result = handleAddNewScoreUtil(newUser, baseUserScores);

    expect(result.updatedUserScores[0]).toEqual({
      name: "HighScorer",
      score: 999999,
      userId: 3,
      allScores: [999999],
    });
  });

  it("should handle edge case with very low scores", () => {
    const newUser: NewUser = {
      name: "LowScorer",
      score: -999999,
    };

    const result = handleAddNewScoreUtil(newUser, baseUserScores);

    expect(
      result.updatedUserScores[result.updatedUserScores.length - 1],
    ).toEqual({
      name: "LowScorer",
      score: -999999,
      userId: 3,
      allScores: [-999999],
    });
  });
});
