import personService from '../services/persons'

const Persons = ({ persons, setPersons }) => {

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
          personService
            .deletePerson(id)
            .then(() => {
              setPersons(persons.filter(person => person.id !== id));
            })
            .catch(error => {
              console.error('Error deleting person ', error);
            });
        }
      };

    console.log(persons)
    return (
        <div>
            {persons.map(person =>
                <div key={person.id}>
                    <p>{person.name} {person.number}</p>
                    <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                </div>
            )}
        </div>
    );
};

export default Persons