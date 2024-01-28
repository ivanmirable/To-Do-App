const tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    // ...другие задачи
  ];
  
  const comments = [
    { id: 1, text: 'Comment 1' },
    { id: 2, text: 'Comment 2' },
    // ...другие комментарии
  ];
  
  export const getTasks = () => Promise.resolve(tasks);
  export const getComments = () => Promise.resolve(comments);