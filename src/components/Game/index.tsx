import React, { useState } from "react";

import Centered from "src/common/components/Centered";
import GridThree from "src/common/components/GridThree";
import { cellStyle, fieldStyle } from "src/common/styles";
import { CellType, Coordinates } from "src/types/Sudoku";
import Cell from "./components/Cell";
import { sxClasses } from "./styles";

const Game: React.FC = () => {
  const [clickedCell, setClickedCell] = useState<Coordinates | undefined>(undefined);

  return (
    <Centered>
      <GridThree
        sx={sxClasses.outerGrid}
        spacing={fieldStyle.spacing}
        renderItem={fieldCoords => (
          <GridThree
            sx={sxClasses.innerGrid}
            spacing={cellStyle.spacing}
            renderItem={cellCoords => {
              const coordinates = new Coordinates(
                3 * fieldCoords.row + cellCoords.row,
                3 * fieldCoords.col + cellCoords.col
              );

              const rand = Math.random();

              return (
                <Cell
                  cellType={
                    rand < 0.3 ? CellType.Fixed : rand >= 0.7 ? CellType.Options : CellType.Empty
                  }
                  clicked={coordinates.equals(clickedCell)}
                  setClicked={() => setClickedCell(coordinates)}
                />
              );
            }}
          />
        )}
      />
    </Centered>
  );
};

export default Game;
