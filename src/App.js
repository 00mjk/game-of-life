import React, { Component } from 'react';
import LifeCanvas from './lifeCanvas';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LifeCanvas cellSize={10}
                    gridWidth={1000}
                    gridHeight={1000}
                    seedChanceOfLife={5}
                    updateInterval={500}></LifeCanvas>
      </div>
    );
  }
}

export default App;
