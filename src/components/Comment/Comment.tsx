import React from 'react'
import styled from 'styled-components'

export interface CommentProps {
  id: number
  text: string
}
const CommentContainer = styled.div`
  margin-bottom: 10px;
`
const Comment: React.FC<CommentProps> = ({ id, text }) => {
  return (
    <CommentContainer>
      <p>{text}</p>
    </CommentContainer>
  )
}

export default Comment
