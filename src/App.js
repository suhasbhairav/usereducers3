import React, {useState, useReducer} from 'react';
import './App.css';

const initialState = [{
  id: Date.now(),
  name: "ABC",
  email: "a@a.com"
}];

function reducer (state, action){
  switch (action.type) {
    case "add":      
      return [...state, action.payload];
  
    case "delete":
      return state.filter(contact => {
        return contact.id !== action.payload.id;
      });
    default:
      break;
  }
};


function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [state, dispatch] = useReducer(reducer, initialState);

  const addContact = (e) => {
    e.preventDefault();

    dispatch({
      type: "add",
      payload: {
        id: Date.now(),
        name,
        email
      }
    });
  };

  return (
    <div className="App">
       <form onSubmit={addContact}>
          <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Add Contact</button>
       </form>
      <div>
        {state.map(contact => {
          return(
            <div key={contact.id}>
              <h1>{contact.name}</h1>
              <h2>{contact.email}</h2>
              <button onClick={() => dispatch({type: "delete", payload: {id: contact.id}})}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
