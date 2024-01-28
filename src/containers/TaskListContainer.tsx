import React, { useEffect, useState } from 'react'
import Task, { TaskProps } from '../components/Task/Task'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios'
import styled from 'styled-components'
import {
  NotesState,
  fetchNoteCreate,
  fetchNotes,
  setMyFunction,
} from '../redux/slices/notes'
import { AppDispatch, RootState } from '../redux/store'
import { Note } from '../redux/slices/notes'

interface TaskListContainerState {
  tasks: TaskProps[]
}
const Container = styled.div``
export const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 9px;
  max-width: 50%;
  width: max-content;
  flex-wrap: wrap;
  background: linear-gradient(to right, #f0f0f0, #dcdcdc);
`
const H2 = styled.h2`
  text-align: center;
`
const AddButton = styled.div`
  background-color: LimeGreen;
  margin: 20px auto;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  border: none;
  color: white;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`
const TaskListContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [render, setRender] = useState(false)
  const navigate = useNavigate()
  const notes = useSelector((state: RootState) => state.notes.notes)
  console.log(notes)
  const status = useSelector((state: RootState) => state.notes.status)
  console.log(status)
  const isNotesLoading = status === 'loading'
  const renderFunction = () => {
    setRender((prev) => !prev)
  }
  dispatch(setMyFunction(renderFunction))

  const handleSubmit = async () => {
    setRender((prev) => !prev)
    const createdNote = await dispatch(
      fetchNoteCreate({
        tittle: 'Заголовок заметки',
        description: 'Новая заметка',
        completed: false,
        user: 'user_id',
      }),
    )

    if (createdNote.payload) {
      const newNoteId = createdNote.payload._id
      navigate(
        `/createNote?_id=${newNoteId}&tittle=${'Заголовок заметки'}&description=${'Новая заметка'}&completed=${false}`,
      )
    }
  }
  useEffect(() => {
    dispatch(fetchNotes())
  }, [render])
  return (
    <div>
      <H2>Task List</H2>
      <List>
        {isNotesLoading
          ? 'Загрузка'
          : Array.isArray(notes)
          ? notes.map((task) => (
              <Container key={task._id}>
                <Task
                  _id={task._id}
                  tittle={task.tittle}
                  description={task.description}
                  completed={task.completed}
                  tags={task.tags}
                  setRender={setRender}
                />
              </Container>
            ))
          : 'Перезагрузка'}
      </List>
      <AddButton onClick={handleSubmit}>+</AddButton>
    </div>
  )
}

export default TaskListContainer
