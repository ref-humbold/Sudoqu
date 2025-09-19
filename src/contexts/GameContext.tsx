import React, { createContext, useContext, useEffect, useState } from "react";
import { generateGame } from "src/common/sudokuGenerator";

import { CellValue, FixedCellValue, OptionsCellValue } from "src/types/CellValue";
import { Game } from "src/types/Game";
import { Coordinates, SudokuNumber } from "src/types/Sudoku";
import { useSudoku } from "./SudokuContext";

export type GameContextType = {
  getCellValue: (c: Coordinates) => CellValue;
  setCellValue: (c: Coordinates, v: CellValue) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { sudokuCells } = useSudoku();

  const [game, setGame] = useState<Game>(new Game());

  useEffect(() => {
    setGame(generateGame(sudokuCells));
  }, [sudokuCells]);

  const getCellValue = (c: Coordinates) => game.getCellValue(c);

  const setCellValue = (c: Coordinates, v: CellValue) =>
    setGame(current => {
      if (v instanceof FixedCellValue || v instanceof OptionsCellValue) {
        const invalidNumbers = new Set<SudokuNumber>([
          ...current.getRowNumbers(c),
          ...current.getColumnNumbers(c),
          ...current.getFieldNumbers(c)
        ]);

        if (v instanceof FixedCellValue) {
          v.isCorrect = !invalidNumbers.has(v.value);
        } else {
          v.setErrorValues(invalidNumbers);
        }
      }

      return current.update(c, v);
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
