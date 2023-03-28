import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Task from './components/Task.jsx';
import axios from 'axios';


const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks')
      .then((json) => setTasks(json.data));
  }, [])

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>hello</h1>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
          {tasks.map((task, i) => <Task deleteTask={deleteTask} index={i} task={task} />)}
        </tbody>
      </table>
    </div>
  )
}

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App/>);