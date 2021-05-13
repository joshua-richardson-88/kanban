// import react libraries
import React, { useCallback, useState } from 'react'

// import modules
import { ClickAwayListener, InputBase, Typography } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'

// import project files
import useEventListener from '../../hooks/useEventListener'

const useStyles = makeStyles((theme) => ({
  newProject: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '1em',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function EditableText(props) {
  const { submitCallback, startText } = props
  const classes = useStyles()
  const [showInput, setShowInput] = useState(false)
  const [inputText, setInputText] = useState(startText)

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }
  const handleSwitchToInput = () => {
    setShowInput(true)
  }
  const handleSubmit = (event) => {
    if (event.charCode === 13) {
      const finalText = inputText
        .trim() // remove any extra spaces
        .replace(/&nbsp;/g, ' ') // replace html spaces
        .replace(/&lt;/g, '<') // replace html less-than
        .replace(/&gt;/g, '>') // replace html greater-than
        .replace(/\n/g, '') // remove line-breaks

      submitCallback(finalText)
      setShowInput(false)
    }
  }
  const handleLeave = useCallback(
    (event) => {
      console.log(event)
      if (event.key === 'Escape') {
        setInputText(startText)
        setShowInput(false)
      }
    },
    [startText]
  )

  useEventListener('keydown', handleLeave)

  return (
    <ClickAwayListener onClickAway={handleLeave}>
      {showInput ? (
        <div className={classes.newProject}>
          <InputBase
            placeholder='New Project'
            onKeyDown={handleSubmit}
            value={inputText}
            onChange={handleInputChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'New Project' }}
          />
        </div>
      ) : (
        <Typography variant='h6' onClick={handleSwitchToInput}>
          {inputText}
        </Typography>
      )}
    </ClickAwayListener>
  )
}
