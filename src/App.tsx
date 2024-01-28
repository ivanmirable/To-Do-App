import React from 'react'
import GlobalStyles from './GlobalStyles'
import TaskListContainer from './containers/TaskListContainer'
import TaskDetailContainer from './containers/TaskDetailContainer'
import { AppRouter } from './AppRouter'
import { Provider } from 'react-redux'
import store from './redux/store'

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <AppRouter />
      </Provider>
    </>
  )
}

export default App
