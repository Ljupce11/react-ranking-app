import { useDisclosure } from "@chakra-ui/react";
import { UsersDuo } from "@northlight/icons";
import {
  Button,
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
import React, { Fragment, Suspense, useState } from "react";

import type { ActiveUser, UserScore } from "../types/types";
const AllScoresModal = React.lazy(() => import("./AllScoresModal"));

type Props = {
  userScores: UserScore[];
};

export const UserScoresTable = ({ userScores }: Props) => {
  const { isOpen, onOpen } = useDisclosure();
  const [activeUser, setActiveUser] = useState<ActiveUser | null>(null);

  const handleViewAllScores = (name: string, allScores: number[]) => {
    onOpen();
    setActiveUser({ name, allScores });
  };

  return (
    <Fragment>
      {isOpen && activeUser && (
        <Suspense fallback={null}>
          <AllScoresModal
            isOpen={isOpen}
            activeUser={activeUser}
            onClose={() => setActiveUser(null)}
          />
        </Suspense>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Score</Th>
            <Th width={"200px"} />
          </Tr>
        </Thead>
        <Tbody>
          {userScores.map(({ name, score, userId, allScores }, index) => (
            <Tr key={userId}>
              <Td>{index + 1}</Td>
              <Td>
                <HStack>
                  <Icon as={UsersDuo} />
                  <P>{name}</P>
                </HStack>
              </Td>
              <Td>{score}</Td>
              <Td>
                <Button onClick={() => handleViewAllScores(name, allScores)}>
                  View all scores
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Fragment>
  );
};
