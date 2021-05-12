// import react modules
import React, { useState } from 'react'

// import modules
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// import project files

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export default function Header(props) {
  const classes = useStyles()
  const [projectTitle, setProjectTitle] = useState('New Project')

  const handleInputChange = (event) => {
    const newTitle = event.target.value
      .trim()
      .replace(/\n/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
    setProjectTitle(newTitle)
  }
  const handleSubmit = () => {
    props.addNewProject(projectTitle)
  }

  return (
    <>
      <Typography>What are you working on?</Typography>
      <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor='new-project'>New Project</InputLabel>
          <Input
            id='new-project'
            value={projectTitle}
            onChange={handleInputChange}
            aria-describedby='new-project-helper-text'
          />
          <FormHelperText id='new-project-helper-text'>
            Use this form to create a new project
          </FormHelperText>
        </FormControl>
        <Button type='submit' variant='contained' color='primary'>
          Create
        </Button>
      </form>
    </>
  )
}
