import { palette } from "@northlight/tokens";
import { Box, Center, Icon, VStack } from "@northlight/ui";
import React from "react";
import Dropzone from "react-dropzone";
import { read, utils } from "xlsx";
import { DataUploadDuo } from "@northlight/icons";

import type { ExcelDropzoneProps } from "./types/types";

export function ExcelDropzone(props: ExcelDropzoneProps) {
  const { label, onSheetDrop } = props;

  const handleFile = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new window.FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      onSheetDrop(utils.sheet_to_json(workbook.Sheets[sheetName]));
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Dropzone multiple={false} onDrop={handleFile}>
      {({ getRootProps }) => (
        <Box
          {...getRootProps()}
          border="2px dashed"
          borderColor={palette.gray["200"]}
          minW="20%"
          height={"200px"}
          backgroundColor={palette.gray["50"]}
          cursor={"pointer"}
        >
          <VStack gap={2} justifyContent={"center"} height={"100%"}>
            <Icon size="lg" as={DataUploadDuo} />
            <Center>{label}</Center>
          </VStack>
        </Box>
      )}
    </Dropzone>
  );
}
