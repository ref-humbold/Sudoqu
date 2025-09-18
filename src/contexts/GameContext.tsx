import React, { createContext, useContext, useEffect, useState } from "react";
import { generateGame } from "src/common/sudokuGenerator";

import { CellValue, EmptyCellValue, FixedCellValue, OptionsCellValue } from "src/types/CellValue";
import { CellsMap } from "src/types/CellsMap";
import { Coordinates } from "src/types/Sudoku";
import { useSudoku } from "./SudokuContext";

export type GameContextType = {
  getCellValue: (c: Coordinates) => CellValue;
  setCellValue: (c: Coordinates, v: CellValue) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { sudokuCells } = useSudoku();

  const [playerCells, setPlayerCells] = useState<CellsMap<CellValue>>(new CellsMap<CellValue>());

  useEffect(() => {
    setPlayerCells(generateGame(sudokuCells));
  }, [sudokuCells]);

  const getCellValue = (c: Coordinates) => playerCells.get(c) ?? new EmptyCellValue();

  const setCellValue = (c: Coordinates, v: CellValue) =>
    setPlayerCells(current => {
      const newMap = current.copy();
      const expectedNumber = sudokuCells.get(c);

      if (expectedNumber != null) {
        if (v instanceof FixedCellValue) {
          v.isCorrect = expectedNumber === v.value;
        } else if (v instanceof OptionsCellValue) {
          v.setErrorValues(new Set([expectedNumber]));
        }
      }

      newMap.set(c, v);
      return newMap;
    });

  return (
    <GameContext.Provider
      value={{
        getCellValue,
        setCellValue
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
