import React from 'react';

const Filter = ({ setGrouping }) => {
  return (
    <div className="filter">
      <label>Group by: </label>
      <select onChange={(e) => setGrouping(e.target.value)}>
        <option value="status">Status</option>
        <option value="assigned_to">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default Filter;
