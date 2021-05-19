// import react libraries
import React, { useState } from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { Button, ClickAwayListener, Divider, IconButton, Paper } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreIcon from '@material-ui/icons/MoreVert'

// import project files
import { useStyles } from './styles'
import { removeProject } from '../../features/projects/projectSlice'
import { createColumn } from '../../features/projects/columnSlice'
import { ProjectInput } from '../atoms'

export default function ProjectMenu({ projectId, toggleCollapsed }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  //menu functionality
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuOpen = () => {
    setMenuOpen(true)
    toggleCollapsed(false)
  }
  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  // menu items functionality
  // --ProjectInput
  const handleCreateColumn = (text) => {
    dispatch(createColumn({ projectId, titleName: text }))
  }
  // --Delete Button
  const handleDeleteProject = () => {
    dispatch(removeProject({ projectId }))
  }

  return (
    <div className={classes.projectMenuIcon}>
      <IconButton
        aria-label='show more'
        aria-haspopup='true'
        onClick={handleMenuOpen}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      {menuOpen ? (
        <ClickAwayListener onClickAway={handleMenuClose}>
          <Paper className={classes.projectMenu} elevation={8}>
            <ProjectInput handleDone={handleCreateColumn} />
            <Divider className={classes.divider} />
            <ColorPicker />
            <Divider className={classes.divider} />
            <Button onClick={handleDeleteProject} fullWidth startIcon={<DeleteForeverIcon />}>
              Delete Project
            </Button>
          </Paper>
        </ClickAwayListener>
      ) : null}
    </div>
  )
}
