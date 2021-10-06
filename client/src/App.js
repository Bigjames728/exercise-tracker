import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/navbar';
import Dashboard from './components/dashboard';
import EditExercise from './components/edit-exercise';
import CreateExercise from './components/create-exercise';
import CreateUser from './components/create-user';
import Login from './components/login-user';

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
          <br/>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route path="/login" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/edit/:id" exact component={EditExercise} />
            <Route path="/create" exact component={CreateExercise} />
            <Route path="/register" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
