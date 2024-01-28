import React, { useEffect } from 'react'
import styled from 'styled-components'
import TaskListContainer from './TaskListContainer'
import { Tag } from '../components/Tag/Tag'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fecthTags } from '../redux/slices/notes'

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  flex-shrink: 0;
`

const ContentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`
const Container = styled.div``

const Sidebar = styled.div`
  flex-shrink: 0;
  width: 400px; /* Ширина сайдбара */
  margin-left: 20px; /* Расстояние между контентом и сайдбаром */
  position: fixed;
  top: 50px;
  left: 0;
  height: 100%; /* Занимает всю высоту экрана */
  background-color: #f2f2f2; /* Цвет фона сайдбара */
  padding: 20px;
  box-sizing: border-box;
  margin: 40px auto;
`

const YourComponent = () => {
  const dispatch = useDispatch<AppDispatch>()

  const tags = useSelector((state: RootState) => state.notes.tags)
  console.log(tags)
  useEffect(() => {
    dispatch(fecthTags())
  }, [])
  return (
    <PageContainer>
      <ContentContainer>
        <TaskListContainer />
      </ContentContainer>
      <Sidebar>
        {tags.map((tag) => (
          <Container key={tag}>
            <Tag tag={tag} />
          </Container>
        ))}
      </Sidebar>
    </PageContainer>
  )
}

export default YourComponent
