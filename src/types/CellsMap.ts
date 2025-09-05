import { Coordinates } from "./Sudoku";

export class CellsMap<V> {
  private readonly cellsMap: Map<string, V | undefined>;

  constructor(map?: Map<string, V | undefined> | null) {
    if (map == null) {
      this.cellsMap = new Map<string, V | undefined>();

      for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
          this.cellsMap.set(new Coordinates(i, j).toString(), undefined);
        }
      }
    } else {
      this.cellsMap = new Map<string, V | undefined>(map);
    }
  }

  public get(c: Coordinates): V | undefined {
    return this.cellsMap.get(c.toString());
  }

  public set(c: Coordinates, v: V): void {
    this.cellsMap.set(c.toString(), v);
  }

  public copy(): CellsMap<V> {
    return new CellsMap(this.cellsMap);
  }

  public map<T>(func: (v: V) => T): CellsMap<T> {
    return new CellsMap(
      new Map<string, T | undefined>(
        [...this.cellsMap.entries()].map(([key, value]) => [
          key,
          value !== undefined ? func(value) : undefined
        ])
      )
    );
  }
}
