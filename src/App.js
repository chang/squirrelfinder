import React, { Component } from 'react';
import './App.css';
import MainMapSection from './Components/MainMapSection.js';
import NavBar from './Components/NavBar.js';
import Footer from './Components/Footer.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSquirrel: null,
      dataCardVisible: true,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e, v) {
    this.setState({
      currentSquirrel: v.value
    });
    console.log(this.state);
    this.flipDataCard()
  }

  flipDataCard() {
    const duration = 250;
    this.setState({dataCardVisible: false});
    setTimeout(() => {
      this.setState({dataCardVisible: true});
    }, duration);
  }

  render() {
    return (
      <div className="App">
        <div className="Main">
          <NavBar handleChange={this.handleSearchChange}/>
          <MainMapSection visible={this.state.dataCardVisible} squirrelName={this.state.currentSquirrel}/>
        </div>
        <div className="Footer">
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
