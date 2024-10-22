import React from 'react';

const Sort = ({ setSortOption }) => {
  return (
    <div className="sort">
      <label>Sort by: </label>
      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default Sort;
