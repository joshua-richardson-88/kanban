// import react libraries
import React, { useState } from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, Collapse, IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// import project files

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '1rem',
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
  const project = useSelector((state) => state.projects.project[projectId])
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Draggable draggableId={projectId} index={index}>
      {(provided) => (
        <Card className={classes.root} ref={provided.innerRef} {...provided.draggableProps}>
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
            title={project.title}
          />
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <div>Helllo</div>
          </Collapse>
        </Card>
      )}
    </Draggable>
  )
}
