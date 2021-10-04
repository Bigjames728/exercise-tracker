import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import DatePicker from 'react-date-picker';

export default function EditExercise(props) { // By passing props into the function, I could access props.match.params.id for my fetch calls.

    // Wasn't working due to forgetting to update the mothod from POST to PUT in my handleSubmit function.

    let history = useHistory();

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const id = props.match.params.id;
        
        fetch(`http://localhost:5000/exercises/${id}`)
          .then((response) => {
            response.json().then((response) => {
                setUsername(response.username)
                setDescription(response.description)
                setDuration(response.duration)
                setDate(new Date(response.date))
                console.log(response)
            })
          })
          .catch((error) => {
            console.log(error);
          })

        fetch('http://localhost:5000/users')
            .then((result) => {
                result.json().then((response) => {
                    setUsers(response);
                })
            })
            .catch((error) => {
            console.log(error);
            })
    }, [props.match.params.id])

    const onUsernameChange = (e) => setUsername(e.target.value);
    const onDescriptionChange = (e) => setDescription(e.target.value);
    const onDurationChange = (e) => setDuration(e.target.value);
    const onDateChange =(date) => setDate(date);

    const handleSubmit = e => {

        e.preventDefault();
    
        const editedExercise = {
            username,
            description,
            duration,
            date,
            users
        }
    
        console.log(editedExercise);

        const id = props.match.params.id;
    
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editedExercise)
        };
        fetch(`http://localhost:5000/exercises/update/${id}`, requestOptions)
          .then(response => response.json())
          .then(res => console.log(res))
          .catch(error => console.log("Error fetching and parsing data " + error))
        
        history.push('/');
    }

    return (
        <div>
            <h3>Edit Exercise</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <select
                            required
                            className="form-control"
                            value={username}
                            onChange={onUsernameChange}>
                            <option value="" disabled hidden>Choose a Username..</option>
                                {
                                    users && (users.map(user => <option key={user._id} value={user.username}>{user.username}</option>))
                                }
                    </select>
                </div>
                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onDescriptionChange}
                        />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={duration}
                        onChange={onDurationChange}
                        />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <DatePicker
                        value={date}
                        onChange={onDateChange}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

