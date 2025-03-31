import { CellValue } from "./CellValue";
import { Coordinates } from "./Sudoku";

export class GameCells {
  private readonly cellsMap: Map<string, CellValue>;

  constructor() {
    this.cellsMap = new Map<string, CellValue>();

    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        this.cellsMap.set(new Coordinates(i, j).toString(), CellValue.empty());
      }
    }
  }

  public get(c: Coordinates): CellValue {
    return this.cellsMap.get(c.toString()) ?? CellValue.empty();
  }

  public set(c: Coordinates, v: CellValue): void {
    this.cellsMap.set(c.toString(), v);
  }
}
