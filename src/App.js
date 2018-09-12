import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Conway's Game of Life powered by React.js</h1>
        </header>
        <p className="App-intro">
          <canvas id="life" height="640" width="640"></canvas>
        </p>
      </div>
    );
  }
}

export default App;
