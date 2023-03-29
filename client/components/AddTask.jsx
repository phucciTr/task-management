import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    dueMonth: '',
    isComplete: false
  });

  const handleChange = (e) => {
    if (e.target.name === 'dueDate' && e.target.value !== '' && (e.target.value < 1 || e.target.value > 31 || e.target.value === 'e')) { return; }
    if (e.target.name === 'dueMonth' && e.target.value !== '' && (e.target.value < 1 || e.target.value > 12)) { return; }
    if (e.target.name === 'priority' && e.target.value !== '' && e.target.value < 1) { return; }
    setTask((task) => ({...task, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invalidText = '</script>';
    if (task.title.includes(invalidText) || task.description.includes(invalidText)) { return alert('Please enter valid informations'); }
    if (!task.title || !task.priority || !task.dueDate || !task.dueMonth) { return alert('Please enter all task\'s fields '); }
    addTask(task);
    setTask({
      title: '',
      description: '',
      priority: '',
      dueDate: '',
      dueMonth: '',
      isComplete: false
    })
  }

  const handleInvalidKey = (e) => {
    const invalidKeys = ["e", "E", "+", "-", '0'];
    if (invalidKeys.includes(e.key)) { e.preventDefault(); }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label>
          Task Description
          <textarea placeholder='Enter description...' name='description'  value={task.description} onChange={handleChange}></textarea>
          <br/>

          Task Title
          <input type='text' name='title' value={task.title} onChange={handleChange}/>
          <br/>

          Task Priority
          <input type='number' name='priority' value={task.priority} onChange={handleChange} onKeyDown={handleInvalidKey}/>
          <br/>

          Task Due Date
          <input type='number' name='dueDate' value={task.dueDate} onChange={handleChange} onKeyDown={handleInvalidKey}/>
          <br/>

          Task Due Month
          <input type='number' name='dueMonth' value={task.dueMonth} onChange={handleChange} onKeyDown={handleInvalidKey}/>
          <br/>

          <input type='submit' value='Add New Task' onChange={handleChange}/>
          <br/>
          <br/>

        </label>
      </form>
    </div>
  )
};

export default AddTask;