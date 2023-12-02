import React, { createContext, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';



const themeColorContext = createContext()



function ThemeColorContext({ children }) {
    const [colorMode,setColorMode] = useState('light')

  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  function themeColorHandler(){
    if(colorMode === 'dark'){
      setColorMode('light')
    }else{
      setColorMode('dark')
    }

  }
  
 
  return (
    <ThemeProvider theme={darkTheme}>

    <themeColorContext.Provider value={[colorMode,themeColorHandler]}>
        {children}
        </themeColorContext.Provider>
    </ThemeProvider>
  )
}


export function useThemeColorContext() {
  return React.useContext(themeColorContext)
}

export default ThemeColorContext