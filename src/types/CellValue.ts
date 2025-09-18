import { ChosenCellType, SudokuNumber } from "./Sudoku";

export interface CellValue {
  allValues(): SudokuNumber[];
  contains(number: SudokuNumber): boolean;
  matches(type: ChosenCellType): boolean;
}

export abstract class SingleCellValue implements CellValue {
  constructor(public readonly value: SudokuNumber) {}

  public allValues(): SudokuNumber[] {
    return [this.value];
  }

  public contains(number: SudokuNumber): boolean {
    return this.value === number;
  }

  public abstract matches(type: ChosenCellType): boolean;
  public abstract getTextColour(): string;
}

export class EmptyCellValue implements CellValue {
  constructor() {}

  public allValues(): SudokuNumber[] {
    return [];
  }

  public contains(): boolean {
    return false;
  }

  public matches(): boolean {
    return false;
  }
}

export class DefinedCellValue extends SingleCellValue {
  public getTextColour(): string {
    return "textSecondary";
  }

  public matches(): boolean {
    return false;
  }
}

export class FixedCellValue extends SingleCellValue {
  public isCorrect = true;

  public getTextColour(): string {
    return this.isCorrect ? "primary" : "error";
  }

  public matches(type: ChosenCellType): boolean {
    return type === ChosenCellType.Fixed;
  }
}

export class OptionsCellValue implements CellValue {
  private readonly values: Map<SudokuNumber, boolean>;

  constructor(...values: SudokuNumber[]) {
    this.values = new Map<SudokuNumber, boolean>(values.map(v => [v, true] as const));
  }

  public contains(number: SudokuNumber): boolean {
    return this.values.has(number);
  }

  public allValues(): SudokuNumber[] {
    return [...this.values.keys()];
  }

  public matches(type: ChosenCellType): boolean {
    return type === ChosenCellType.Options;
  }

  public getTextColour(number: SudokuNumber): string {
    return this.values.get(number) === false ? "error" : "secondary";
  }

  public setErrorValues(errorNumbers: Set<SudokuNumber>): void {
    [...this.values.keys()].forEach(v => this.values.set(v, !errorNumbers.has(v)));
  }
}
