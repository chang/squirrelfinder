import React, { Component } from 'react';
import './App.css';
import MainMapSection from './components/MainMapSection.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';

import squirrelData from './assets/squirrelData.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSquirrel: null,
      dataCardVisible: true,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFamilyLabelClick = this.handleFamilyLabelClick.bind(this);
    this.handlePopupClick = this.handlePopupClick.bind(this);
  }

  handleSearchChange(e, v) {
    const newSquirrel = v.value;
    if (newSquirrel != this.state.currentSquirrel) {
      this.setStateWithFlipTransition({
        currentSquirrel: newSquirrel
      });
    }
  }

  // Event handler for a label click.
  handleFamilyLabelClick(e, v) {
    const clickedSquirrelName = v["children"][1];
    if (squirrelData.hasOwnProperty(clickedSquirrelName)) {
      this.setStateWithFlipTransition({
        currentSquirrel: clickedSquirrelName
      });
    }
  }

  handlePopupClick(e, v) {
    this.setStateWithFlipTransition({ currentSquirrel: v.squirrel })
  }

  setStateWithFlipTransition(newState) {
    this.setState({dataCardVisible: false});
    setTimeout(() => {
      this.setState(newState);
      this.setState({dataCardVisible: true});
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <div className="Main">
          <NavBar handleChange={this.handleSearchChange}/>
          <MainMapSection
            handleLabelClick={this.handleFamilyLabelClick}
            handlePopupClick={this.handlePopupClick}
            visible={this.state.dataCardVisible}
            squirrelName={this.state.currentSquirrel}
          />
        </div>
        <div className="Footer">
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
