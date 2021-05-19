import { createSlice } from '@reduxjs/toolkit'
import cuid from 'cuid'

const projectSlice = createSlice({
  name: 'projects',
  initialState: {},
  reducers: {
    dropAll(state) {
      state.list = {}
      state.order = []
    },
    createProject: {
      reducer: (state, { payload }) => {
        console.log('got payload: ', payload)
        state.order = [payload.id, ...state.order]
        state.list[payload.id] = payload
      },
      prepare: (projectTitle) => {
        const id = cuid()
        const color = { h: Math.floor(Math.random() * 360), s: '30%' }
        const title = projectTitle
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks
        console.log(`id: ${id}, title: ${title}, color: ${color}`)
        return { payload: { id, title, collapsed: false, color, columnIds: [] } }
      },
    },
    editColumnOrder(
      state,
      { payload: { columnId, destination, endProjectId, source, startProjectId } }
    ) {
      if (startProjectId === endProjectId) {
        state.list[startProjectId].columnIds.splice(source, 1)
        state.list[startProjectId].columnIds.splice(destination, 0, columnId)
      } else {
        state.list[startProjectId].columnIds.splice(source, 1)
        state.list[endProjectId].columnIds.splice(destination, 0, columnId)
      }
    },
    editProjectOrder(state, { payload: { source, destination, id } }) {
      state.order.splice(source, 1)
      state.order.splice(destination, 0, id)
    },
    editProjectCollapsed(state, { payload: { projectId, isCollapsed } }) {
      state.list[projectId].collapsed = isCollapsed
    },
    removeProject(state, { payload: { projectId } }) {
      const { [projectId]: value, ...withoutProject } = state.list

      state.list = withoutProject
      state.order.splice(state.order.indexOf(projectId), 1)
    },
    updateProjectTitle(state, { payload: { projectId, newTitle } }) {
      state.list[projectId].title = newTitle
    },
    updateProjectColor(state, { payload: { projectId, newColor } }) {
      state.list[projectId].color.h = newColor
    },
  },
  extraReducers: {
    'columns/removeColumn': (state, { payload: { columnId, projectId } }) => {
      state.list[projectId].columnIds.splice(state.list[projectId].columnIds.indexOf(columnId), 1)
    },
    'columns/createColumn': (state, { payload: { projectId, column } }) => {
      state.list[projectId].columnIds.splice(0, 0, column.id)
    },
  },
})

export const {
  dropAll,
  createProject,
  editColumnOrder,
  editProjectCollapsed,
  editProjectOrder,
  removeProject,
  updateProjectColor,
  updateProjectTitle,
} = projectSlice.actions
export default projectSlice.reducer
