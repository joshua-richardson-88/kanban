import { createSlice } from '@reduxjs/toolkit'
import cuid from 'cuid'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {
    createTask: {
      reducer: (state, { payload: { task } }) => {
        state[task.id] = task
      },
      prepare: ({ columnId, titleName }) => {
        const id = cuid()
        const title = titleName
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks

        return { payload: { columnId, task: { id, title } } }
      },
    },
  },
  extraReducers: {
    'projects/dropAll': (state) => ({}),
  },
})

export const { createTask } = taskSlice.actions
export default taskSlice.reducer
