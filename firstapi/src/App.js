import React, {useEffect, useState} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import Form from './Form'

function App() {

  const [users, setUser] = useState([{
    name: '',
    bio: ''
  }])

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
 
return (
    <div className="App">
    
      {users.map(user => {
       return (
         
           <h4 key={users.id}>{user.name}</h4>
         
       )
     })} 
     <Form setUpdate={setUpdate} update={update}/>
    </div>
    
  );
}

export default App;
