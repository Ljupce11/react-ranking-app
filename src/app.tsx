import { Container, H2, Icon } from "@northlight/ui";
import React, { Suspense, useState } from "react";
import { HStack, useDisclosure, useToast } from "@chakra-ui/react";
import { ExecutionDuo } from "@northlight/icons";

import { AddUserScoreSection } from "./components/AddUserScoreSection.js";
// import { ExerciseDescription } from "./components/ExerciseDescription.js";
import { UserScoresTable } from "./components/UserScoresTable.js";
import { TOAST_SETTINGS } from "./constants";
import type { DuplicateUser, ExcelRow, NewUser } from "./types/types";
import { handleAddNewScoreUtil } from "./utils/handleAddNewScoreUtil.js";
import { returnImportedUserScores } from "./utils/returnImportedUserScores.js";
import { returnInitialUserScores } from "./utils/returnInitialUserScores.js";
import { returnUpdatedExistingUserScore } from "./utils/returnUpdatedExistingUserScore.js";

const DuplicateUserModal = React.lazy(
  () => import("./components/DuplicateUserModal"),
);

export default function App() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userScores, setUserScores] = useState(returnInitialUserScores());
  const [duplicateUser, setDuplicateUser] = useState<DuplicateUser | null>(
    null,
  );

  const handleSheetData = (data: ExcelRow[]) => {
    const updatedUserScores = returnImportedUserScores(userScores, data);
    setUserScores(updatedUserScores);
    toast({
      ...TOAST_SETTINGS,
      description: "The excel file has been imported successfully",
    });
  };

  const handleAddNewScore = (newUser: NewUser | null | undefined) => {
    if (!newUser) {
      toast({
        ...TOAST_SETTINGS,
        variant: "error",
        description: "Invalid user data",
      });
      return;
    }

    const { updatedUserScores, duplicateUser, isDuplicate } =
      handleAddNewScoreUtil(newUser, userScores);

    if (isDuplicate) {
      if (duplicateUser) {
        setDuplicateUser(duplicateUser);
        onOpen();
      } else {
        toast({
          ...TOAST_SETTINGS,
          variant: "error",
          description: "A user with the same name and score already exists",
        });
      }
    } else {
      setUserScores(updatedUserScores);
      toast({
        ...TOAST_SETTINGS,
        description: "The user score has been added successfully",
      });
    }
  };

  const overrideExistingUserScore = (duplicateUser: DuplicateUser) => {
    const { newUserScore, name } = duplicateUser;
    const existingUserIndex = userScores.findIndex(
      (user) => user.name === name,
    );
    if (existingUserIndex === -1) {
      toast({
        ...TOAST_SETTINGS,
        variant: "error",
        description: `Cannot update score: User "${name}" not found`,
      });
      return;
    }
    const updatedUserScores = returnUpdatedExistingUserScore(
      newUserScore,
      userScores,
      existingUserIndex,
    );
    setUserScores(updatedUserScores.sort((a, b) => b.score - a.score));
    onClose();
    toast({
      ...TOAST_SETTINGS,
      description: "The user score has been updated successfully",
    });
  };

  return (
    <Container maxW="6xl" padding="4">
      <HStack alignItems={"center"} marginBottom={4} gap={4}>
        <Icon size="lg" variant="success" as={ExecutionDuo} />
        <H2>Mediatool exercise</H2>
      </HStack>
      {/* Commented out so there is more screen space to focus on the exercise features */}
      {/* <ExerciseDescription />  */}
      {isOpen && duplicateUser && (
        <Suspense fallback={null}>
          <DuplicateUserModal
            isOpen={isOpen}
            duplicateUser={duplicateUser}
            onClose={onClose}
            overrideExistingUserScore={overrideExistingUserScore}
          />
        </Suspense>
      )}
      <AddUserScoreSection
        handleSheetData={handleSheetData}
        handleAddNewScore={handleAddNewScore}
      />
      <UserScoresTable userScores={userScores} />
    </Container>
  );
}
