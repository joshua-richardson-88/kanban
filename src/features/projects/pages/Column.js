// import react libraries
import React, { useState } from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles'
import MoreIcon from '@material-ui/icons/MoreVert'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

// import project files
import { EditableText } from '../../../components/atoms'
import { createTask, removeColumn, updateColumnTitle } from '../projectSlice'
import Task from './Task'

const useStyles = makeStyles((theme) => ({
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
  newProject: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  taskContainer: {
    padding: '1px 0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    minHeight: '7rem',
  },
  root: {
    margin: '1rem 0',
    width: '20rem',
    minHeight: '-webkit-min-content',
    display: 'flex',
    '&::before': {
      content: '" "',
      display: 'block',
      width: '1rem',
      height: 1,
    },
    '&::after': {
      content: '" "',
      display: 'block',
      width: '1rem',
      height: 1,
    },
  },
}))

export default function Column(props) {
  const { color, columnId, darkMode, index, projectId } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const column = useSelector((state) => state.projects.column[columnId])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const getProjectStyle = () => ({
    backgroundColor: `hsl(${color.h}, ${color.s}, 40%)`,
  })
  const handleTitleUpdate = (newTitle) => {
    dispatch(updateColumnTitle({ columnId, newTitle }))
  }
  const columnMenuId = `${column.title}-management-menu`
  const handleColumnMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleDeleteColumn = () => {
    dispatch(removeColumn({ projectId, columnId }))
  }
  const handleNewTaskTitleChange = (event) => {
    setNewTaskTitle(event.target.value)
  }
  const handleCreateTask = (event) => {
    if (event.charCode === 13) {
      dispatch(createTask({ columnId, title: newTaskTitle }))
      setNewTaskTitle('')
    }
  }

  const renderColumnMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={columnMenuId}
      keepMounted
      transformOrigin={{ vertical: 0, horizontal: 65 }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleDeleteColumn}>
        <div className={classes.menuItem}>
          <DeleteForeverIcon />
          <span style={{ marginLeft: '1rem', fontSize: '1.2rem' }}>Delete Column</span>
        </div>
      </MenuItem>
    </Menu>
  )

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <div
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card elevation={8} style={getProjectStyle()}>
            <CardHeader
              action={
                <IconButton
                  aria-label='show more'
                  aria-controls={columnMenuId}
                  aria-haspopup='true'
                  onClick={handleColumnMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              }
              title={<EditableText startText={column.title} submitCallback={handleTitleUpdate} />}
            />
            <Divider />
            <div className={classes.newProject}>
              <InputBase
                placeholder='New Task'
                onKeyPress={handleCreateTask}
                value={newTaskTitle}
                onChange={handleNewTaskTitleChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'New Task' }}
              />
            </div>
            {renderColumnMenu}
            <CardContent>
              <Droppable droppableId={columnId} direction='vertical' type='task'>
                {(provided, snapshot) => (
                  <Paper
                    elevation={3}
                    className={classes.taskContainer}
                    style={getProjectStyle()}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.taskIds.map((id, index) => (
                      <Task
                        key={id}
                        columnId={columnId}
                        taskId={id}
                        index={index}
                        darkMode={darkMode}
                        color={color}
                      />
                    ))}

                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
