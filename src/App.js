import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
function App() {
  return (

    <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>

  );
}


export default App;
