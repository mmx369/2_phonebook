import React from 'react'

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map((person) => {
        return (
          <li key={person.id}>
            {person.name}{" "}
            {person.number}{" "}
            <button value={person.name} onClick={handleDelete} >delete</button>
          </li>
        );
      })}
    </div>)
}
export default Persons