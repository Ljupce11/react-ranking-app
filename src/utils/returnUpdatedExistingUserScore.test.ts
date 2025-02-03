import { beforeEach, describe, expect, it } from "vitest";

import type { NewUser, UserScore } from "../types/types";
import { returnUpdatedExistingUserScore } from "./returnUpdatedExistingUserScore";

describe("returnUpdatedExistingUserScore", () => {
  let mockUserScores: UserScore[];

  beforeEach(() => {
    mockUserScores = [
      { userId: 1, name: "User1", score: 100, allScores: [100, 90, 80] },
      { userId: 2, name: "User2", score: 95, allScores: [95, 85, 75] },
    ];
  });

  it("should add new score to existing user scores array", () => {
    const newUserScore: NewUser = { name: "User1", score: 85 };
    const result = returnUpdatedExistingUserScore(
      newUserScore,
      mockUserScores,
      0,
    );

    expect(result[0].allScores).toEqual([80, 85, 90, 100]);
  });

  it("should update max score correctly", () => {
    const newUserScore: NewUser = { name: "User1", score: 110 };
    const result = returnUpdatedExistingUserScore(
      newUserScore,
      mockUserScores,
      0,
    );

    expect(result[0].score).toBe(110);
  });

  it("should maintain sorted allScores array", () => {
    const newUserScore: NewUser = { name: "User1", score: 85 };
    const result = returnUpdatedExistingUserScore(
      newUserScore,
      mockUserScores,
      0,
    );

    const isSorted = result[0].allScores.every(
      (score, index, array) => index === 0 || array[index - 1] <= score,
    );

    expect(isSorted).toBe(true);
  });

  it("should sort final array by score in descending order", () => {
    const newUserScore: NewUser = { name: "User2", score: 120 };
    const result = returnUpdatedExistingUserScore(
      newUserScore,
      mockUserScores,
      1,
    );

    const areScoresSorted = result.every(
      (score, index, array) =>
        index === 0 || array[index - 1].score >= score.score,
    );
    expect(areScoresSorted).toBe(true);
  });
});
