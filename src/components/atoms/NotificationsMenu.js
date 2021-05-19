// import react libraries
import React from 'react'

// import modules
import { Badge, IconButton } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'

// import project files

export default function NotificationsMenu() {
  return (
    <IconButton aria-label='show 11 new notifications' color='inherit'>
      <Badge badgeContent={17} color='secondary'>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  )
}
