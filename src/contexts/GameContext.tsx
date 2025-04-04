import React, { createContext, useContext, useEffect, useState } from "react";
import { generateGame } from "src/common/sudokuGenerator";

import { CellValue } from "src/types/CellValue";
import { CellsMap } from "src/types/CellsMap";
import { Coordinates } from "src/types/Sudoku";

export type GameContextType = {
  getCellValue: (c: Coordinates) => CellValue;
  setCellValue: (c: Coordinates, v: CellValue) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [gameCells, setGameCells] = useState<CellsMap<CellValue>>(new CellsMap<CellValue>());

  useEffect(() => {
    setGameCells(generateGame());
  }, [setGameCells]);

  const getCellValue = (c: Coordinates) => gameCells.get(c) ?? CellValue.empty();

  const setCellValue = (c: Coordinates, v: CellValue) => gameCells.set(c, v);

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
