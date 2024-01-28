import React, { useState } from 'react'
import { CommentProps } from '../components/Comment/Comment'
import Comment from '../components/Comment/Comment'
import { TaskProps } from '../components/Task/Task'
import { useParams } from 'react-router-dom'
interface TaskDetailContainerState {
  task: TaskProps | null
  comments: CommentProps[]
}

const TaskDetailContainer: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const [state, setState] = useState<TaskDetailContainerState>({
    task: null,
    comments: [
      { id: 1, text: 'Comment 1' },
      { id: 2, text: 'Comment 2' },
    ],
  })
  return (
    <div>
      <h2>Task List</h2>
      {state.comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  )
}
export default TaskDetailContainer
