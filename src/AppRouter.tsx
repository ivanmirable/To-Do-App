import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TaskListContainer from './containers/TaskListContainer'
import TaskDetailContainer from './containers/TaskDetailContainer'
import CreateTask from './components/Task/CreateTask'
import MainContent from './containers/MainContent'
import TagContent from './containers/TagContent'

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />}></Route>
        <Route path="/task/:taskId" element={<TaskDetailContainer />}></Route>
        <Route path="/createNote" element={<CreateTask />}></Route>
        <Route path="/AddTag" element={<TagContent />}></Route>
      </Routes>
    </Router>
  )
}
