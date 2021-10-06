import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';



export default function Dashboard() {

    const history = useHistory();

    const [exercises, setExercises] = useState([]);

    async function getExercises () {
        const req = await fetch('http://localhost:5000/exercises', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        });
        const data = req.json()
        if(data.status === 'ok') {
            setExercises(data.exercise)
        } else {
            alert(data.error)
        }
        console.log(data);
        
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            console.log(user)
            if(!user) {
                localStorage.removeItem('token')
                history.replace('/login')
            } else {
                getExercises();
            }
        }
    }, []) 


    


    function deleteExercise(_id){
        console.log(_id);
        fetch(`http://localhost:5000/exercises/${_id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                getExercises();
            })
        })
    }


    return (
        
        <div>
            <h3>Logged Exercises</h3>
            <table className="table table-striped">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    exercises.map(exercise => {
                        return  <tr key={exercise._id}>
                                    <td width="10%">{exercise.username}</td>
                                    <td width="55%">{exercise.description}</td>
                                    <td width="10%">{exercise.duration}</td>
                                    <td width="10%">{exercise.date.substring(0,10)}</td>
                                    <td width="10%">
                                        <Link to={`/edit/${exercise._id}`}>edit</Link> | <a href="/" onClick={() => { deleteExercise(exercise._id) }}>delete</a>
                                    </td>
                                </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

