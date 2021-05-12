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

  const handleAddProject = (projectTitle) => {
    console.log(projectTitle)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app'>
        <Header addNewProject={handleAddProject} toggleTheme={toggleDarkMode} />
        <Projects />
      </div>
    </ThemeProvider>
  )
}
