import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainMapSection from './Components/MainMapSection.js';
import NavBar from './Components/NavBar.js';
import Footer from './Components/Footer.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Main">
          <NavBar/>
          <MainMapSection/>
        </div>
        <div className="Footer">
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
