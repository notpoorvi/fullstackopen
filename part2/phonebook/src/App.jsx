import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Filter = ({ searchVal, handleSearchValChange }) => {
  return (
    <>
      <span>filter shown with </span>
      <input type="text" value={searchVal} onChange={handleSearchValChange} />
    </>
  );
};

const PersonForm = ({
  addNameNumber,
  newName,
  newNumber,
  handleNameChange,
  handleNumChange,
}) => {
  return (
    <>
      <form onSubmit={addNameNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = ({ persons, searchVal, handleDelete }) => {
  return (
    <>
      {persons
        .filter(
          (person) =>
            searchVal === "" ||
            person.name.toLowerCase().includes(searchVal.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    personService.getAll("http://localhost:3001/persons").then((personData) => {
      setPersons(personData);
    });
  }, []);

  const addNameNumber = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const duplicate = persons.find((person) => person.name === newName);
    if (duplicate) {
      if (duplicate.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
        setNewNumber("");
        setNewName("");
        return;
      } else {
        if (
          window.confirm(
            `${duplicate.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          personService
            .update(duplicate.id, personObject)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id === duplicate.id ? returnedPerson : person
                )
              );
            });
        }
        setNewName("");
        setNewNumber("");
        return;
      }
    }
    personService.create(personObject).then((responseData) => {
      setPersons(persons.concat(responseData));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchValChange = (event) => {
    setSearchVal(event.target.value);
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      const newPersons = persons.filter((person) => person !== personToDelete);
      personService.deletePerson(id);
      setPersons(newPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchVal={searchVal}
        handleSearchValChange={handleSearchValChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addNameNumber={addNameNumber}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchVal={searchVal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
