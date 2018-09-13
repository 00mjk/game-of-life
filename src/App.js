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
          <LifeCanvas cellSize={10}
                      gridWidth={640}
                      gridHeight={640}
                      seedChanceOfLife={5}
                      updateInterval={500}></LifeCanvas>
        </p>
      </div>
    );
  }
}

class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasUpdateIntervalID = null;
    this.state = {
      grid: this.getInitialRandomGrid()
    };
  }

  componentDidMount() {
    this.renderInitialCanvas();
    this.canvasUpdateIntervalID = setInterval(this.renderCanvas.bind(this), this.props.updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.canvasUpdateIntervalID);
  }

  render() {
    return (
      <canvas id="life"
              className="life"
              height={this.props.gridHeight}
              width={this.props.gridWidth}
              ref={(elem) => this.canvasElem = elem}>
        Unfortunately, you're using an unsupported browser. :(
      </canvas>
    );
  }

  renderInitialCanvas() {
    this.drawCells();
  }

  renderCanvas() {
    this.setState({grid: this.getNextGrid()}, () => this.drawCells());
  }

  drawCells() {
    const canvasContext = this.canvasElem.getContext('2d');
    canvasContext.clearRect(0, 0, this.props.gridWidth, this.props.gridHeight);
    this.state.grid.forEach((row, rowNum) => {
      row.forEach((cell, colNum) => {
        if (!cell) {
          return;
        }
        canvasContext.fillRect(
          rowNum * this.props.cellSize,
          colNum * this.props.cellSize,
          this.props.cellSize,
          this.props.cellSize
        );
      })
    })
  }

  getNextGrid() {
    let grid = this.getEmptyGrid();
    return grid.map((row, x) => {
      return row.map((cell, y) => {
        return this.getNewCellState(x, y);
      })
    });
  }

  getNewCellState(x, y) {
    let isPopulated = this.state.grid[x][y];
    let populatedNeighbours = this.getPopulatedNeighbours(x, y);
    if (!isPopulated) {
      return populatedNeighbours.length === 3;
    }
    return [2, 3].includes(populatedNeighbours.length);
  }

  getPopulatedNeighbours(x, y) {
    return [
      this.state.grid[x - 1] && this.state.grid[x - 1][y - 1],
      this.state.grid[x - 1] && this.state.grid[x - 1][y],
      this.state.grid[x - 1] && this.state.grid[x - 1][y + 1],
      this.state.grid[x][y - 1],
      this.state.grid[x][y + 1],
      this.state.grid[x + 1] && this.state.grid[x + 1][y - 1],
      this.state.grid[x + 1] && this.state.grid[x + 1][y],
      this.state.grid[x + 1] && this.state.grid[x + 1][y + 1]
    ].filter(Boolean);
  }

  getInitialRandomGrid() {
    return this.randomize(this.getEmptyGrid());
  }

  getEmptyGrid() {
    let numRows = this.props.gridHeight / this.props.cellSize;
    let numColumns = this.props.gridWidth / this.props.cellSize;
    return Array(numRows).fill(false).map(() => new Array(numColumns).fill(false));
  }

  randomize(grid) {
    return grid.map((row) => {
      return row.map((cell) => {
        return Math.random() * 100 <= this.props.seedChanceOfLife;
      });
    });
  }
}

export default App;
