import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../compoennts/navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
