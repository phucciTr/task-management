import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Task from './Task.jsx';
import AddTask from './AddTask.jsx';
import FilterTask from './FilterTask.jsx';
import axios from 'axios';


const TaskList = ({ loggedInUser, userId, setStep }) => {
  const [tasks, setTasks] = useState([]);
  const [completeFilter, setCompleteFilter] = useState(false);

  useEffect(() => {
    axios.get(`/tasks/${userId}`)
      .then((json) => setTasks(json.data));
  }, [])

  const manipulateTask = async (index, action, newDescription) => {
    const newTasks = [...tasks], currTask = newTasks[index];
    const taskId = currTask.id;

    try {
      if (action === 'delete') {
        await axios.delete(`/task/${taskId}`);
        newTasks.splice(index, 1);
      }
      if (action === 'edit') {
        await axios.put(`/task/description/${taskId}`, { description: newDescription });
        newTasks[index].description = newDescription;
      }
      if (action === 'check') {
        await axios.put(`/task/isComplete/${taskId}`, { isComplete: !currTask.isComplete });
        newTasks[index].isComplete = !currTask.isComplete;
      }

      setTasks(newTasks);
    } catch(err) {
      console.log('error manipulating task = ', err);
    }
  }

  const addTask = (newTask) => {
    newTask.userId = userId;

    axios.post('/task', newTask)
      .then((res) => {
        newTask.id = res.data;
        setTasks([...tasks, newTask]);
      })
      .catch((err) => console.log('err = ', err));
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setStep(1);
  }

  return (
    <div>
      <h1>{`hello ${loggedInUser}`} </h1>
      <AddTask addTask={addTask}/>
      <FilterTask setTasks={setTasks} setCompleteFilter={setCompleteFilter} tasks={tasks}/>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
          </tr>
          {tasks.filter((task) =>
            !completeFilter || (completeFilter && task.isComplete)).map((task, i) =>
              <Task manipulateTask={manipulateTask} index={i} task={task} />)}
        </tbody>
      </table>
      <br/>
      <br/>

      <a href='' onClick={handleLinkClick} >Log Out</a>
    </div>
  )
}

export default TaskList;