import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.scss';
import { GlobalProvider } from './context/GlobalState';
import { ChatRoom } from './components/layout/ChatRoom';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      {/* <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
        <Route exact path='/login' component={Landing} />
          <Route exact path='/chat' component={ChatWindow} />
        </Switch>
      </section> */}
      <GlobalProvider>
        <ChatRoom></ChatRoom>
      </GlobalProvider>
    </Fragment>
  </Router>
);

export default App;
