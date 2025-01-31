import scores from "../scores";
import type { UserScore } from "../types/types";
import users from "../users";

export const returnInitialUserScores = () => {
	const initialData: UserScore[] = [];
	const map = new Map();
	const uniqueUsers = users.filter(
		(item) => !map.has(item._id) && map.set(item._id, true),
	);

	uniqueUsers.forEach((user, _i) => {
		const userScores = scores.filter((score) => score.userId === user._id);
		if (userScores.length === 0) return;
		const maxValueObject = userScores.reduce((maxObj, currentObj) => {
			return currentObj.score > maxObj.score ? currentObj : maxObj;
		}, userScores[0]);
		initialData.push({ ...maxValueObject, name: user.name });
	});

	return initialData.sort((a, b) => b.score - a.score);
};
