/* eslint-disable react/prop-types */
import {
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";

const Question = (props) => {
  const [value, setValue] = useState(null);
  const { item, index, userAnswerSheet, setUserAnswerSheet } = props;

  useEffect(() => {
    if (item.id in userAnswerSheet) {
      setValue(userAnswerSheet[item.id]);
    }
  }, []);
  useEffect(() => {
    if (value != null) {
      setUserAnswerSheet({ ...userAnswerSheet, [item.id]: value });
    }
  }, [value]);
  return (
    <Stack direction="row">
      <Typography variant="h6" sx={{ flexBasis: "70%" }}>
        (Q.{index + 1}) {item.question}
      </Typography>
      <ToggleButtonGroup
        sx={{
          flexBasis: "30%",
          display: "flex",
          justifyContent: "flex-end",
          alignSelf: "flex-start",
        }}
        value={value}
        exclusive
        onChange={(e, newValue) => newValue != null && setValue(newValue)}
      >
        <ToggleButton value={1}>✔️ TRUE</ToggleButton>
        <ToggleButton value={0}>❌ FALSE</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default Question;
