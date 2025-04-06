import { CellType, SudokuNumber } from "./Sudoku";

export class CellValue {
  public readonly type: CellType;
  public readonly values: Set<SudokuNumber>;

  private constructor(type: CellType, values: SudokuNumber[]) {
    this.type = type;
    this.values = new Set(values);
  }

  public static empty(): CellValue {
    return new CellValue(CellType.Empty, []);
  }

  public static defined(value: SudokuNumber): CellValue {
    return new CellValue(CellType.Predefined, [value]);
  }

  public static fixed(value: SudokuNumber): CellValue {
    return new CellValue(CellType.Fixed, [value]);
  }

  public static options(...values: SudokuNumber[]): CellValue {
    return new CellValue(CellType.Options, values);
  }
}
