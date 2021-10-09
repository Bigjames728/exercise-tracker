import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/navbar';
import ExercisesList from './components/exercises-list';
import EditExercise from './components/edit-exercise';
import CreateExercise from './components/create-exercise';
import CreateUser from './components/create-user';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
          <br/>
            <Route path="/" exact component={ExercisesList} />
            <Route path="/edit/:id" exact component={EditExercise} />
            <Route path="/create" exact component={CreateExercise} />
            <Route path="/login" exact component={Login} />
            <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
