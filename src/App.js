import React, { Component } from 'react';
import LifeCanvas from './lifeCanvas';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LifeCanvas cellSize={4}
                    gridWidth={800}
                    gridHeight={800}
                    seedChanceOfLife={10}
                    updateInterval={150}></LifeCanvas>
      </div>
    );
  }
}

export default App;
