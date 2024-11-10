import React, { PropsWithChildren } from "react";
import Grid2 from "@mui/material/Grid2";

import { sxCommon } from "src/common/styles";

const Centered: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid2 sx={sxCommon.fullSize} container justifyContent="center" alignItems="center">
      <Grid2>{children}</Grid2>
    </Grid2>
  );
};

export default Centered;
