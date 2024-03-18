import { useState } from 'react'

const Filter = ({filter, fun}) => {
  return (<div>filter shown with <input value={filter} onChange={fun}/></div>)
}

const Person = ({name, number}) => {
  return (<div>{name} {number}</div>)
}

const Persons = ({persons,filter}) => {
  return (
    persons
    .filter((person) => person.name
      .toLowerCase()
      .includes(filter.toLowerCase()))
    .map((person) => {
      return (
      <Person
        key={person.name}
        name={person.name}
        number={person.number}>
      </Person>
      )
    })
  )
}

const Form = ({addNewName,newName,newNumber,handleNameChange,handleNumberChange}) => {
  return (
    <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button
          type="submit"
          >add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addNewName = (event) => {
    event.preventDefault();
    if(!persons.map((o) => o.name).includes(newName)) {
      setPersons(persons.concat({name: newName, number: newNumber}))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewNumber('')
    setNewName('')
  }

  const [filter, setFilter] = useState('')
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} fun={handleFilter}></Filter>
      <h2>add a new</h2>
      <Form addNewName={addNewName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}></Form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}></Persons>
    </div>
  )

}

export default App