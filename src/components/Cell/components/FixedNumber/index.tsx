import React from "react";
import Typography from "@mui/material/Typography";

import { sxCommon } from "src/common/styles";
import Centered from "src/common/components/Centered";
import { SingleCellValue } from "src/types/CellValue";
import { sxClasses } from "./styles";

type FixedNumberProps = {
  value: SingleCellValue;
};

const FixedNumber: React.FC<FixedNumberProps> = ({ value }) => {
  return (
    <Centered>
      <Typography
        sx={[sxCommon.fullSize, sxClasses.value]}
        variant="button"
        color={value.getTextColour()}
      >
        {value.value}
      </Typography>
    </Centered>
  );
};

export default FixedNumber;
