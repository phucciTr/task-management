import React, { useState } from 'react';

const Task = ({ index, task, manipulateTask }) => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{`${task.dueDate}-${task.dueMonth}`}</td>
      <td>{task.priority}</td>

      <button onClick={() => {
        if (!description) { return; }
        manipulateTask(index, 'edit', description);
        setDescription('');
      }}>
        Edit Task
      </button>
      <textarea placeholder='Edit task...' onChange={handleDescriptionChange} value={description}></textarea>

      <label>
        <input type='checkbox' checked={task.isComplete} onChange={() => manipulateTask(index, 'check')} />
        Complete
      </label>

      <button onClick={() => manipulateTask(index, 'delete')}>Delete</button>
    </tr>
  )
}

export default Task;