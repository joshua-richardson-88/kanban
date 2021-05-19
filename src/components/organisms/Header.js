// import react modules
import React from 'react'

// import modules
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

// import project files
import { ProjectInput, Spacer } from '../atoms'
import { DesktopHeaderSection, MobileHeaderSection } from '../molecules'
import { createProject } from '../../features/projects/projectSlice'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function Header({ toggleTheme, darkMode }) {
  const dispatch = useDispatch()
  const classes = useStyles()

  // function to pass to the ProjectInput component to handle when a new
  // project should be created
  const handleCreateProject = (projectTitle) => {
    dispatch(createProject(projectTitle))
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            Project Manager
          </Typography>
          <Spacer />
          <ProjectInput handleDone={handleCreateProject} />
          <Spacer />
          <DesktopHeaderSection darkMode={darkMode} toggleTheme={toggleTheme} />
          <MobileHeaderSection />
        </Toolbar>
      </AppBar>
    </div>
  )
}
