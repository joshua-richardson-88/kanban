// import react modules
import React from 'react'

// import modules
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

// import project files

export default function CloseIconButton({ handleClick }) {
  return (
    <IconButton onClick={handleClick}>
      <CloseIcon />
    </IconButton>
  )
}
