// import react modules
import React, { useEffect, useState } from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, IconButton } from '@material-ui/core'
import clsx from 'clsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// import project files
import { useStyles } from './styles'
import { editProjectCollapsed } from '../../features/projects/projectSlice'

export default function Projects({ darkMode, projectId, index }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const project = useSelector((state) => state.projects.list[projectId])

  // state to control the project card styling
  const [cardStyle, setCardStyle] = useState({
    backgroundColor: `hsl(${project.color.h}, ${project.color.s}, ${
      darkMode === 'dark' ? '30' : '60'
    })`,
  })
  useEffect(() => {
    setCardStyle({
      backgroundColor: `hsl(${project.color.h}, ${project.color.s}, ${
        darkMode === 'dark' ? '30' : '60'
      })`,
    })
  }, [darkMode, project])

  // handle the collapsing card content of the project
  const [collapsed, setCollapsed] = useState(project.collapsed)
  const handleExpandClick = () => {
    setCollapsed(!collapsed)
    dispatch(editProjectCollapsed({ projectId, isCollapsed: !collapsed }))
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
          <Card elevation={8} style={cardStyle}>
            <CardHeader
              action={<ProjectMenu projectId={projectId} toggleCollapse={setCollapsed} />}
              avatar={
                <IconButton
                  className={clsx(classes.expand, { [classes.expandOpen]: !collapsed })}
                  onClick={handleExpandClick}
                  aria-expanded={!collapsed}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </IconButton>
              }
            />
          </Card>
        </div>
      )}
    </Draggable>
  )
}
