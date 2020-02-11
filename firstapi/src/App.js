import React, {useEffect, useState} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import EditForm from './EditForm'

function App() {

  const [users, setUser] = useState([{
    name: '',
    bio: ''
  }])

  const [id, setId] = useState('')

  const [update, setUpdate] = useState(false)

  console.log()

  useEffect(() => {
    axios
    .get('http://localhost:8888/api/users')
    .then(response => {
      console.log('api response', response)
      setUser(response.data)
    })
    .catch(error => {
      console.log("error", error)
    })

  }, [update])

console.log(users)
console.log(id)
 
return (
    <div className="App">
    
      {users.map(user => {
       return (
         <>
           <h4 key={user.id}>{user.name}
           </h4>
           <button onClick={() => setId(user.id)}>Edit</button>
         </>
       )
     })} 
     <Form setUpdate={setUpdate} update={update}  id={id}/>
     <EditForm setUpdate={setUpdate} update={update}  id={id}/> 
    </div>
    
  );
}

export default App;
