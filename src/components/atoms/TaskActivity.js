// import react modules
import React from 'react'

// import modules
import { Paper, Tooltip, Typography } from '@material-ui/core'
import moment from 'moment'
import Moment from 'react-moment'

// import project files
import { useStyles } from './styles'

export default function TaskDescription({ activities, darkMode }) {
  const classes = useStyles()

  return (
    <Paper elevation={6} className={classes.taskModalContent}>
      <Typography variant='h5'>Activity</Typography>
      {activities.map((action, index) => (
        <div className={classes.activityRow} key={index}>
          <div>
            {action.content.map((part, index) => {
              if (typeof part === 'string') return <span key={index}>{part}</span>
              if (part?.position) return <span key={index}>{part.position}</span>
              if (part?.column)
                return (
                  <span
                    key={index}
                    style={{
                      color:
                        darkMode === 'dark'
                          ? `hsl(${part.color.h}, ${part.color.s}, 60%)`
                          : `hsl(${part.color.h}, ${part.color.s}, 30%)`,
                    }}
                  >
                    {part.column}
                  </span>
                )

              return (
                <span
                  key={index}
                  style={{
                    color:
                      darkMode === 'dark'
                        ? `hsl(${part.color.h}, 100%, 60%)`
                        : `hsl(${part.color.h}, 100%, 30%)`,
                  }}
                >
                  {part.project}
                </span>
              )
            })}
          </div>
          <Tooltip arrow placement='left' title={moment(action.when).format('DD MMM YYYY, HH:mm')}>
            <Moment fromNow>{action.when}</Moment>
          </Tooltip>
        </div>
      ))}
    </Paper>
  )
}
