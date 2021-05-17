// import react libraries
import React, { useCallback, useEffect, useState } from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Button,
  Card,
  CardHeader,
  ClickAwayListener,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Input,
  InputBase,
  Paper,
  Slider,
  Typography,
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
  updateProjectColor,
  updateProjectTitle,
} from '../projectSlice'
import Column from './Column'
import useEventListener from '../../../hooks/useEventListener'

const useStyles = makeStyles((theme) => ({
  collapse: { minHeight: '12rem !important' },
  colorPicker: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  divider: {
    border: 1,
    width: '100%',
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
  const [projectColor, setProjectColor] = useState(project.color.h)
  const [cardStyle, setCardStyle] = useState({
    backgroundColor: `hsl(${projectColor}, ${project.color.s}, ${
      darkMode === 'dark' ? '30' : '60'
    }%)`,
  })
  useEffect(() => {
    setCardStyle({
      backgroundColor: `hsl(${projectColor}, ${project.color.s}, ${
        darkMode === 'dark' ? '30' : '60'
      }%)`,
    })
  }, [darkMode, project.color.s, projectColor])

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

  const MIN_SLIDER = 0
  const MAX_SLIDER = 360
  const handleSliderChange = (_event, newValue) => {
    setProjectColor(newValue)
    setCardStyle({
      backgroundColor: `hsl(${newValue}, ${project.color.s}, ${
        darkMode === 'dark' ? '30' : '60'
      }%)`,
    })
    dispatch(updateProjectColor({ projectId, newColor: newValue }))
  }
  const handleColorInputChange = (event) => {
    const inputNumber = parseInt(event.target.value, 10)
    if (isNaN(inputNumber)) return

    setProjectColor(inputNumber)
    setCardStyle({
      backgroundColor: `hsl(${inputNumber}, ${project.color.s}, ${
        darkMode === 'dark' ? '30' : '60'
      }%)`,
    })

    dispatch(updateProjectColor({ projectId, newColor: inputNumber }))
  }
  const handleColorInputBlur = () => {
    if (projectColor < MIN_SLIDER) setProjectColor(MIN_SLIDER)
    if (projectColor > MAX_SLIDER) setProjectColor(MAX_SLIDER)
  }

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
          <Card elevation={8} style={cardStyle}>
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
                        <Divider className={classes.divider} />
                        <div className={classes.colorPicker}>
                          <Typography id='color-picker' gutterBottom>
                            Change Color
                          </Typography>
                          <Grid container spacing={2} alignItems='center'>
                            <Grid item xs>
                              <Slider
                                value={projectColor}
                                step={1}
                                min={MIN_SLIDER}
                                max={MAX_SLIDER}
                                onChange={handleSliderChange}
                                aria-labelledby='color-picker'
                              />
                            </Grid>
                            <Grid item>
                              <Input
                                value={projectColor}
                                margin='dense'
                                onChange={handleColorInputChange}
                                onBlur={handleColorInputBlur}
                                inputProps={{
                                  step: 1,
                                  min: MIN_SLIDER,
                                  max: MAX_SLIDER,
                                  type: 'number',
                                  'aria-labelledby': 'color-picker',
                                }}
                              />
                            </Grid>
                          </Grid>
                        </div>
                        <Divider className={classes.divider} />
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
                    style={cardStyle}
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
