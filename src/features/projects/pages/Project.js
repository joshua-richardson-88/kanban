// import react libraries
import React from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, CardHeader } from '@material-ui/core'
import { useSelector } from 'react-redux'

// import project files

export default function Project(props) {
  const { projectId, index } = props
  const project = useSelector((state) => state.projects.project[projectId])

  return (
    <Draggable draggableId={projectId} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps}>
          <CardHeader title={project.title} />
        </Card>
      )}
    </Draggable>
  )
}
