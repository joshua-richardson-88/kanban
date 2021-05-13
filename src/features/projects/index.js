// import react libraries
import React from 'react'

// import modules
import { makeStyles } from '@material-ui/core/styles'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '@material-ui/core'

// import project files
import { editColumnOrder, editProjectOrder, editTaskOrder } from './projectSlice'
import Project from './pages/Project'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: '93.4vh',
  },
  dropZone: {
    margin: theme.spacing(2),
    width: '100%',
    height: '100%',
  },
  projectsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}))

export default function Projects() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects.project)
  const projectOrder = useSelector((state) => state.projects.projectOrder)

  // handler for drag-and-drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result
    // if there is no destination, abort
    if (!destination) return
    // if the source and destination are the same, no need to do anything
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // if you're dragging projects
    if (type === 'project') {
      dispatch(
        editProjectOrder({ source: source.index, destination: destination.index, id: draggableId })
      )
    }
    // if you're dragging columns
    if (type === 'column') {
      const startProject = projects[source.droppableId]
      const endProject = projects[destination.droppableId]

      dispatch(
        editColumnOrder({
          columnId: draggableId,
          destination: destination.index,
          endProjectId: endProject.id,
          source: source.index,
          startProjectId: startProject.id,
        })
      )
    }

    // if you're dragging tasks
    if (type === 'task') {
      const startColumn = projects.columns[source.droppableId]
      const endColumn = projects.columns[destination.droppableId]

      dispatch(
        editTaskOrder({
          startColumnId: startColumn.id,
          endColumnId: endColumn.id,
          source: source.index,
          destination: destination.index,
          taskId: draggableId,
        })
      )
    }
  }

  return (
    <div className={classes.grow}>
      <div className={classes.dropZone}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-projects' direction='vertical' type='project'>
            {(provided) => (
              <Card className={classes.projectsContainer}>
                {projectOrder.map((id, index) => {
                  console.log('id: ', id)
                  console.log('projects: ', projects)
                  const project = projects[id]

                  return <Project projectId={project.id} index={index} />
                })}
              </Card>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
