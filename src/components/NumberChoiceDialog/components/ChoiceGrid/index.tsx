import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import GridThree from "src/common/components/GridThree";
import { CellValue } from "src/types/CellValue";
import { CellType, ChosenCellType, SudokuNumber } from "src/types/Sudoku";
import { choiceButtonMetadata, fixedButtonMetadata } from "./utils";

type ChoiceGridProps = {
  type: ChosenCellType;
  currentValue: CellValue;
  onClick: (type: ChosenCellType, number: SudokuNumber) => void;
};

const ChoiceGrid: React.FC<ChoiceGridProps> = ({ type, currentValue, onClick }) => {
  const numbersGrid: SudokuNumber[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const metadataFunction = type === CellType.Fixed ? fixedButtonMetadata : choiceButtonMetadata;

  const renderNumber = (num: SudokuNumber) => {
    const buttonMetadata = metadataFunction(
      currentValue.type === type && currentValue.values.has(num)
    );

    return (
      <Button
        variant={buttonMetadata.variant}
        size={buttonMetadata.size}
        color={buttonMetadata.color}
        onClick={() => onClick(type, num)}
      >
        <Typography variant={buttonMetadata.text}>{num}</Typography>
      </Button>
    );
  };

  return (
    <GridThree
      renderItem={coords => renderNumber(numbersGrid[coords.row][coords.col])}
      spacing={1}
    ></GridThree>
  );
};

export default ChoiceGrid;
