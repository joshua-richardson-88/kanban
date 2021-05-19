// import react libraries
import React from 'react'

// import modules
import { Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles'

// import project files

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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: '8px 0',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  projectContainer: {
    padding: '1px 0px',
    display: 'flex',
    flexDirection: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  root: {
    width: 'calc(100% - 2rem)',
    margin: '1rem',
  },
}))

export default function Project(props) {
  const { color, darkMode, taskId, index } = props
  const classes = useStyles()
  const task = useSelector((state) => state.tasks[taskId])

  const getProjectStyle = () => ({
    backgroundColor: `hsl(${color.h}, ${color.s}, ${darkMode === 'dark' ? '30' : '60'}%)`,
  })

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <div
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card elevation={8} style={getProjectStyle()}>
            <CardContent>
              <Typography variant='body1'>{task.content}</Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
