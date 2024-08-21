import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const personId = persons.find(person => person.name === newName).id
          personService
          .changeNumber(personId, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== personId ? person : returnedPerson))
            }
          )
         }
        }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          }
        )
    }
    setNewName('')
    setNewNumber('')
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleFilterChange={handleFilterChange}
        filter={filter}
      />
      <AddNewPerson
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Numbers
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

const Filter = ({ handleFilterChange, filter }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleFilterChange} value={filter} />
    </div>
  )
}

const AddNewPerson = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
          <br />
          number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Numbers = ({ persons, filter, handleDelete }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person) =>
        <div key={person.id}>
          <Person 
            name={person.name} 
            number={person.number}
          />
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
        )
      }
    </div>
  )
}

const Person = ({ name, number }) => <>{name} {number}</>

export default App