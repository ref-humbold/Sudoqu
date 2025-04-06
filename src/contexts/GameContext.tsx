import React, { createContext, useContext, useEffect, useState } from "react";
import { generateGame, generateSudoku } from "src/common/sudokuGenerator";

import { CellValue } from "src/types/CellValue";
import { CellsMap } from "src/types/CellsMap";
import { Coordinates, SudokuNumber } from "src/types/Sudoku";

export type GameContextType = {
  getCellValue: (c: Coordinates) => CellValue;
  setCellValue: (c: Coordinates, v: CellValue) => void;
  checkCellCorrect: (c: Coordinates, number: SudokuNumber) => boolean;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [solutionCells, setSolutionCells] = useState<CellsMap<SudokuNumber>>(
    new CellsMap<SudokuNumber>()
  );
  const [playerCells, setPlayerCells] = useState<CellsMap<CellValue>>(new CellsMap<CellValue>());

  useEffect(() => {
    const sudoku = generateSudoku();

    setSolutionCells(sudoku);
    setPlayerCells(generateGame(sudoku));
  }, [setPlayerCells]);

  const getCellValue = (c: Coordinates) => playerCells.get(c) ?? CellValue.empty();

  const setCellValue = (c: Coordinates, v: CellValue) => playerCells.set(c, v);

  const checkCellCorrect = (c: Coordinates, number: SudokuNumber) =>
    solutionCells.get(c) === number;

  return (
    <GameContext.Provider
      value={{
        getCellValue,
        setCellValue,
        checkCellCorrect
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const ctx = useContext(GameContext);

  if (ctx == null) {
    throw new Error("Component is outside of GameContext");
  }

  return ctx;
};
