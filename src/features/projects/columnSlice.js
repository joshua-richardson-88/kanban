import { createSlice } from '@reduxjs/toolkit'
import cuid from 'cuid'

const columnSlice = createSlice({
  name: 'columns',
  initialState: {},
  reducers: {
    createColumn: {
      reducer: (state, { payload: { column } }) => {
        state[column.id] = column
      },
      prepare: ({ titleName, projectId }) => {
        const id = cuid()
        const title = titleName
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks

        return { payload: { column: { id, title, taskIds: [] }, projectId } }
      },
    },
    editTaskOrder(state, { payload: { startColumnId, endColumnId, source, destination, taskId } }) {
      if (startColumnId === endColumnId) {
        state[startColumnId].taskIds.splice(source, 1)
        state[startColumnId].taskIds.splice(destination, 0, taskId)
      } else {
        state[startColumnId].taskIds.splice(source, 1)
        state[endColumnId].taskIds.splice(destination, 0, taskId)
      }
    },
    removeColumn(state, { payload: { columnId } }) {
      const { [columnId]: value, ...withoutColumn } = state

      state = withoutColumn
    },
    updateColumnTitle(state, { payload: { columnId, newTitle } }) {
      state[columnId].title = newTitle
    },
  },
  extraReducers: {
    'projects/dropAll': (state) => ({}),
    'tasks/createTask': (state, { payload: { columnId, task } }) => {
      state[columnId].taskIds.splice(0, 0, task.id)
    },
  },
})

export const { createColumn, editTaskOrder, removeColumn, updateColumnTitle } = columnSlice.actions
export default columnSlice.reducer
