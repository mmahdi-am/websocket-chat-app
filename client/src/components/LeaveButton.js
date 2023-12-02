import React from 'react'
import Button from "@mui/material/Button";
import { Link  } from "react-router-dom";
function LeaveButton() {
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
    <Button
      sx={{ margin: "2rem 0" }}
      fullWidth
      variant="contained"
      color="warning"
    >
      Leave Room
    </Button>
  </Link>
  )
}

export default LeaveButton