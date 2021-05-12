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

  // // when this function is rendered, pull data from local storage, or populate
  // // default project list
  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem('DARK_MODE'))
  //   setDarkState(storedData ? storedData : defaultDarkMode)
  // }, [])

  // // when the data state changes, save the changed data to local storage
  // useEffect(() => {
  //   localStorage.setItem('DARK_MODE', JSON.stringify(darkState))
  // }, [darkState])

  // define a theme
  const theme = createMuiTheme({
    themeName: 'Adaptive Dark and Light',
    overrides: {
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
      type: 'dark',
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
        color: darkState ? grey[50] : grey[800],
      },
      subtitle1: {
        fontSize: '1.25rem',
        fontWeight: 500,
        color: darkState ? grey[400] : grey[500],
      },
    },
  })

  console.log('theme is: ', theme)

  const toggleDarkMode = () => {
    setDarkState(!darkState)
    localStorage.setItem('DARK_MODE', JSON.stringify(darkState))
  }

  return [theme, toggleDarkMode]
}
