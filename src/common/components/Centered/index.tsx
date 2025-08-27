import React, { PropsWithChildren } from "react";
import Grid from "@mui/material/Grid";

import { sxCommon } from "src/common/styles";

const Centered: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid sx={sxCommon.fullSize} container justifyContent="center" alignItems="center">
      <Grid>{children}</Grid>
    </Grid>
  );
};

export default Centered;
