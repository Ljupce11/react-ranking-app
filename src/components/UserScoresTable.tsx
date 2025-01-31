import { UsersDuo } from "@northlight/icons";
import {
	HStack,
	Icon,
	P,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@northlight/ui";
import React from "react";

import type { UserScore } from "../types/types";

type Props = {
	userScores: UserScore[];
};

export const UserScoresTable = ({ userScores }: Props) => {
	return (
		<Table>
			<Thead>
				<Tr>
					<Th>Rank</Th>
					<Th>Name</Th>
					<Th>Score</Th>
				</Tr>
			</Thead>
			<Tbody>
				{userScores.map(({ name, score, userId }, index) => (
					<Tr key={userId}>
						<Td>{index + 1}</Td>
						<Td>
							<HStack>
								<Icon as={UsersDuo} />
								<P>{name}</P>
							</HStack>
						</Td>
						<Td>{score}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};
