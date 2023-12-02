import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";



function AppbarContainer({ children }) {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "2rem" }}>
      <AppBar position="static" color="primary">
        <Toolbar>{children}</Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppbarContainer;
