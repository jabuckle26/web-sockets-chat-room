import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.scss';
import { ChatRoom } from './components/layout/ChatRoom';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      {/* <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section> */}
      <ChatRoom></ChatRoom>
    </Fragment>
  </Router>
);

export default App;
