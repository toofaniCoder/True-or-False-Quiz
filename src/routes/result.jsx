import { Container, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={2.5}>
        <Typography variant="h4">
          ✅ Correct Answer: {state.correctCount}
        </Typography>
        <Typography variant="h4">
          ❎ Incorrect Answer: {state.incorrectCount}{" "}
        </Typography>
        <Typography variant="h4">
          ❓ Unanswer: {state.unansweredCount}
        </Typography>
      </Stack>
    </Container>
  );
};

export default Result;
