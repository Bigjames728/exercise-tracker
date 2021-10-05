import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';



export default function ExercisesList() {

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        getExercises();
    }, []) 


    async function getExercises () {
        const response = await fetch('http://localhost:5000/exercises');
        const body = await response.json()
        // console.log(body);
        setExercises(body);
    }


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

