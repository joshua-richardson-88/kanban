// import react libraries
import React, { useState } from 'react'

// import modules
import { InputBase } from '@material-ui/core'

// import project files
import { useStyles } from './styles'

export default function ProjectInput({ handleDone, placeholder }) {
  const classes = useStyles()
  const [inputText, setInputText] = useState('')

  const handleKeyPress = (event) => {
    // only do anything if the enter key was pressed
    if (event.charCode === 13 && inputText.length > 0) {
      handleDone(inputText)
      setInputText('')
    }
  }
  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  return (
    <div className={classes.root}>
      <InputBase
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        value={inputText}
        onChange={handleInputChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputText,
        }}
        inputProps={{ 'aria-label': 'New Project' }}
      />
    </div>
  )
}
