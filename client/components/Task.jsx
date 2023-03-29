import React, { useState } from 'react';

const Task = ({ index, task, manipulateTask }) => {
  const [description, setDescription] = useState('');
  const [textAreaVisibility, setTextAreaVisibility] = useState(false);

  const dueDate = task.dueDate < 10 ? '0' + task.dueDate.toString() : task.dueDate;
  const dueMonth = task.dueMonth < 10 ? '0' + task.dueMonth.toString() : task.dueMonth

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleEdit = () => {
    setTextAreaVisibility(true);
    if (description) {
      if (description.includes('</script>')) { return window.alert('Please enter valid input'); }
      manipulateTask(index, 'edit', description);
      setDescription('');
      setTextAreaVisibility(false);
    }
  };

  const handleCancelEdit = () => {
    setTextAreaVisibility(false);
  }


  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{`${dueDate}/${dueMonth}`}</td>
      <td>{task.priority}</td>

      <button onClick={handleEdit}>
        {textAreaVisibility ? 'Submit' : 'Edit'}
      </button>

      {textAreaVisibility && <button onClick={handleCancelEdit}>Cancel</button> }
      {textAreaVisibility && <textarea placeholder='Edit task description...' onChange={handleDescriptionChange} value={description}></textarea>}

      <label>
        Complete
        <input type='checkbox' checked={task.isComplete} onChange={() => manipulateTask(index, 'check')} />
      </label>

      <button onClick={() => manipulateTask(index, 'delete')}>Delete</button>
    </tr>
  )
}

export default Task;