import { Coordinates } from "./Sudoku";

export class CellsMap<V> {
  private readonly cellsMap: Map<string, V | undefined>;

  constructor() {
    this.cellsMap = new Map<string, V>();

    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        this.cellsMap.set(new Coordinates(i, j).toString(), undefined);
      }
    }
  }

  public get(c: Coordinates): V | undefined {
    return this.cellsMap.get(c.toString());
  }

  public set(c: Coordinates, v: V): void {
    this.cellsMap.set(c.toString(), v);
  }
}
