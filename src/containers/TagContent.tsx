import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { AppDispatch, RootState } from '../redux/store'
import { fecthTags, fetchTagsByNotes } from '../redux/slices/notes'
import { Tag2 } from '../components/Tag2/Tag2'
import { Button } from '../components/Task/CreateTask'

const fadeInUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const CategoriesContainer = styled.div`
  width: 50%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #2c3e50;
  color: white;
  opacity: 0;
  transform: translateY(-20px);
  animation: ${fadeInUp} 0.5s ease-out forwards;
`

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const YourCategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const notesParams = new URLSearchParams(location.search)

  const tags = useSelector((state: RootState) => state.notes.tags)
  const [categories, setCategory] = useState<string[]>(tags)
  const [selectCategories, setSelectCategories] = useState<string[]>([])
  useEffect(() => {
    const fetchData = async () => {
      // Получение тегов для конкретной заметки
      const specificNoteTagsAction = await dispatch(
        fetchTagsByNotes({ id: notesParams.get('_id') || '' }),
      )
      const specificNoteTagsData = specificNoteTagsAction.payload
      setSelectCategories(specificNoteTagsData)
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   dispatch(fetchNotesUpdate({ id: notesParams.get('_id') || '' }, {tag:}))
  // })
  return (
    <PageContainer>
      <CategoriesContainer>
        <h2>Your Categories</h2>
        <CategoryList>
          {categories.map((category) => (
            <Tag2
              categories={categories}
              setCategory={setCategory}
              selectCategories={selectCategories}
              setSelectCategories={setSelectCategories}
              key={category}
              tag={category}
            />
          ))}
        </CategoryList>
        <Button>Submit</Button>
      </CategoriesContainer>
    </PageContainer>
  )
}

export default YourCategoriesPage
