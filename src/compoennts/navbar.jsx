import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";

const CustomLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.grey[400],
  padding: theme.spacing(1, 2.5),
  transition: "all .2s",
  borderRadius: 5,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[900],
  },
  "&:active": {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.grey[900],
  },
  "&.active-item": {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[900],
  },
}));

const fetcher = async (url) => await axios.get(url);
const Navbar = () => {
  const location = useLocation();
  console.log(location.search);
  const { data: response, isLoading } = useSWR(
    "/api/content-type-builder/content-types/api::quiz.quiz",
    fetcher
  );
  if (isLoading) return <p>loading..</p>;
  const categories = response.data.data.schema.attributes.category.enum;
  console.log(categories);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ☯️ सच-या-झूठ
            </Typography>
            <CustomLink className={!location.search.includes("category") && "active-item"} to="/">
              All
            </CustomLink>
            {categories.map((category) => (
              <CustomLink
                className={
                  location.search.match(new RegExp(category, "g")) &&
                  "active-item"
                }
                to={`?index&category=${category}`}
                key={category}
              >
                {category}
              </CustomLink>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
