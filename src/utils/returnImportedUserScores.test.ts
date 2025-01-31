import { describe, expect, it, vi } from "vitest";

import type { ExcelRow } from "../types/types";
import type { UserScore } from "../types/types";
import { returnImportedUserScores } from "./returnImportedUserScores";

// Mock data
const mockUserScores: UserScore[] = [
	{ name: "Alice", score: 10, userId: 1 },
	{ name: "Bob", score: 15, userId: 2 },
	{ name: "Charlie", score: 5, userId: 3 },
];

const mockExcelData: ExcelRow[] = [
	{ name: "Alice", score: 20 },
	{ name: "Charlie", score: 25 },
	{ name: "David", score: 30 },
];

// Unit tests
describe("returnImportedUserScores", () => {
	it("should return an empty array when both userScores and excelData are empty", () => {
		const result = returnImportedUserScores([], []);
		expect(result).toEqual([]);
	});

	it("should merge userScores and excelData and return the highest score for each user", () => {
		const result = returnImportedUserScores(mockUserScores, mockExcelData);
		const expected: UserScore[] = [
			{ name: "David", score: 30, userId: 4 },
			{ name: "Charlie", score: 25, userId: 3 },
			{ name: "Alice", score: 20, userId: 1 },
			{ name: "Bob", score: 15, userId: 2 },
		];
		expect(result).toEqual(expected);
	});

	it("should add new users from excelData with unique userIds", () => {
		const result = returnImportedUserScores(mockUserScores, mockExcelData);
		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ userId: expect.any(Number), name: "David" }),
			]),
		);
	});

	it("should return the highest score when a user has scores in both userScores and excelData", () => {
		const result = returnImportedUserScores(mockUserScores, [
			{ name: "Alice", score: 25 },
		]);
		expect(result).toEqual([
			{ name: "Alice", score: 25, userId: 1 }, // Alice should have the highest score of 25
			{ name: "Bob", score: 15, userId: 2 },
			{ name: "Charlie", score: 5, userId: 3 },
		]);
	});

	it("should handle users that exist only in excelData and not in userScores", () => {
		const result = returnImportedUserScores(mockUserScores, [
			{ name: "Eve", score: 40 },
		]);
		expect(result).toEqual([
			{ name: "Eve", score: 40, userId: 4 }, // Eve should be added as a new user with userId 4
			...mockUserScores,
		]);
	});

	it("should return an empty array when all excelData is empty", () => {
		const result = returnImportedUserScores(mockUserScores, []);
		expect(result).toEqual(mockUserScores); // Only userScores should be returned
	});

	it("should handle empty userScores with only data from excelData", () => {
		const result = returnImportedUserScores([], mockExcelData);
		const expected: UserScore[] = [
			{ name: "Alice", score: 20, userId: 1 },
			{ name: "Charlie", score: 25, userId: 2 },
			{ name: "David", score: 30, userId: 3 },
		];
		expect(result).toEqual(expected);
	});

	it("should sort the final data by score in descending order", () => {
		const result = returnImportedUserScores(mockUserScores, [
			{ name: "Eve", score: 40 },
			{ name: "Alice", score: 30 },
		]);
		expect(result).toEqual([
			{ name: "Eve", score: 40, userId: 4 },
			{ name: "Alice", score: 30, userId: 1 },
			{ name: "Bob", score: 15, userId: 2 },
			{ name: "Charlie", score: 5, userId: 3 },
		]);
	});
});
