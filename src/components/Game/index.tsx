import React from "react";

import Centered from "src/common/components/Centered";
import GridThree from "src/common/components/GridThree";
import { cellStyle, fieldStyle } from "src/common/styles";
import { CellType } from "src/types/Sudoku";
import Cell from "./components/Cell";
import { sxClasses } from "./styles";

const Game: React.FC = () => {
  return (
    <Centered>
      <GridThree
        sx={sxClasses.outerGrid}
        spacing={fieldStyle.spacing}
        renderItem={() => (
          <GridThree
            sx={sxClasses.innerGrid}
            spacing={cellStyle.spacing}
            renderItem={() => (
              <Cell cellType={Math.random() > 0.5 ? CellType.Fixed : CellType.Options} />
            )}
          />
        )}
      />
    </Centered>
  );
};

export default Game;
