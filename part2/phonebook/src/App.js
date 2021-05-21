import React, { useState } from 'react';
import Filter from './Filter.js';
import AddPersonForm from './AddPersonForm.js';
import People from './People.js';

const App = () => {
  const [people, setPeople] = useState([
    { id: 0, name: 'Arto Hellas', number: '040-123456' },
    { id: 1, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 2, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 3, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')

  const names = people.map(e => e.name)
  const peopleToShow = filter
  ? people.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
  : people

  const handleOnChange = setVal => event => {
    setVal(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(names)
    if (names.includes(newName)){
      alert(`${newName} already in PhoneBook`)
    } else{
      const newPerson = {id:people.length+1,name:newName,number:newNum}
      setPeople(
        people.concat(newPerson)
      )
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <AddPersonForm newName={newName} setNewName={setNewName} newNum={newNum} setNewNum={setNewNum} handleSubmit={handleSubmit} handleOnChange={handleOnChange} />

      <h2>Numbers</h2>

      <Filter filter={filter} setFilter={setFilter} handleOnChange={handleOnChange} />
  
      <People people={peopleToShow} />
    </div>
  )
}

export default App