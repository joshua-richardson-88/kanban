import { createSlice } from '@reduxjs/toolkit'
import cuid from 'cuid'

const projectSlice = createSlice({
  name: 'projects',
  initialState: {},
  reducers: {
    createProject: {
      reducer: (state, { payload }) => {
        console.log('got payload: ', payload)
        state.projectOrder.push(payload.id)
        state.project[payload.id] = payload
      },
      prepare: (text) => {
        const id = cuid()
        const color = { h: Math.floor(Math.random() * 256), s: '30%' }
        const title = text
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks
        console.log(`id: ${id}, title: ${title}, color: ${color}`)
        return { payload: { id, title, color, columnIds: [] } }
      },
    },
    editColumnOrder(
      state,
      { payload: { columnId, destination, endProjectId, source, startProjectId } }
    ) {
      if (startProjectId === endProjectId) {
        state.project[startProjectId].columnIds.splice(source, 1)
        state.project[startProjectId].columnIds.splice(destination, 0, columnId)
      } else {
        state.project[startProjectId].columnIds.splice(source, 1)
        state.project[endProjectId].columnIds.splice(destination, 0, columnId)
      }
    },
    editProjectOrder(state, { payload: { source, destination, id } }) {
      state.projectOrder.splice(source, 1)
      state.projectOrder.splice(destination, 0, id)
    },
    editTaskOrder(state, { payload: { startColumnId, endColumnId, source, destination, taskId } }) {
      if (startColumnId === endColumnId) {
        state.project[startColumnId].columnIds.splice(source, 1)
        state.project[startColumnId].columnIds.splice(destination, 0, taskId)
      } else {
        state.project[startColumnId].columnIds.splice(source, 1)
        state.project[endColumnId].columnIds.splice(destination, 0, taskId)
      }
    },
    updateProjectTitle(state, { payload: { projectId, newTitle } }) {
      state.project[projectId].title = newTitle
    },
  },
})

export const {
  createProject,
  editColumnOrder,
  editProjectOrder,
  editTaskOrder,
  updateProjectTitle,
} = projectSlice.actions
export default projectSlice.reducer
