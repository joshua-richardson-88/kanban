import { createSlice } from '@reduxjs/toolkit'
import cuid from 'cuid'

const projectSlice = createSlice({
  name: 'projects',
  initialState: {},
  reducers: {
    createColumn: {
      reducer: (state, { payload: { column, projectId } }) => {
        state.project[projectId].columnIds.push(column.id)
        state.column[column.id] = column
      },
      prepare: ({ projectId, columnId }) => {
        const id = cuid()
        const title = columnId
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks

        return { payload: { column: { id, title, taskIds: [] }, projectId } }
      },
    },
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
        return { payload: { id, title, collapsed: false, color, columnIds: [] } }
      },
    },
    createTask: {
      reducer: (state, { payload: { task, columnId } }) => {
        state.column[columnId].taskIds.push(task.id)
        state.task[task.id] = task
      },
      prepare: ({ columnId, title }) => {
        const id = cuid()
        const sanitizedTitle = title
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks

        return { payload: { task: { id, content: sanitizedTitle }, columnId } }
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
    editProjectCollapsed(state, { payload: { projectId, isCollapsed } }) {
      console.log('got project: ', projectId)
      console.log('got collapsed: ', isCollapsed)
      state.project[projectId].collapsed = isCollapsed
    },
    editTaskOrder(state, { payload: { startColumnId, endColumnId, source, destination, taskId } }) {
      if (startColumnId === endColumnId) {
        state.column[startColumnId].taskIds.splice(source, 1)
        state.column[startColumnId].taskIds.splice(destination, 0, taskId)
      } else {
        state.column[startColumnId].taskIds.splice(source, 1)
        state.column[endColumnId].taskIds.splice(destination, 0, taskId)
      }
    },
    removeProject(state, { payload: { projectId } }) {
      const { [projectId]: value, ...withoutProject } = state.project

      state.project = withoutProject
      state.projectOrder.splice(state.projectOrder.indexOf(projectId), 1)
    },
    removeColumn(state, { payload: { columnId, projectId } }) {
      const { [columnId]: value, ...withoutColumn } = state.column

      state.column = withoutColumn
      state.project[projectId].columnIds.splice(
        state.project[projectId].columnIds.indexOf(columnId),
        1
      )
    },
    updateProjectTitle(state, { payload: { projectId, newTitle } }) {
      state.project[projectId].title = newTitle
    },
    updateColumnTitle(state, { payload: { columnId, newTitle } }) {
      state.column[columnId].title = newTitle
    },
  },
})

export const {
  createColumn,
  createProject,
  createTask,
  editColumnOrder,
  editProjectCollapsed,
  editProjectOrder,
  editTaskOrder,
  removeColumn,
  removeProject,
  updateColumnTitle,
  updateProjectTitle,
} = projectSlice.actions
export default projectSlice.reducer
