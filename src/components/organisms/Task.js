// import react libraries
import React, { useState } from 'react'

// import modules
import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { Card, CardHeader, Modal } from '@material-ui/core'

// import project files
import { useStyles } from './styles'

export default function Task({ color, columnId, darkMode, index, taskId }) {
  const classes = useStyles()
  const task = useSelector((state) => state.tasks[taskId])

  // handle the task styling
  const getTaskStyle = () => ({
    backgroundColor: `hsl(${color.h}, ${color.s}, ${darkMode === 'dark' ? '30' : '60'}%)`,
  })

  // dealing with the Task Modal (temporary)
  // state
  const [openModal, setOpenModal] = useState(false)
  // show/hide the modal
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  // the modal content
  const modalBody = (
    <div className={classes.modalContainer}>
      <h2 id='simple-modal-title'>{task.title} modal</h2>
      <p id='simple-modal-description'>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
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
