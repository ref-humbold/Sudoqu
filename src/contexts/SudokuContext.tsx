import React, { createContext, useContext, useEffect, useState } from "react";
import { generateSudoku } from "src/common/sudokuGenerator";

import { CellsMap } from "src/types/CellsMap";
import { Coordinates, SudokuNumber } from "src/types/Sudoku";

export type SudokuContextType = {
  checkCellCorrect: (c: Coordinates, number: SudokuNumber) => boolean;
};

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export const SudokuContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sudokuCells, setSudokuCells] = useState<CellsMap<SudokuNumber>>(
    new CellsMap<SudokuNumber>()
  );

  useEffect(() => {
    setSudokuCells(generateSudoku());
  }, [setSudokuCells]);

  const checkCellCorrect = (c: Coordinates, number: SudokuNumber) => sudokuCells.get(c) === number;

  return (
    <SudokuContext.Provider
      value={{
        checkCellCorrect
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudoku = (): SudokuContextType => {
  const ctx = useContext(SudokuContext);

  if (ctx == null) {
    throw new Error("Component is outside of SudokuContext");
  }

  return ctx;
};
