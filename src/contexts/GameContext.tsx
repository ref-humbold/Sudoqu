import React, { createContext, useContext, useEffect, useState } from "react";
import { generateGame } from "src/common/sudokuGenerator";

import {
  CellValue,
  UserCellValue,
  FixedCellValue,
  OptionsCellValue,
  SingleCellValue,
  EmptyCellValue
} from "src/types/CellValue";
import { Game } from "src/types/Game";
import { Coordinates, SudokuNumber } from "src/types/Sudoku";
import { useSudoku } from "./SudokuContext";

export type GameContextType = {
  getCellValue: (c: Coordinates) => CellValue;
  setCellValue: (c: Coordinates, v: UserCellValue) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { sudokuCells } = useSudoku();

  const [game, setGame] = useState<Game>(new Game());

  useEffect(() => {
    setGame(generateGame(sudokuCells));
  }, [sudokuCells]);

  const onUpdateToFixedValue = (
    game: Game,
    c: Coordinates,
    v: FixedCellValue
  ): Map<Coordinates, CellValue> => {
    const numbers = new Map<Coordinates, CellValue>([
      ...game.getRowValues(c).entries(),
      ...game.getColumnNumbers(c).entries(),
      ...game.getFieldNumbers(c).entries()
    ]);
    const sameSingleNumbers = [...numbers.entries()]
      .filter((e): e is [Coordinates, SingleCellValue] => e[1] instanceof SingleCellValue)
      .filter(e => e[1].value === v.value);
    const updated = new Map<Coordinates, CellValue>();

    for (const [coord, cellValue] of sameSingleNumbers) {
      if (cellValue instanceof FixedCellValue) {
        cellValue.isCorrect = false;
        updated.set(coord, cellValue);
      }
    }

    v.isCorrect = sameSingleNumbers.length === 0;
    updated.set(c, v);

    return updated;
  };

  const onUpdateToOptionsValue = (
    game: Game,
    c: Coordinates,
    v: OptionsCellValue
  ): Map<Coordinates, CellValue> => {
    const numbers = new Map<Coordinates, CellValue>([
      ...game.getRowValues(c).entries(),
      ...game.getColumnNumbers(c).entries(),
      ...game.getFieldNumbers(c).entries()
    ]);
    const existingSingleNumbers = new Set<SudokuNumber>(
      [...numbers.values()].filter(v => v instanceof SingleCellValue).map(v => v.value)
    );

    v.setErrorValues(existingSingleNumbers);
    return new Map<Coordinates, CellValue>([[c, v]]);
  };

  const onUpdateToEmptyValue = (game: Game, c: Coordinates): Map<Coordinates, CellValue> => {
    const currentValue = game.getCellValue(c);

    if (currentValue instanceof FixedCellValue) {
      const relatedValuesMaps = [
        game.getRowValues(c),
        game.getColumnNumbers(c),
        game.getFieldNumbers(c)
      ];

      for (const valuesMaps of relatedValuesMaps) {
        const singleCells = [...valuesMaps.entries()]
          .filter(e => !e[0].equals(c))
          .filter(
            (e): e is [Coordinates, SingleCellValue] =>
              e[1] instanceof SingleCellValue && e[1].contains(currentValue.value)
          );

        if (singleCells.length === 1 && singleCells[0][1] instanceof FixedCellValue) {
          singleCells[0][1].isCorrect = true;
        }
      }
    }

    return new Map<Coordinates, CellValue>([[c, new EmptyCellValue()]]);
  };

  const getCellValue = (c: Coordinates) => game.getCellValue(c);

  const setCellValue = (c: Coordinates, v: UserCellValue) =>
    setGame(current => {
      const updates =
        v instanceof FixedCellValue
          ? onUpdateToFixedValue(current, c, v)
          : v instanceof OptionsCellValue
            ? onUpdateToOptionsValue(current, c, v)
            : onUpdateToEmptyValue(current, c);

      return game.update(updates);
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
