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
        content: [`Updated description to: ${description}`],
        when: Date.now(),
      })
      state[taskId].description = description
    },
    updateTaskTitle(state, { payload: { taskId, newTitle } }) {
      state[taskId].activity.push({
        content: [`Updated name from ${state[taskId].title} to ${newTitle}`],
        when: Date.now(),
      })
      state[taskId].title = newTitle
    },
  },
  extraReducers: {
    'projects/dropAll': (state) => ({}),
    'columns/editTaskOrder': (
      state,
      {
        payload: {
          destinationIndex,
          endColumn,
          endProject,
          sourceIndex,
          startColumn,
          startProject,
          taskId,
        },
      }
    ) => {
      let content = ''

      if (startProject.id === endProject.id) {
        if (startColumn.id === endColumn.id) {
          content = [
            'Changed positions from ',
            { position: sourceIndex || '0' },
            ' to ',
            { position: destinationIndex || '0' },
            ' in ',
            {
              project: startProject.title,
              color: { h: startProject.color.h, s: startProject.color.s },
            },
            ' - ',
            {
              column: startColumn.title,
              color: { h: startProject.color.h, s: startProject.color.s },
            },
          ]
        } else {
          content = [
            'Moved from ',
            {
              column: startColumn.title,
              color: { h: startProject.color.h, s: startProject.color.s },
            },
            ' to ',
            {
              column: endColumn.title,
              color: { h: startProject.color.h, s: startProject.color.s },
            },
          ]
        }
      } else {
        content = [
          'Moved from ',
          {
            project: startProject.title,
            color: { h: startProject.color.h, s: startProject.color.s },
          },
          ' - ',
          {
            column: startColumn.title,
            color: { h: startProject.color.h, s: startProject.color.s },
          },
          ' to ',
          { project: endProject.title, color: { h: endProject.color.h, s: endProject.color.s } },
          ' - ',
          {
            column: endColumn.title,
            color: { h: endProject.color.h, s: endProject.color.s },
          },
        ]
      }

      state[taskId].activity.push({ content, when: Date.now() })
    },
  },
})

export const { createTask, updateTaskDescription, updateTaskTitle } = taskSlice.actions
export default taskSlice.reducer
