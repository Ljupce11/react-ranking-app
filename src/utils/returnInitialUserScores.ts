import scores from "../scores";
import type { UserScore } from "../types/types";
import users from "../users";

export const returnInitialUserScores = () => {
	const initialData: UserScore[] = [];
	const userSet = new Set();
	const uniqueUsers = users.filter(
		(item) => !userSet.has(item._id) && userSet.add(item._id),
	);

	uniqueUsers.forEach((user, _i) => {
		const userScores = scores.filter((score) => score.userId === user._id);
		if (userScores.length === 0) return;
		const sortedScores = userScores
			.sort((a, b) => a.score - b.score)
			.map(({ score }) => score);
		const uniqueScores = Array.from(new Set(sortedScores));
		const highestScore = uniqueScores[uniqueScores.length - 1];
		initialData.push({
			name: user.name,
			userId: user._id,
			score: highestScore,
			allScores: uniqueScores,
		});
	});

	return initialData.sort((a, b) => b.score - a.score);
};
