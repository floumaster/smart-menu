import React from 'react'
import './App.css';
import StartPage from './startPage/StartPage'
import Menu from './menu/Menu'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { UserContextProvider } from './context/userContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage/>} />
            <Route path="menu" element={<Menu />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
