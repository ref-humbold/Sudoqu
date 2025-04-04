import { CellValue } from "src/types/CellValue";
import { CellsMap } from "src/types/CellsMap";
import { Coordinates, SudokuNumber } from "src/types/Sudoku";

export const generateSudoku = (): CellsMap<SudokuNumber> => {
  const sudokuCells = new CellsMap<SudokuNumber>();

  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      sudokuCells.set(new Coordinates(i, j), (i + 1) as SudokuNumber);
    }
  }

  return sudokuCells;
};

export const generateGame = (): CellsMap<CellValue> => {
  const gameCells = new CellsMap<CellValue>();

  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      const rand = Math.random();
      const cellValue =
        rand < 0.25
          ? CellValue.fixed(4)
          : rand < 0.5
          ? CellValue.defined(6)
          : rand < 0.75
          ? CellValue.options(1, 3, 5, 7, 9)
          : CellValue.empty();

      gameCells.set(new Coordinates(i, j), cellValue);
    }
  }

  return gameCells;
};
