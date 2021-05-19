// import react libraries
import React from 'react'

// import modules
import { Grid, Typography } from '@material-ui/core'

// import project files
import { useStyles } from 'styles'

export default function ColorPicker() {
  const classes = useStyles()
  return (
    <div className={classes.colorPicker}>
      <Typography id='color-picker' gutterBottom>
        Change Color
      </Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs>
          <Slider />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </div>
  )
}
