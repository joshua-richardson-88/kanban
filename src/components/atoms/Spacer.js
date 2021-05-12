// import react libraries
import React from 'react'

// import modules
import { makeStyles } from '@material-ui/core/styles'

// import project files

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}))

export default function Spacer() {
  const classes = useStyles()

  return <div className={classes.grow} />
}
