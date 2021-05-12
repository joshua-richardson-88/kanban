// import react modules
import React from 'react'

// import modules
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import '@fontsource/roboto'

// import project files
import './index.css'
import store from './app/store'
import App from './App'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
