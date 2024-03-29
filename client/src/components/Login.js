import React, { useState } from 'react'
import { useHistory } from 'react-router';

export default function CreateUser() {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => setEmail(e.target.value);
    const onUsernameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    // This won't work until I build the /login endpoint
    const handleSubmit = e => {

        e.preventDefault();
    
        const loggedInUser = {
            email,
            username,
            password
        }
    
        console.log(loggedInUser);
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loggedInUser)
        };
        fetch('http://localhost:5000/users/login', requestOptions)
          .then(response => response.json())
          .then(res => console.log(res))
          .catch(error => console.log("Error fetching and parsing data " + error))
        
        // history.push('/test');
    }
    
    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group"> 
                <label>Email: </label>
                <input  type="email"
                    required
                    className="form-control"
                    value={email}
                    onChange={onEmailChange}
                    />
                </div>
                <br />
                <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={username}
                    onChange={onUsernameChange}
                    />
                </div>
                <br />
                <div className="form-group"> 
                <label>Password: </label>
                <input  type="password"
                    required
                    className="form-control"
                    value={password}
                    onChange={onPasswordChange}
                    />
                </div>
                <br />
                <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}