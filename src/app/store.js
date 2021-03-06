// import modules
import { configureStore } from '@reduxjs/toolkit'

// import project files
import projectReducer from '../features/projects/projectSlice'
import columnReducer from '../features/projects/columnSlice'
import taskReducer from '../features/projects/taskSlice'

// if nothing in local storage, use this object for the state
const defaultState = {
  columns: {
    'column-1': { id: 'column-1', title: 'Todo', taskIds: ['task-1'] },
    'column-2': { id: 'column-2', title: 'In progress', taskIds: ['task-2', 'task-3'] },
    'column-3': { id: 'column-3', title: 'Review', taskIds: [] },
    'column-4': { id: 'column-4', title: 'Completed', taskIds: ['task-4'] },
    'column-5': { id: 'column-5', title: 'Completed', taskIds: ['task-5', 'task-6'] },
    'column-6': { id: 'column-6', title: 'Completed', taskIds: ['task-7', 'task-8', 'task-9'] },
  },
  projects: {
    order: ['project-1', 'project-2'],
    list: {
      'project-1': {
        id: 'project-1',
        title: 'A Thing',
        collapsed: false,
        color: { h: 206, s: '30%' },
        columnIds: ['column-1', 'column-2', 'column-3', 'column-4'],
      },
      'project-2': {
        id: 'project-2',
        title: 'Another Thing',
        collapsed: false,
        color: { h: 147, s: '30%' },
        columnIds: ['column-5', 'column-6'],
      },
    },
  },
  tasks: {
    'task-1': { id: 'task-1', title: 'Content for task 1', description: '', activity: [] },
    'task-2': { id: 'task-2', title: 'Content for task-2', description: '', activity: [] },
    'task-3': { id: 'task-3', title: 'Content for task-3', description: '', activity: [] },
    'task-4': { id: 'task-4', title: 'Content for task-4', description: '', activity: [] },
    'task-5': { id: 'task-5', title: 'Content for task-5', description: '', activity: [] },
    'task-6': { id: 'task-6', title: 'Content for task-6', description: '', activity: [] },
    'task-7': { id: 'task-7', title: 'Content for task-7', description: '', activity: [] },
    'task-8': { id: 'task-8', title: 'Content for task-8', description: '', activity: [] },
    'task-9': { id: 'task-9', title: 'Content for task-9', description: '', activity: [] },
  },
}

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  console.log('saving state')
  try {
    const serialisedState = JSON.stringify(state)
    localStorage.setItem('persistantState', serialisedState)
  } catch (e) {
    console.warn(e)
  }
}
// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('persistantState')
    if (serialisedState === null) return defaultState
    return JSON.parse(serialisedState)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

const store = configureStore({
  reducer: {
    columns: columnReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
  preloadedState: loadFromLocalStorage(),
})

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
