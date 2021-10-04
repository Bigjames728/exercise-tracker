import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-date-picker';




function CreateExercise () {
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  

  // For now, this seems to be working. Though I'm not sure why this worked and when I did it the way below it wouldn't map in my <select> element.. 
  // Everytime I type a key on my create new exercise form, my console logs are firing which isn't right..
  // I think this is due to using onChange. This rerenders with every input, so if I type 5 letters, it's 4 rerenders. onBlur is another option.
  // useEffect(() => {
  //   fetch('http://localhost:5000/users')
  //     .then((result) => {
  //       result.json().then((response) => {
  //         setUsers({
  //           users: response.map(user => user.username),
  //           username: response[0].username
  //         });
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }, [])
  // console.log(typeof users);
  // console.log(users);


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((result) => {
        result.json().then((response) => {
          setUsers(response);
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  console.log(typeof users);
  console.log(users);

  
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onDurationChange = (e) => setDuration(e.target.value);
  const onDateChange = (date) => setDate(date); // Got date picker to work by changing setDate from this *setDate({date});* to this *setDate(date);*
  

  const handleSubmit = e => {

    e.preventDefault();

    const data = {
        username,
        description,
        duration,
        date
    }

    console.log(data);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:5000/exercises/add', requestOptions)
      .then(response => response.json())
      .then(res => console.log(res))
      .catch(error => console.log("Error fetching and parsing data " + error))
    
    history.push('/');
  }

  return (
    <div>
      <h3>Create New Exercise</h3>
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
          <input 
              type="text"
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
          <div>
            <DatePicker
              value={date}
              onChange={onDateChange}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise!" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateExercise 

