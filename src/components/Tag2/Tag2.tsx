import React, { Component, Dispatch, FC, SetStateAction, useState } from 'react'
import styled from 'styled-components'

interface StyledProps {
  bg: boolean
}
interface Tag2props {
  tag: string
  categories: string[]
  setCategory: Dispatch<SetStateAction<string[]>>
  selectCategories: string[]
  setSelectCategories: Dispatch<SetStateAction<string[]>>
}

const CategoryItem = styled.li<StyledProps>`
  margin-bottom: 8px;
  font-size: 18px;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.bg ? '#3498db' : '')};

  &:hover {
    background-color: #3498db;
    color: white;
  }
`
export const Tag2: FC<Tag2props> = ({
  tag,
  categories,
  setCategory,
  selectCategories,
  setSelectCategories,
}) => {
  const [select, setSelect] = useState<boolean>(false)

  const handleSelect = () => {
    setSelect((prev) => !prev)
    const find = selectCategories.find((item) => item == tag)
    if (!find) {
      setSelectCategories([...categories, tag])
    } else {
      return
    }
  }
  {
    return (
      <>
        <CategoryItem onClick={handleSelect} bg={select}>
          {tag}
        </CategoryItem>
      </>
    )
  }
}
