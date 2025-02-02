export type UserScore = {
	name: string;
	score: number;
	userId: number;
};

export type ExcelRow = {
	name: string;
	score: number;
};

export type ExcelDropzoneProps = {
	label: string;
	onSheetDrop: (rows: ExcelRow[]) => void;
};

export type DuplicateUser = UserScore & {
	isScoreHigher: boolean;
	newUserScore: NewUser;
};

export type NewUser = {
	name: string;
	score: number;
};
