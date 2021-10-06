import React, { useState } from 'react'
import { useHistory } from 'react-router';
export default function CreateUser() {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    async function handleSubmit (e) {

        e.preventDefault();
    
        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        })

        const data = await response.json()

        console.log(data.user);
        if(data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful!')
            window.location.href = '/';
        } else {
            alert('Please check your username and password.')
        }
        
        // history.push('/');
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
                <label>Password: </label>
                <input 
                    type="password"
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
