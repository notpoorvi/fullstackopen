import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchVal, setSearchVal] = useState("");

  const addNameNumber = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.filter((person) => person.name == newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      setNewNumber("");
      setNewName("");
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
      <span>filter shown with </span>
      <input type="text" value={searchVal} onChange={handleSearchValChange} />
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {persons
        .filter(
          (person) =>
            searchVal === "" ||
            person.name.toLowerCase().includes(searchVal.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      {searchVal === ""
        ? persons.map((person) => (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          ))
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(searchVal.toLowerCase())
            )
            .map((person) => (
              <div key={person.name}>
                {person.name} {person.number}
              </div>
            ))}
    </div>
  );
};

export default App;
