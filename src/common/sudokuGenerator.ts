import { CellValue } from "src/types/CellValue";
import { CellsMap } from "src/types/CellsMap";
import { Coordinates, SudokuNumber } from "src/types/Sudoku";

const sudokuBoard: SudokuNumber[][] = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8]
];

const cutCells = (cellsMap: CellsMap<CellValue>, coordinates: Coordinates): void => {
  [
    new Coordinates(coordinates.row % 5, coordinates.col % 5),
    new Coordinates(8 - (coordinates.row % 5), coordinates.col % 5),
    new Coordinates(coordinates.row % 5, 8 - (coordinates.col % 5)),
    new Coordinates(8 - (coordinates.row % 5), 8 - (coordinates.col % 5))
  ].forEach(c => cellsMap.set(c, CellValue.empty()));
};

export const generateSudoku = (): CellsMap<SudokuNumber> => {
  const sudokuCells = new CellsMap<SudokuNumber>();

  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      sudokuCells.set(new Coordinates(i, j), sudokuBoard[i][j]);
    }
  }

  return sudokuCells;
};

export const generateGame = (sudoku: CellsMap<SudokuNumber>): CellsMap<CellValue> => {
  const gameCells = sudoku.map(v => CellValue.defined(v));

  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      const rand = Math.random();
      const coordinates = new Coordinates(i, j);

      if (rand >= 0.5) {
        cutCells(gameCells, coordinates);
      }
    }
  }

  return gameCells;
};
