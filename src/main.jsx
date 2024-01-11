import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:1337";
// create theme
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

// import pages or routes
import Home from "./routes";
import Layout from "./routes/layout";
import Quiz from "./routes/quiz";
import Result from "./routes/result";

// craete routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "quiz/:id",
    element: <Quiz />,
    action: async ({ params, request }) => {
      const data = Object.fromEntries(await request.formData());

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      const response = axios.post(
        `/api/quizzes/check-answer/${params.id}`,
        formData
      );
      return response;
    },
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles />
    <RouterProvider router={router} />
  </ThemeProvider>
);
