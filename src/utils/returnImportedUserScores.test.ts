import { describe, expect, it } from "vitest";
import type { ExcelRow, UserScore } from "../types/types";
import { returnImportedUserScores } from "./returnImportedUserScores";

describe("returnImportedUserScores", () => {
  it("should handle empty inputs", () => {
    const result = returnImportedUserScores([], []);
    expect(result).toEqual([]);
  });

  it("should add new users from Excel data", () => {
    const userScores: UserScore[] = [];
    const excelData: ExcelRow[] = [
      { name: "Alice", score: 100 },
      { name: "Bob", score: 90 },
    ];

    const result = returnImportedUserScores(userScores, excelData);

    const expectedAlice: UserScore = {
      name: "Alice",
      score: 100,
      userId: 1,
      allScores: [100],
    };

    const expectedBob: UserScore = {
      name: "Bob",
      score: 90,
      userId: 2,
      allScores: [90],
    };

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(expectedAlice);
    expect(result[1]).toEqual(expectedBob);
  });

  it("should update existing users with new scores", () => {
    const userScores: UserScore[] = [
      {
        name: "Alice",
        score: 80,
        userId: 1,
        allScores: [80],
      },
    ];
    const excelData: ExcelRow[] = [{ name: "Alice", score: 90 }];

    const result = returnImportedUserScores(userScores, excelData);

    const expected: UserScore = {
      name: "Alice",
      score: 90,
      userId: 1,
      allScores: [80, 90],
    };

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(expected);
  });

  it("should maintain unique scores in allScores array", () => {
    const userScores: UserScore[] = [
      {
        name: "Alice",
        score: 80,
        userId: 1,
        allScores: [80],
      },
    ];
    const excelData: ExcelRow[] = [
      { name: "Alice", score: 80 }, // Duplicate score
      { name: "Alice", score: 90 }, // New score
    ];

    const result = returnImportedUserScores(userScores, excelData);

    const expected: UserScore = {
      name: "Alice",
      score: 90,
      userId: 1,
      allScores: [80, 90],
    };

    expect(result[0]).toEqual(expected);
  });

  it("should sort users by score in descending order", () => {
    const userScores: UserScore[] = [];
    const excelData: ExcelRow[] = [
      { name: "Charlie", score: 70 },
      { name: "Alice", score: 100 },
      { name: "Bob", score: 85 },
    ];

    const result = returnImportedUserScores(userScores, excelData);

    const expected: UserScore[] = [
      { name: "Alice", score: 100, userId: 2, allScores: [100] },
      { name: "Bob", score: 85, userId: 3, allScores: [85] },
      { name: "Charlie", score: 70, userId: 1, allScores: [70] },
    ];

    expect(result).toEqual(expected);
  });

  it("should correctly assign new userIds based on highest existing userId", () => {
    const userScores: UserScore[] = [
      {
        name: "Alice",
        score: 100,
        userId: 5,
        allScores: [100],
      },
    ];
    const excelData: ExcelRow[] = [
      { name: "Bob", score: 90 },
      { name: "Charlie", score: 85 },
    ];

    const result = returnImportedUserScores(userScores, excelData);

    const expected: UserScore[] = [
      { name: "Alice", score: 100, userId: 5, allScores: [100] },
      { name: "Bob", score: 90, userId: 6, allScores: [90] },
      { name: "Charlie", score: 85, userId: 7, allScores: [85] },
    ];

    expect(result).toEqual(expected);
  });
});
