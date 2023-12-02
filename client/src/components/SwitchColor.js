import React from 'react'
import { useThemeColorContext } from '../contexts/ThemeColorContext';
import Switch from "@mui/material/Switch";
import DarkModeIcon from '@mui/icons-material/DarkMode';
function SwitchColor() {
  const  [_,themeColorHandler] = useThemeColorContext();
  return (
    <>
    <DarkModeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
    <Switch
    onChange={() => {
      themeColorHandler();
    }}
    inputProps={{ "aria-label": "controlled" }}
    />
    </>
  )
}

export default SwitchColor