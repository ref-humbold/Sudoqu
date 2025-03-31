import { CellType, NumberDisplay, SudokuNumber, UserNumberDisplay } from "./Sudoku";

export class CellValue {
  public readonly type: CellType;
  public readonly values: Set<SudokuNumber>;
  public readonly display: UserNumberDisplay;

  private constructor(type: CellType, values: SudokuNumber[], display?: UserNumberDisplay) {
    this.type = type;
    this.values = new Set(values);
    this.display = display ?? NumberDisplay.Correct;
  }

  public static empty(): CellValue {
    return new CellValue(CellType.Empty, []);
  }

  public static defined(value: SudokuNumber): CellValue {
    return new CellValue(CellType.Predefined, [value]);
  }

  public static fixed(value: SudokuNumber, isCorrect: boolean): CellValue {
    return new CellValue(
      CellType.Fixed,
      [value],
      isCorrect ? NumberDisplay.Correct : NumberDisplay.Wrong
    );
  }

  public static options(...values: SudokuNumber[]): CellValue {
    return new CellValue(CellType.Options, values);
  }
}
