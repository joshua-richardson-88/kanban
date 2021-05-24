// import react libraries
import { useEffect, useState } from 'react'

// import modules
import { createMuiTheme } from '@material-ui/core/styles'
import { deepPurple, blue, grey } from '@material-ui/core/colors'

// import project files

const defaultDarkMode = {
  isDarkMode: false,
}

export default function useDarkMode() {
  const [darkState, setDarkState] = useState(null)

  // when this function is rendered, pull data from local storage, or populate
  // default project list
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('DARK_MODE'))
    setDarkState(storedData ? storedData : defaultDarkMode)
  }, [])

  // when the data state changes, save the changed data to local storage
  useEffect(() => {
    localStorage.setItem('DARK_MODE', JSON.stringify(darkState))
  }, [darkState])

  // define a theme
  const theme = createMuiTheme({
    themeName: 'Adaptive Dark and Light',
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*': {
            'scrollbar-width': 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
          },
          '*::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.3)',
            borderRadius: '12px',
          },
        },
      },
      MuiFormLabel: {
        root: {
          color: '#999999',
          '&$focused': {
            color: blue[400],
          },
        },
      },
    },
    palette: {
      type: darkState?.isDarkMode ? 'dark' : 'light',
      primary: {
        light: blue[800],
        main: blue[800],
        dark: blue[500],
      },
      secondary: { main: deepPurple[700] },
    },
    typography: {
      useNextVariants: true,
      fontFamily: [
        'Roboto',
        'Lato',
        '"Helvetica Neue"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      body1: {
        fontSize: '1.25rem',
        fontWeight: 300,
        color: darkState?.isDarkMode ? grey[50] : grey[800],
      },
      subtitle1: {
        fontSize: '1.25rem',
        fontWeight: 500,
        color: darkState?.isDarkMode ? grey[400] : grey[500],
      },
    },
  })

  const toggleDarkMode = () => {
    setDarkState((prevState) => ({ ...prevState, isDarkMode: !prevState.isDarkMode }))
    localStorage.setItem('DARK_MODE', JSON.stringify(darkState))
  }

  return [theme, toggleDarkMode]
}
