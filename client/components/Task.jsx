import React from 'react';

const Task = ({ index, task, deleteTask }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <button onClick={() => deleteTask(index)}>Delete</button>
    </tr>
  )
}

export default Task;