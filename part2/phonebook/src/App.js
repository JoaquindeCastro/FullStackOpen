import React, { useState, useEffect } from 'react';
import peopleService from './services/people.js';
import Filter from './Filter.js';
import AddPersonForm from './AddPersonForm.js';
import People from './People.js';
import { Success, Error } from './Notifications.js';

const App = () => {
  const [people, setPeople] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')

  const [successMessage, setSuccess] = useState('')
  const [errorMessage, setError] = useState('')

  const messageDuration = 3000;

  const setSuccessMessage = message => {
    setSuccess(message)
    setTimeout(() => setSuccess(''),messageDuration)
  }

  const setErrorMessage = message => {
    setError(message)
    setTimeout(() => setError(''),messageDuration)
  }

  useEffect(() => {
    peopleService
      .getAll()
      .then(response => {
        setPeople(response.data)
      })
  }, [])

  const names = people.map(e => e.name)
  const peopleToShow = filter
  ? people.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
  : people

  const handleOnChange = setVal => event => {
    setVal(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (names.includes(newName)){
      const confirmUpdate = 
        window.confirm(`${newName} is already in PhoneBook, do you want to update the ${newName}'s number to ${newNum}?`)
      if (confirmUpdate){
        const personToUpdate = people.find(p => p.name === newName)
        const updatedPerson = {...personToUpdate, number:newNum}
        peopleService
          .update(updatedPerson)
          .then(res => {
            setPeople(
              people.map(p => p.id !== updatedPerson.id ? p : res.data),
              setSuccessMessage(`Successfully updated ${updatedPerson.name}'s number to ${newNum}.`)
            )
          })
          .catch(err => alert(`Error: ${err}`))
      }
    } else{
      const newPerson = {name:newName,number:newNum}
      peopleService
      .create(newPerson)
      .then(response => {
        setPeople(people.concat(response.data))
        setSuccessMessage(`Successfully added ${newName}.`)
      })
      .catch(err => alert(err))
    }
  }

  const handleDeleteOf = id => {
    const nameToDelete = people.find(p => p.id===id).name
    console.log(nameToDelete)
    const confirmDelete = 
      window.confirm(`Are you sure you want to delete entry '${nameToDelete}?'`)
    if (confirmDelete){
      peopleService
      .deleteOne(id)
      .then(res => {
        setSuccessMessage(`successfully deleted entry '${nameToDelete}'`)
      })
      .catch(err => setErrorMessage(`Entry ${nameToDelete} has already been removed from the database. Kindly refresh the browser to see updates.`))
      setPeople(people.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {successMessage
      ? <Success message={successMessage} />
      : errorMessage
      ? <Error message={errorMessage} />
      : null   
      }

      <AddPersonForm newName={newName} setNewName={setNewName} newNum={newNum} setNewNum={setNewNum} handleSubmit={handleSubmit} handleOnChange={handleOnChange} />

      <h2>Numbers</h2>

      <Filter filter={filter} setFilter={setFilter} handleOnChange={handleOnChange} />
  
      <People people={peopleToShow} handleDelete={handleDeleteOf} />
    </div>
  )
}

export default App