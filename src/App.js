// import react modules
import React from 'react'

// import modules
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

// import project files
import useDarkMode from './hooks/useDarkMode'
import { Header } from './components/molecules'
import { Projects } from './components/organisms'

export default function App() {
  const [theme, toggleDarkMode] = useDarkMode()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app'>
        <Header darkMode={theme.palette.type} toggleTheme={toggleDarkMode} />
        <Projects />
      </div>
    </ThemeProvider>
  )
}
