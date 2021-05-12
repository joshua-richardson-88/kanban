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
  },
})

export const { createProject } = projectSlice.actions
export default projectSlice.reducer
