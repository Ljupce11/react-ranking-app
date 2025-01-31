import { beforeEach, describe, expect, it, vi } from "vitest";

import type { UserScore } from "../types/types";

vi.mock("../users", () => ({ default: [] }));
vi.mock("../scores", () => ({ default: [] }));

describe("returnInitialUserScores", () => {
	let returnInitialUserScores: () => UserScore[];
	let mockUsers: { _id: number; name: string }[];
	let mockScores: { userId: number; score: number }[];

	beforeEach(async () => {
		vi.resetModules();

		mockUsers = [
			{ _id: 1, name: "Alice" },
			{ _id: 2, name: "Bob" },
			{ _id: 3, name: "Charlie" },
		];

		mockScores = [
			{ userId: 1, score: 10 },
			{ userId: 1, score: 20 },
			{ userId: 2, score: 15 },
			{ userId: 3, score: 5 },
			{ userId: 3, score: 25 },
		];

		vi.doMock("../users", () => ({ default: mockUsers }));
		vi.doMock("../scores", () => ({ default: mockScores }));

		const module = await import("./returnInitialUserScores");
		returnInitialUserScores = module.returnInitialUserScores;
	});

	it("should return an empty array when there are no users", () => {
		mockUsers.length = 0;
		const result = returnInitialUserScores();
		expect(result).toEqual([]);
	});

	it("should return an empty array when there are no scores", () => {
		mockScores.length = 0;
		const result = returnInitialUserScores();
		expect(result).toEqual([]);
	});

	it("should return the highest score for each user", () => {
		const result = returnInitialUserScores();
		const expected = [
			{ name: "Charlie", score: 25, userId: 3 },
			{ name: "Alice", score: 20, userId: 1 },
			{ name: "Bob", score: 15, userId: 2 },
		];
		expect(result).toEqual(expected);
	});

	it("should handle users with no scores", () => {
		mockScores.length = 0;
		const result = returnInitialUserScores();
		expect(result).toEqual([]);
	});

	it("should handle users that have no scores while others do", () => {
		mockScores.splice(0, mockScores.length, { userId: 1, score: 10 });

		const result = returnInitialUserScores();
		expect(result).toEqual([{ name: "Alice", score: 10, userId: 1 }]);
	});

	it("should handle users with multiple scores correctly", () => {
		mockScores.push({ userId: 1, score: 50 });
		const result = returnInitialUserScores();
		expect(result).toContainEqual({ name: "Alice", score: 50, userId: 1 });
	});

	it("should return results sorted by highest score", () => {
		const result = returnInitialUserScores();
		expect(result.map((r) => r.score)).toEqual([25, 20, 15]);
	});

	it("should handle duplicate user IDs in the users array", () => {
		mockUsers.push({ _id: 1, name: "Alice Duplicate" });

		const result = returnInitialUserScores();
		expect(result).toEqual([
			{ name: "Charlie", score: 25, userId: 3 },
			{ name: "Alice", score: 20, userId: 1 },
			{ name: "Bob", score: 15, userId: 2 },
		]);
	});
});
