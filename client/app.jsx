import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Task from './components/Task.jsx';
import AddTask from './components/AddTask.jsx';
import FilterTask from './components/FilterTask.jsx';
import axios from 'axios';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [completeFilter, setCompleteFilter] = useState(false);

  useEffect(() => {
    axios.get('/tasks')
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
    axios.post('/task', newTask)
      .then((res) => {
        newTask.id = res.data;
        setTasks([...tasks, newTask]);
      })
      .catch((err) => console.log('err = ', err));
  };

  console.log('rerender')

  return (
    <div>
      <h1>hello</h1>
      <AddTask addTask={addTask}/>
      <FilterTask setTasks={setTasks} setCompleteFilter={setCompleteFilter} completeFilter={completeFilter} tasks={tasks}/>

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
    </div>
  )
}

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App/>);