import { useState, useEffect }  from 'react'
import axios from 'axios';
import personServer from './service/server'

const Filter = ({filter, fun}) => {
  return (<div>filter shown with <input value={filter} onChange={fun}/></div>)
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const Person = ({name, number, id, doDelete}) => {
  return (<div>{name} {number}<button onClick={() => {doDelete(id)}}>delete</button></div>)
}

const Persons = ({persons,filter,doDelete}) => {
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
        number={person.number}
        id={person.id}
        doDelete={doDelete}>
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

  const [errorMessage, setErrorMessage] = useState({msg:'some error happened...',type:'error'})
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  useEffect(() => {personServer.getAll().then((res) => setPersons(res))}, [])
  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const setNotifyMessage = (msg,type) => {
    setErrorMessage({msg: msg, type: type})
    setTimeout(() => {setErrorMessage({msg: null, type: null})},5000)
  }

  const doDelete = (id) => {
    setNotifyMessage(`Deleted ${persons.find(p => p.id === id).name}`, 'delete');
    personServer.purge(id);
    setPersons(persons.filter(person => person.id !== id));
  }

  const addNewName = (event) => {
    event.preventDefault();
    if(!persons.map((o) => o.name).includes(newName)) {
      const newPerson = {name: newName, number: newNumber};
      personServer.create(newPerson).then((res) => setPersons(persons.concat(res)))
      setNotifyMessage(`Added ${newName}`, 'notify');
    } else {
      const promptReplace = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(promptReplace) {
        const newPerson = {name: newName, number: newNumber};
        const id = persons.filter((o) => o.name === newName)[0].id;
        personServer
          .update(id,newPerson)
          .then((res) => setPersons(persons.map(p => p.id !== id ? p : res)))
          setNotifyMessage(`Updated ${newName}`, 'notify');
      }
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
      <Notification message={errorMessage.msg} type={errorMessage.type}></Notification>
      <Filter filter={filter} fun={handleFilter}></Filter>
      <h2>add a new</h2>
      <Form addNewName={addNewName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}></Form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} doDelete={doDelete}></Persons>
    </div>
  )

}

export default App