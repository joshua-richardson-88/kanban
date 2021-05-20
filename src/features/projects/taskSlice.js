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
      prepare: ({ columnId, columnTitle, projectTitle, titleName }) => {
        const id = cuid()
        const title = titleName
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks

        return {
          payload: {
            columnId,
            task: {
              id,
              title,
              description: '',
              activity: [
                { content: `Task added to ${columnTitle} in ${projectTitle}`, when: Date.now() },
              ],
            },
          },
        }
      },
    },
    updateTaskDescription(state, { payload: { description, taskId } }) {
      state[taskId].activity.push({
        content: `Updated description to: ${description}`,
        when: Date.now(),
      })
      state[taskId].description = description
    },
    updateTaskTitle(state, { payload: { taskId, newTitle } }) {
      state[taskId].activity.push({
        content: `Updated name from ${state[taskId].title} to ${newTitle}`,
        when: Date.now(),
      })
      state[taskId].title = newTitle
    },
  },
  extraReducers: {
    'projects/dropAll': (state) => ({}),
  },
})

export const { createTask, updateTaskDescription, updateTaskTitle } = taskSlice.actions
export default taskSlice.reducer
