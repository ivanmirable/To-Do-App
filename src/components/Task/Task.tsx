import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { text } from 'stream/consumers'
import styled from 'styled-components'
import { Note, fetchNotesUpdate } from '../../redux/slices/notes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export interface TaskProps {
  _id: string
  tittle: string
  description: string
  completed: boolean
  tags: string[]
  setRender: Dispatch<SetStateAction<boolean>>
}
interface StyledIputProps {
  color: string
  width: string
  complete: boolean
}
const TaskContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: baseline;
`
const Checkbox = styled.input`
  margin-right: 10px;
  margin-top: 100px;
`
const Button = styled.div<StyledIputProps>`
  color: white;
  background-color: ${(props) => props.width};
  width: 120px;
  vertical-align: start;
  max-height: 120px;
  box-sizing: border-box;
  text-align: justify;
  padding: 10px;
  white-space: normal;
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
  border-bottom: ${(props) =>
    props.complete
      ? '2px solid black'
      : 'none'}; /* Зачеркивание через border-bottom */
  transition: border-bottom 0.3s ease;
`
const Tittle = styled.div`
  margin: 10px;
`
const Description = styled.div`
  margin: 10px;
  box-sizing: border-box;
  overflow-wrap: break-word;
  font-size: 12px;
  max-height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Ограничиваем количество отображаемых строк */
  -webkit-box-orient: vertical;
`
const Task: React.FC<TaskProps> = ({
  _id,
  tittle,
  description,
  completed,
  tags,
}) => {
  const [value, setValue] = useState<string>(tittle)
  const [complete, setComplete] = useState<boolean>(completed)
  const renderFunction = useSelector(
    (state: RootState) => state.notes.myFunction,
  )
  console.log(tags)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    if (checked !== completed) {
      await dispatch(
        fetchNotesUpdate({ id: _id, dataToUpdate: { completed: checked } }),
      )
    }
    setComplete(checked)
    renderFunction()
  }
  const handleButtonClick = () => {
    navigate(
      `/createNote?_id=${_id}&tittle=${tittle}&description=${description}&completed=${completed}&tags=${tags}`,
    )
  }
  return (
    <TaskContainer>
      <Checkbox
        type="checkbox"
        checked={complete}
        onChange={(e) => handleCheckboxChange(e)}
      />

      <Button
        width={complete ? 'LimeGreen' : '#2c3e50'}
        color={complete ? 'white' : 'black'}
        complete={complete}
        onClick={handleButtonClick}>
        <Tittle>{tittle}</Tittle>
        <Description>{description}</Description>
      </Button>
    </TaskContainer>
  )
}

export default Task
