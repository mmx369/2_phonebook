import React from 'react'

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => {
        return (
          <li key={person.name}>
            {person.name}{" "}
            {person.number}
          </li>
        );
      })}
    </div>)
}
export default Persons