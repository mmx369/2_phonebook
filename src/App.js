import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/service'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    phonebookService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [update])

  const addName = (event) => {
    event.preventDefault();
    const isName = persons.some((el) => el.name === newName)

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (isName) {
      window.alert(`${newName} is already added to phonebook, replace the old number with a new one`);
      const findId = persons.filter((el) => {
        return el.name === newName
      })
      const id = findId[0].id
      phonebookService.update(id, nameObject)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${findId[0].name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      setUpdate(!update)
      setNewName('');
      setNewNumber('');
    } else {
      phonebookService.create(nameObject).then(response => {
        console.log(response)
      })
      setNewName('');
      setNewNumber('');
      setUpdate(!update)
      setMessage(
        `Added ${newName}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleDelete = (event) => {
    const name = event.target.value
    const id = persons.filter((el) => el.name === name)
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.deleteEntry(id[0].id)
        .then(res => console.log(res))
        .catch(error => {
          setErrorMessage(
            `Information of '${name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setUpdate(!update)
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    console.log(event.target.value);
  };

  const handleNameSearch = (event) => {
    setNewSearch(event.target.value);
    console.log(event.target.value);
  };

  const filteredPersons = persons.filter((elem) => {
    return (
      elem.name.substr(0, newSearch.length).toLowerCase() ===
      newSearch.toLowerCase()
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} styleMessage={'added'} />
      <Notification message={errorMessage} styleMessage={'error'} />
      <Filter newSearch={newSearch} handleNameSearch={handleNameSearch} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
}


export default App;
