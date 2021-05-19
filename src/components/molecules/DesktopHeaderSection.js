// import react libraries
import React from 'react'

// import modules

// import project files
import { NotificationsMenu, UserMenu } from '../atoms'
import { useStyles } from './styles'

export default function DesktopHeaderSection({ darkMode, toggleTheme }) {
  const classes = useStyles()

  return (
    <div className={classes.sectionDesktop}>
      <NotificationsMenu />
      <UserMenu darkMode={darkMode} toggleTheme={toggleTheme} />
    </div>
  )
}
