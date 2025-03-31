import { CellValue } from "src/types/CellValue";
import { GameCells } from "src/types/GameCells";
import { Coordinates } from "src/types/Sudoku";

export const generateSudoku = (): GameCells => {
  const gameCells = new GameCells();

  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      const rand = Math.random();
      const correct = Math.random();
      const cellValue =
        rand < 0.25
          ? CellValue.fixed(4, correct >= 0.5)
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
