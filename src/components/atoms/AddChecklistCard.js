// import react modules
import React from 'react'

// import modules
import { Card, CardContent, CardHeader, Divider } from '@material-ui/core'

// import project files
import { useStyles } from './styles'
import { CloseIconButton, ProjectInput } from './index'

export default function AddChecklistCard({ taskId }) {
  const classes = useStyles()

  const handleTitleSubmit = (newTitle) => {
    console.log(newTitle)
  }

  return (
    <Card className={classes.actionMenuItem}>
      <CardHeader action={<CloseIconButton />} title='Add checklist' />
      <Divider />
      <CardContent>
        <ProjectInput placeholder='Checklist title' submitCallback={handleTitleSubmit} />
      </CardContent>
    </Card>
  )
}
