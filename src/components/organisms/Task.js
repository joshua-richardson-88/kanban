// import react libraries
import React from 'react'

// import modules
import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { Card, CardHeader } from '@material-ui/core'

// import project files
import { useStyles } from './styles'

export default function Task({ color, columnId, darkMode, index, taskId }) {
  const classes = useStyles()
  const task = useSelector((state) => state.tasks[taskId])

  const getTaskStyle = () => ({
    backgroundColor: `hsl(${color.h}, ${color.s}, ${darkMode === 'dark' ? '30' : '60'}%)`,
  })

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <div
          className={classes.taskRoot}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card elevation={8} style={getTaskStyle()}>
            <CardHeader title={task.title} />
          </Card>
        </div>
      )}
    </Draggable>
  )
}
