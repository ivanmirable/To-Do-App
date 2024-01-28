import React, { Component, Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
interface Props {
  tag: string
}

const Container = styled.button`
  width: 90%;
  padding 20px;
  box-sizing: border-box;
  max-height: 70px;
  border-radius: 20px;
  background-color: #2c3e50;
  min-height: 50px;
  color: white;
  margin: 5px;
  border: none;
`
const Container2 = styled.button`
  width: 90%;
  color: white;
  text-align: center;
  box-sizing: border-box;
  max-height: 70px;
  border-radius: 20px;
  background-color: #2c3e50;
  min-height: 50px;
  margin: 5px;
  border: none;
`
export const Tag: FC<Props> = ({ tag }) => {
  return (
    <>
      <Container>
        <div>{tag}</div>
      </Container>
    </>
  )
}
