export type SudokuNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class Coordinates {
  constructor(public readonly row: number, public readonly col: number) {}

  public equals(other: Coordinates | null | undefined): boolean {
    return other != null && this.row === other.row && this.col === other.col;
  }
}

export const enum CellType {
  Empty = "Empty",
  Fixed = "Fixed",
  Options = "Options"
}
