import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import SuccessNotification from './components/SuccessNotification';
import personService from './services/persons'
import ErrorNotification from './components/ErrorNotification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch((e) => console.log(e));
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const isPersonAdded = persons.some(person => person.name === newName);

    if (isPersonAdded) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      const id = person.id
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNotificationMessage(
              `'${returnedPerson.name}' added`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log("Error reached!")
            console.log(error.response.data.error)
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== id))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          if (returnedPerson) {
            setPersons(persons.concat(returnedPerson))
            setNotificationMessage(`${returnedPerson.name} added`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          } else {
            setErrorMessage('An error occurred while adding the person. Check that the name and number are both defined and that the name has at least 3 characters and the number is at least 8 characters long and formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers.');
            setTimeout(() => {
              setErrorMessage(null)
            }, 30000)
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage('An error occurred while adding the person. Check that the name and number are both defined and that the name has at least 3 characters and the number is at least 8 characters long and formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers.');
          }
          setTimeout(() => {
            setErrorMessage(null)
          }, 30000)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchedName = (event) => {
    console.log(event.target.value)
    setSearchedName(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchedName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter searchedName={searchedName} handleChange={handleSearchedName} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  )
}

export default App