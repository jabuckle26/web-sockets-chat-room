import React, { useContext } from 'react';
import { GlobalProvider } from './context/GlobalState';
import Navbar from './components/layout/Navbar';
import './App.scss';
import { ChatRoom } from './components/layout/ChatRoom';

const App = () => {
  return(
      <>
      <Navbar />
        <GlobalProvider>
          <ChatRoom></ChatRoom>
        </GlobalProvider>
    </>
  )

};

export default App;
