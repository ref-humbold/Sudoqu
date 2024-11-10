import { Theme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";

export type SxValue = SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);
export type SxClasses = Record<string, SxValue>;
export type SxFunction<Args extends unknown[]> = (...args: Args) => SxClasses;
