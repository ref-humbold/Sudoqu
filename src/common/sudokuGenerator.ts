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

export const generateGame = (sudoku: CellsMap<SudokuNumber>): CellsMap<CellValue> => {
  const gameCells = new CellsMap<CellValue>();

  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      const rand = Math.random();
      const coordinates = new Coordinates(i, j);
      const solutionNumber = sudoku.get(coordinates);
      const cellValue =
        rand >= 0.5 && solutionNumber ? CellValue.defined(solutionNumber) : CellValue.empty();

      gameCells.set(coordinates, cellValue);
    }
  }

  return gameCells;
};
