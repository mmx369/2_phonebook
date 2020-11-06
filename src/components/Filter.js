import React from 'react';

const Filter = ({ newSearch, handleNameSearch }) => {
  return (
    <div>
      find person: <input value={newSearch} onChange={handleNameSearch} />
    </div>
  );
};
export default Filter;
