import { CellsMap } from "./CellsMap";
import { CellValue, EmptyCellValue, SingleCellValue } from "./CellValue";
import { Coordinates, SudokuNumber } from "./Sudoku";

export class Game {
  private readonly cells: CellsMap<CellValue>;

  constructor(cells?: CellsMap<CellValue>) {
    this.cells = cells ?? new CellsMap<CellValue>(() => new EmptyCellValue());
  }

  public update(coordinates: Coordinates, value: CellValue): Game {
    return new Game(
      this.cells.map((v, c) =>
        v == null ? new EmptyCellValue() : c.equals(coordinates) ? value : v
      )
    );
  }

  public getCellValue(coordinates: Coordinates): CellValue {
    return this.cells.get(coordinates) ?? new EmptyCellValue();
  }

  public getRowNumbers(cellCoordinates: Coordinates): Set<SudokuNumber> {
    const numbers: Set<SudokuNumber> = new Set<SudokuNumber>();

    for (let j = 0; j < 9; ++j) {
      const value = this.cells.get(new Coordinates(cellCoordinates.row, j));

      if (value instanceof SingleCellValue) {
        numbers.add(value.value);
      }
    }

    return numbers;
  }

  public getColumnNumbers(cellCoordinates: Coordinates): Set<SudokuNumber> {
    const numbers: Set<SudokuNumber> = new Set<SudokuNumber>();

    for (let i = 0; i < 9; ++i) {
      const value = this.cells.get(new Coordinates(i, cellCoordinates.col));

      if (value instanceof SingleCellValue) {
        numbers.add(value.value);
      }
    }

    return numbers;
  }

  public getFieldNumbers(cellCoordinates: Coordinates): Set<SudokuNumber> {
    const numbers: Set<SudokuNumber> = new Set<SudokuNumber>();
    const startRow = Math.floor(cellCoordinates.row / 3) * 3;
    const startCol = Math.floor(cellCoordinates.col / 3) * 3;

    for (let i = startRow; i < startRow + 3; ++i) {
      for (let j = startCol; j < startCol + 3; ++j) {
        const value = this.cells.get(new Coordinates(i, j));

        if (value instanceof SingleCellValue) {
          numbers.add(value.value);
        }
      }
    }

    return numbers;
  }
}
