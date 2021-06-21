import React from 'react';
import './App.css';
import Checkout from './features/checkout';
import { UserContextProvider } from './features/checkout/context/UserContext'

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Checkout />
      </UserContextProvider>
    </div>
  );
}

export default App;
