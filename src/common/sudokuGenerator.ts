import { CellValue, DefinedCellValue, EmptyCellValue } from "src/types/CellValue";
import { CellsMap } from "src/types/CellsMap";
import { Game } from "src/types/Game";
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
  ].forEach(c => cellsMap.set(c, new EmptyCellValue()));
};

export const generateSudoku = (): CellsMap<SudokuNumber> =>
  new CellsMap<SudokuNumber>(c => sudokuBoard[c.row][c.col]);

export const generateGame = (sudoku: CellsMap<SudokuNumber>): Game => {
  const gameCells = sudoku.map(v => (v == null ? new EmptyCellValue() : new DefinedCellValue(v)));

  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      const rand = Math.random();
      const coordinates = new Coordinates(i, j);

      if (rand >= 0.5) {
        cutCells(gameCells, coordinates);
      }
    }
  }

  return new Game(gameCells);
};
