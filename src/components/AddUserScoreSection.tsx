import { PlusSquareDuo } from "@northlight/icons";
import {
  Button,
  Form,
  HStack,
  Icon,
  NumberInputField,
  TextField,
  VStack,
} from "@northlight/ui";
import React from "react";

import { ExcelDropzone } from "../excel-dropzone";
import type { ExcelRow } from "../types/types";

type Props = {
  handleSheetData: (data: ExcelRow[]) => void;
  handleAddNewScore: (newUser: { name: string; score: number }) => void;
};

export const AddUserScoreSection = ({
  handleSheetData,
  handleAddNewScore,
}: Props) => {
  return (
    <HStack spacing={10} align="flex-start" marginBottom={5}>
      <ExcelDropzone
        onSheetDrop={handleSheetData}
        label="Import excel file here"
      />
      <Form initialValues={{ name: "", score: 0 }} onSubmit={handleAddNewScore}>
        <VStack alignItems="flex-start">
          <TextField
            name="name"
            label="Name"
            isRequired={true}
            validate={{
              minLength: {
                value: 2,
                message: "Please enter a name with atleast 2 characters",
              },
            }}
          />
          <NumberInputField
            name="score"
            label="Score"
            isRequired={true}
            min={0}
          />
          <Button type="submit">
            <Icon as={PlusSquareDuo} marginEnd={2} />
            Add score
          </Button>
        </VStack>
      </Form>
    </HStack>
  );
};
