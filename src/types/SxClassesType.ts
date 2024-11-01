import { Theme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";

type SxClass = SystemStyleObject<Theme>;
type SxThemedClass = (theme: Theme) => SxClass;

export type SxClassesType = Record<string, SxClass | SxThemedClass>;
