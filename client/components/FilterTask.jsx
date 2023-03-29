import React, { useState } from 'react';

const FilterTask = ({ setTasks, setCompleteFilter, tasks }) => {

  const handleFilterChange = (e) => {
    if (e.target.value === 'priority') {
      setCompleteFilter(false);
      setTasks([...tasks].sort((a, b) =>
        a.priority - b.priority
        || a.dueMonth - b.dueMonth
        || a.dueDate - b.dueDate));
    }
    if (e.target.value === 'date') {
      setCompleteFilter(false);
      setTasks([...tasks].sort((a, b) => a.dueMonth - b.dueMonth || a.dueDate - b.dueDate));
    }
    if (e.target.value === 'complete') {
      setCompleteFilter(true);
    }
  };

  return (
  <div>
    <select onChange={handleFilterChange} >
      <option value='' >Choose sort filter..</option>
      <option value='priority'>Sort By Priority</option>
      <option value='date' >Sort By Due Date</option>
      <option value='complete'>Completetion Status</option>
    </select>
  </div>
  )
};

export default FilterTask;
