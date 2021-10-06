import React, { useState } from 'react'
import { useHistory } from 'react-router';
export default function CreateUser() {

    let history = useHistory();

    const [username, setUsername] = useState('');

    const onUsernameChange = (e) => setUsername(e.target.value);

    const handleSubmit = e => {

        e.preventDefault();
    
        const newUser = {
            username
        }
    
        console.log(newUser);
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        };
        fetch('http://localhost:5000/users/register', requestOptions)
          .then(response => response.json())
          .then(res => console.log(res))
          .catch(error => console.log("Error fetching and parsing data " + error))
        
        history.push('/');
      }
    
    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={username}
                    onChange={onUsernameChange}
                    />
                </div>
                <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

