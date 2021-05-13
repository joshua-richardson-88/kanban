// import react libraries
import React, { useState } from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, Collapse, IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// import project files
import { EditableText } from '../../../components/atoms'
import { updateProjectTitle } from '../projectSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem',
  },
  expand: {
    transform: 'rotate(270deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
}))

export default function Project(props) {
  const { projectId, index } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const project = useSelector((state) => state.projects.project[projectId])
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleTitleUpdate = (newTitle) => {
    dispatch(updateProjectTitle({ projectId, newTitle }))
  }

  return (
    <Draggable draggableId={projectId} index={index}>
      {(provided) => (
        <div
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardHeader
              avatar={
                <IconButton
                  className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </IconButton>
              }
              title={<EditableText startText={project.title} submitCallback={handleTitleUpdate} />}
            />
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <Droppable droppableId={projectId} direction='horizontal' type='column'>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    Column
                  </div>
                )}
              </Droppable>
            </Collapse>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
