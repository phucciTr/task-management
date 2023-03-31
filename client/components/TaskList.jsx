import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Task from './Task.jsx';
import AddTask from './AddTask.jsx';
import FilterTask from './FilterTask.jsx';
import axios from 'axios';


const TaskList = ({ user, setStep }) => {
  const [tasks, setTasks] = useState([]);
  const [completeFilter, setCompleteFilter] = useState(false);
  const [authErr, setAuthErr] = useState('');
  const accessHeaders = { headers: {"Authorization" : `Bearer ${ user.accessToken }`} };

  useEffect(() => {
    axios.get(`/tasks/${user.userId}`, accessHeaders)
      .then((json) => setTasks(json.data))
      .catch((err) => {
        console.log('Error fetching tasks = ', err);
        setAuthErr(err.response.data);
      });
  }, [])

  const manipulateTask = async (index, action, newDescription) => {
    const newTasks = [...tasks], currTask = newTasks[index];
    const taskId = currTask.id;

    try {
      if (action === 'delete') {
        await axios.delete(`/task/${taskId}`, accessHeaders);
        newTasks.splice(index, 1);
      }
      if (action === 'edit') {
        await axios.put(`/task/description/${taskId}`, { description: newDescription }, accessHeaders);
        newTasks[index].description = newDescription;
      }
      if (action === 'check') {
        await axios.put(`/task/isComplete/${taskId}`, { description: newDescription }, accessHeaders);
        newTasks[index].isComplete = !currTask.isComplete;
      }

      setTasks(newTasks);
    } catch(err) {
      console.log('error manipulating task = ', err);
      setAuthErr(err.response.data);
    }
  }

  const addTask = (newTask) => {
    newTask.userId = user.userId;

    axios.post('/task', newTask, accessHeaders)
      .then((res) => {
        newTask.id = res.data;
        setTasks([...tasks, newTask]);
      })
      .catch((err) => {
        console.log('err adding task = ', err);
        setAuthErr(err.response.data);
      });
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setStep(1);
  }

  return (
    <div>
      <h1>{`hello ${user.name}`} </h1>
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

      {authErr === 'Not authorized' && <h2>User is not authorized to view tasks or perform task action due to invalid web token</h2>}
      <a href='' onClick={handleLinkClick} >Log Out</a>
    </div>
  )
}

export default TaskList;