import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { fetchNotesUpdate } from '../../redux/slices/notes'
import { TaskProps } from './Task'
import { AppDispatch } from '../../redux/store'
import { useLocation, useNavigate } from 'react-router-dom'

import { keyframes } from 'styled-components'
interface StyledColorProps {
  color: string
  completed: boolean
}
const fadeInUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`
const UpdateFormContainer = styled.div<StyledColorProps>`
  width: 50%;
  margin: 10vh auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.color}; /* Темно-синий цвет фона */
  color: ${(props) =>
    props.completed ? '#333333' : 'white'}; /* Светлый цвет текста */
  opacity: 0;
  transform: translateY(-20px);
  animation: ${fadeInUp} 0.5s ease-out forwards;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input<StyledColorProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #34495e; /* Темный оттенок для границы */
  border-radius: 4px;
  background-color: ${(props) => props.color}; /* Темно-синий цвет фона */
  color: ${(props) =>
    props.completed ? '#333333' : 'white'}; /* Светлый цвет текста */
`

const TextArea = styled.textarea<StyledColorProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #34495e; /* Темный оттенок для границы */
  border-radius: 4px;
  resize: vertical;
  min-height: 50vh;
  background-color: ${(props) => props.color}; /* Темно-синий цвет фона */
  color: ${(props) =>
    props.completed ? '#333333' : 'white'}; /* Светлый цвет текста */
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

export const Button = styled.button`
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.1);
  }
`

const CreateTask = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const notesParams = new URLSearchParams(location.search)
  const dispatch = useDispatch<AppDispatch>()
  const [tittle, setTitle] = useState<string>(notesParams.get('tittle') || '')
  const [completed, setCompleted] = useState<boolean>(
    'true' === notesParams.get('completed' || 'false'),
  )
  const [optDescription, setDescription] = useState<string>(
    notesParams.get('description') || '',
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSubmit()
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [tittle, optDescription])

  const handleSubmit = () => {
    // Диспетчер Redux для обновления заметок
    dispatch(
      fetchNotesUpdate({
        id: notesParams.get('_id') || '',
        dataToUpdate: { tittle: tittle, description: optDescription },
      }),
    )
  }
  const handleNavigateTags = () => {
    navigate(
      `/AddTag?_id=${notesParams.get(
        '_id',
      )}&tittle=${tittle}&tags=${notesParams.get('tags')}`,
    )
  }
  return (
    <UpdateFormContainer
      completed={completed}
      color={completed ? '#98fa98' : '#2c3e50'}>
      <Form onSubmit={handleSubmit}>
        <Label>Title:</Label>
        <Input
          completed={completed}
          color={completed ? '#549952' : '#2c3e50'}
          type="text"
          value={tittle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>Description:</Label>
        <TextArea
          completed={completed}
          color={completed ? '#549952' : '#2c3e50'}
          value={optDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleNavigateTags}>Submit</Button>
      </Form>
    </UpdateFormContainer>
  )
}

export default CreateTask
