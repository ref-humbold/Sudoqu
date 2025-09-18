import React, { createContext, useContext, useEffect, useState } from "react";
import { generateSudoku as generateSudoku } from "src/common/sudokuGenerator";

import { CellsMap } from "src/types/CellsMap";
import { SudokuNumber } from "src/types/Sudoku";

export type SudokuContextType = {
  sudokuCells: CellsMap<SudokuNumber>;
};

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export const SudokuContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sudokuCells, setSudokuCells] = useState<CellsMap<SudokuNumber>>(
    new CellsMap<SudokuNumber>()
  );

  useEffect(() => {
    setSudokuCells(generateSudoku());
  }, []);

  return <SudokuContext.Provider value={{ sudokuCells }}>{children}</SudokuContext.Provider>;
};

export const useSudoku = (): SudokuContextType => {
  const ctx = useContext(SudokuContext);

  if (ctx == null) {
    throw new Error("Component is outside of SudokuContext");
  }

  return ctx;
};
