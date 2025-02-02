import { beforeEach, describe, expect, it, vi } from "vitest";

import * as scoresModule from "../scores";
import type { UserScore } from "../types/types";
import * as usersModule from "../users";
import { returnInitialUserScores } from "./returnInitialUserScores";

// Mock both modules
vi.mock("../scores");
vi.mock("../users");

describe("returnInitialUserScores", () => {
	beforeEach(() => {
		// Reset all mocks before each test
		vi.resetAllMocks();
	});

	it("should return empty array when no users have scores", () => {
		vi.mocked(scoresModule).default = [];
		vi.mocked(usersModule).default = [];

		const result = returnInitialUserScores();
		expect(result).toEqual([]);
	});

	it("should process users with scores correctly", () => {
		vi.mocked(scoresModule).default = [
			{ userId: 1, score: 100 },
			{ userId: 1, score: 200 },
			{ userId: 2, score: 150 },
		];
		vi.mocked(usersModule).default = [
			{ _id: 1, name: "Jane" },
			{ _id: 2, name: "Barry" },
			{ _id: 3, name: "Kim" },
		];

		const result = returnInitialUserScores();

		const expected: UserScore[] = [
			{ name: "Jane", userId: 1, score: 200, allScores: [100, 200] },
			{ name: "Barry", userId: 2, score: 150, allScores: [150] },
		];

		expect(result).toEqual(expected);
	});

	it("should handle duplicate scores for users", () => {
		vi.mocked(scoresModule).default = [
			{ userId: 1, score: 100 },
			{ userId: 1, score: 100 }, // Duplicate score
			{ userId: 1, score: 200 },
		];
		vi.mocked(usersModule).default = [{ _id: 1, name: "Jane" }];

		const result = returnInitialUserScores();

		expect(result).toHaveLength(1);
		expect(result[0].allScores).toEqual([100, 200]);
	});

	it("should sort users by highest score in descending order", () => {
		vi.mocked(scoresModule).default = [
			{ userId: 1, score: 100 },
			{ userId: 2, score: 300 },
			{ userId: 3, score: 200 },
		];
		vi.mocked(usersModule).default = [
			{ _id: 1, name: "Jane" },
			{ _id: 2, name: "Barry" },
			{ _id: 3, name: "Kim" },
		];

		const result = returnInitialUserScores();

		expect(result.map((user) => user.score)).toEqual([300, 200, 100]);
		expect(result.map((user) => user.name)).toEqual(["Barry", "Kim", "Jane"]);
	});

	it("should skip users with no scores", () => {
		vi.mocked(scoresModule).default = [{ userId: 1, score: 100 }];
		vi.mocked(usersModule).default = [
			{ _id: 1, name: "Jane" },
			{ _id: 2, name: "Barry" }, // No scores for Barry
		];

		const result = returnInitialUserScores();

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe("Jane");
	});

	it("should handle real-world data scenario", () => {
		vi.mocked(scoresModule).default = [
			{ userId: 1, score: 474 },
			{ userId: 1, score: 988 },
			{ userId: 1, score: 30 },
			{ userId: 2, score: 592 },
			{ userId: 2, score: 742 },
			{ userId: 3, score: 974 },
			{ userId: 3, score: 465 },
		];
		vi.mocked(usersModule).default = [
			{ _id: 1, name: "Jane" },
			{ _id: 2, name: "Barry" },
			{ _id: 3, name: "Kim" },
		];

		const result = returnInitialUserScores();

		const expected: UserScore[] = [
			{ name: "Kim", userId: 3, score: 974, allScores: [465, 974] },
			{ name: "Jane", userId: 1, score: 988, allScores: [30, 474, 988] },
			{ name: "Barry", userId: 2, score: 742, allScores: [592, 742] },
		].sort((a, b) => b.score - a.score);

		expect(result).toEqual(expected);
	});
});
