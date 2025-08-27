import React, { useState } from "react";

import Centered from "src/common/components/Centered";
import GridThree from "src/common/components/GridThree";
import { cellStyle, fieldStyle } from "src/common/styles";
import { useGame } from "src/contexts/GameContext";
import { Coordinates } from "src/types/Sudoku";
import Cell from "./components/Cell";
import { sxClasses } from "./styles";

const Game: React.FC = () => {
  const [clickedCell, setClickedCell] = useState<Coordinates | undefined>(undefined);
  const { getCellValue, setCellValue } = useGame();

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

              return (
                <Cell
                  value={getCellValue(coordinates)}
                  clicked={coordinates.equals(clickedCell)}
                  setClicked={() => setClickedCell(coordinates)}
                  updateValue={value => setCellValue(coordinates, value)}
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
