// import react libraries
import React, { useCallback, useState } from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Button,
  Card,
  CardHeader,
  ClickAwayListener,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreIcon from '@material-ui/icons/MoreVert'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

// import project files
import { EditableText } from '../../../components/atoms'
import {
  createColumn,
  editProjectCollapsed,
  removeProject,
  updateProjectTitle,
} from '../projectSlice'
import Column from './Column'
import useEventListener from '../../../hooks/useEventListener'

const useStyles = makeStyles((theme) => ({
  collapse: { minHeight: '3.4rem !important' },
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
  menuItem: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '8px 0',
  },
  newProject: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.type === 'dark'
        ? fade(theme.palette.common.white, 0.15)
        : fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor:
        theme.palette.type === 'dark'
          ? fade(theme.palette.common.white, 0.25)
          : fade(theme.palette.common.black, 0.25),
    },
    margin: '8px 0',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  projectContainer: {
    flex: 1,
    display: 'flex',
    overflowX: 'auto',
    padding: '0 8px',
    '&::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.3)',
      borderRadius: '12px',
    },
  },
  projectMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
  },
  projectMenuIcon: {
    position: 'relative',
  },
  root: {
    margin: '1rem',
  },
}))

export default function Project(props) {
  const { darkMode, projectId, index } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const project = useSelector((state) => state.projects.project[projectId])
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const [collapsed, setCollapsed] = useState(project.collapsed)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleProjectMenuOpen = (event) => {
    setMenuOpen(true)
    setCollapsed(false)
  }
  const handleMenuClose = () => {
    setMenuOpen(false)
  }
  const handleCreateColumn = (event) => {
    if (event.charCode === 13) {
      dispatch(createColumn({ projectId, columnId: newColumnTitle }))
      setNewColumnTitle('')
    }
  }
  const handleNewColumnTitleChange = (event) => {
    setNewColumnTitle(event.target.value)
  }
  const handleDeleteProject = () => {
    dispatch(removeProject({ projectId }))
  }

  const handleExpandClick = () => {
    setCollapsed(!collapsed)
    dispatch(editProjectCollapsed({ projectId, isCollapsed: !collapsed }))
  }
  const handleTitleUpdate = (newTitle) => {
    dispatch(updateProjectTitle({ projectId, newTitle }))
  }
  const getProjectStyle = () => ({
    backgroundColor: `hsl(${project.color.h}, ${project.color.s}, ${
      darkMode === 'dark' ? '30' : '60'
    }%)`,
  })

  const handleKeyboardLeave = useCallback((event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false)
    }
  }, [])

  useEventListener('keydown', handleKeyboardLeave)

  return (
    <Draggable draggableId={projectId} index={index}>
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
                <div className={classes.projectMenuIcon}>
                  <IconButton
                    aria-label='show more'
                    aria-haspopup='true'
                    onClick={handleProjectMenuOpen}
                    color='inherit'
                  >
                    <MoreIcon />
                  </IconButton>
                  {menuOpen ? (
                    <ClickAwayListener onClickAway={handleMenuClose}>
                      <Paper className={classes.projectMenu} elevation={8}>
                        <Button
                          onClick={handleDeleteProject}
                          fullWidth
                          startIcon={<DeleteForeverIcon />}
                        >
                          Delete Project
                        </Button>
                        <Divider />
                        <div className={classes.newProject}>
                          <InputBase
                            placeholder='New Column'
                            onKeyPress={handleCreateColumn}
                            value={newColumnTitle}
                            onChange={handleNewColumnTitleChange}
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'New Column' }}
                          />
                        </div>
                      </Paper>
                    </ClickAwayListener>
                  ) : null}
                </div>
              }
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
              title={<EditableText startText={project.title} submitCallback={handleTitleUpdate} />}
            />
            <Collapse in={!collapsed} timeout='auto' unmountOnExit className={classes.collapse}>
              <Droppable droppableId={projectId} direction='horizontal' type='column'>
                {(provided, snapshot) => (
                  <Paper
                    elevation={3}
                    className={classes.projectContainer}
                    style={getProjectStyle()}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {project.columnIds.map((id, index) => (
                      <Column
                        key={id}
                        color={project.color}
                        columnId={id}
                        darkMode={darkMode}
                        index={index}
                        projectId={projectId}
                      />
                    ))}

                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Collapse>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
