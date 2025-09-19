import { Coordinates } from "./Sudoku";

export class CellsMap<V> {
  private readonly cellsMap: Map<string, V>;

  constructor(generator: (c: Coordinates) => V) {
    this.cellsMap = new Map<string, V>();

    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        const coordinates = new Coordinates(i, j);
        this.cellsMap.set(new Coordinates(i, j).toString(), generator(coordinates));
      }
    }
  }

  public get(c: Coordinates): V | undefined {
    return this.cellsMap.get(c.toString());
  }

  public set(c: Coordinates, v: V): void {
    this.cellsMap.set(c.toString(), v);
  }

  public map<T>(func: (v: V | undefined, c: Coordinates) => T): CellsMap<T> {
    return new CellsMap(c => {
      const value = this.get(c);
      return func(value, c);
    });
  }
}
