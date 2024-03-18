import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244' }
  ]) 
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
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

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => {return (<div key={person.name}>{person.name} {person.number}</div>)})}
    </div>
  )

}

export default App