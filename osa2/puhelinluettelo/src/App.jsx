import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } 
    else {
      setPersons(persons.concat(
        {name: newName,
         number: newNumber}
        )
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
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Numbers persons={persons} filter={filter}/>
    </div>
  )

}

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input onChange={props.handleFilterChange}
      value={props.filter}>
      </input>
    </div>
  )
}

const AddNewPerson = (props) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={props.addName}>
        <div>
          name: 
          <input 
            value={props.newName}
            onChange={props.handleNameChange}
          />
          <br />
          number:
          <input 
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Numbers = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person, index) => 
      <Person key={index} name={person.name} 
      number={person.number}/>
      )}
    </div>
  )
}

const Person = ({ name, number }) => <p>{name} {number}</p>

export default App