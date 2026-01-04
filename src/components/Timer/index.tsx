import React, { useEffect } from "react";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import Centered from "src/common/components/Centered";
import { sxClasses } from "./styles";

type TimerProps = {
  stopped?: boolean;
};

const Timer: React.FC<TimerProps> = ({ stopped }) => {
  const [valueSeconds, setValueSeconds] = React.useState(0);

  useEffect(() => {
    if (stopped) {
      return;
    }

    const interval = setInterval(() => {
      setValueSeconds(current => current + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stopped]);

  const display = (value: number) => value.toString().padStart(2, "0");

  const getString = (timerValue: number) => {
    const minutes = Math.floor((timerValue % 3600) / 60);
    const seconds = timerValue % 60;
    return [minutes, seconds].map(display).join(":");
  };

  return (
    <Centered>
      <Card sx={sxClasses.card}>
        <Typography variant="h2" align="center" color="white">
          {getString(valueSeconds)}
        </Typography>
      </Card>
    </Centered>
  );
};

export default Timer;
