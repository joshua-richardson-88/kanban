// import react libraries
import React, { useEffect, useState } from 'react'

// import modules
import { useDispatch, useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AssignmentIcon from '@material-ui/icons/Assignment'

// import project files
import { useStyles } from './styles'
import { EditableText } from '../atoms'
import { updateTaskTitle, updateTaskDescription } from '../../features/projects/taskSlice'

export default function Task({ color, columnId, darkMode, index, taskId }) {
  const classes = useStyles()
  const task = useSelector((state) => state.tasks[taskId])

  // handle the task styling
  const getTaskStyle = () => ({
    backgroundColor: `hsl(${color.h}, ${color.s}, ${darkMode === 'dark' ? '30' : '60'}%)`,
  })

  /****************************************************************************
                         Task Modal (temporary)
  ****************************************************************************/
  const dispatch = useDispatch()
  // state
  const [openModal, setOpenModal] = useState(false)
  const columnName = useSelector((state) => state.columns[columnId].title)
  const projects = useSelector((state) => state.projects.list)
  const [projectName, setProjectName] = useState(null)
  const taskDescription = useSelector((state) => state.tasks[taskId].description)
  const [description, setDescription] = useState(taskDescription)

  // continues to generate the current project's name for a given task any
  // time the column or project updates
  useEffect(() => {
    const projectsArray = Object.entries(projects)
    const name = projectsArray.filter((project) => project[1].columnIds.includes(columnId))[0][1]
      .title
    setProjectName(name)
  }, [columnId, projects])
  // show/hide the modal
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  // changing the task's title
  const handleTitleUpdate = (newTitle) => {
    dispatch(updateTaskTitle({ taskId, newTitle }))
  }
  const handleTaskDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  const handleDescriptionUpdate = (event) => {
    dispatch(updateTaskDescription({ taskId, description: event.target.value }))
  }

  // the modal content
  const modalBody = (
    <Card className={classes.modalContainer}>
      <CardHeader
        action={
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        }
        avatar={<AssignmentIcon />}
        title={<EditableText startText={task.title} submitCallback={handleTitleUpdate} />}
        subheader={`From ${projectName} / ${columnName}`}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <div style={{ padding: '1rem', height: 'calc(80vh - 8.5rem)' }}>
              <TextField
                label='Description'
                multiline
                rowsMax={4}
                value={description}
                onChange={handleTaskDescriptionChange}
                onBlur={handleDescriptionUpdate}
                fullWidth
              />
              <Typography variant='h6'>Activity</Typography>
              {task.activity.map((action, index) => {
                console.log(action)
                return (
                  <div key={index}>
                    <b>{action.content}</b>
                    <em>{new Date(action.when).toDateString()}</em>
                  </div>
                )
              })}
            </div>
          </Grid>
          <Grid item xs>
            <div style={{ padding: '1rem', height: 'calc(80vh - 8.5rem)' }}></div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided) => (
          <div
            className={classes.taskRoot}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card elevation={8} style={getTaskStyle()} onClick={handleOpenModal}>
              <CardHeader title={task.title} />
            </Card>
          </div>
        )}
      </Draggable>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {modalBody}
      </Modal>
    </>
  )
}
