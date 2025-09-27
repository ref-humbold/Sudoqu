import { CellsMap } from "./CellsMap";
import { CellValue, EmptyCellValue } from "./CellValue";
import { Coordinates } from "./Sudoku";

export class Game {
  private readonly cells: CellsMap<CellValue>;

  constructor(cells?: CellsMap<CellValue>) {
    this.cells = cells ?? new CellsMap<CellValue>(() => new EmptyCellValue());
  }

  public update(entries: Map<Coordinates, CellValue>): Game {
    const entriesArray = [...entries.entries()];
    const newCells = this.cells.map((v, c) =>
      v == null ? new EmptyCellValue() : (entriesArray.find(e => e[0].equals(c))?.[1] ?? v)
    );

    return new Game(newCells);
  }

  public getCellValue(coordinates: Coordinates): CellValue {
    return this.cells.get(coordinates) ?? new EmptyCellValue();
  }

  public getRowValues(cellCoordinates: Coordinates): Map<Coordinates, CellValue> {
    const rowValues = new Map<Coordinates, CellValue>();

    for (let j = 0; j < 9; ++j) {
      const coordinates = new Coordinates(cellCoordinates.row, j);
      const value = this.cells.get(coordinates);

      rowValues.set(coordinates, value ?? new EmptyCellValue());
    }

    return rowValues;
  }

  public getColumnNumbers(cellCoordinates: Coordinates): Map<Coordinates, CellValue> {
    const columnValues = new Map<Coordinates, CellValue>();

    for (let i = 0; i < 9; ++i) {
      const coordinates = new Coordinates(i, cellCoordinates.col);
      const value = this.cells.get(coordinates);

      columnValues.set(coordinates, value ?? new EmptyCellValue());
    }

    return columnValues;
  }

  public getFieldNumbers(cellCoordinates: Coordinates): Map<Coordinates, CellValue> {
    const fieldValues = new Map<Coordinates, CellValue>();
    const startRow = Math.floor(cellCoordinates.row / 3) * 3;
    const startCol = Math.floor(cellCoordinates.col / 3) * 3;

    for (let i = startRow; i < startRow + 3; ++i) {
      for (let j = startCol; j < startCol + 3; ++j) {
        const coordinates = new Coordinates(i, j);
        const value = this.cells.get(coordinates);

        fieldValues.set(coordinates, value ?? new EmptyCellValue());
      }
    }

    return fieldValues;
  }
}
