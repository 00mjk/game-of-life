import React, { Component } from 'react';
import * as Utils from './lifeUtils';

class LifeCanvas extends Component {
    constructor(props) {
      super(props);
      this.canvasUpdateIntervalID = null;
      let numRows = this.props.gridHeight / this.props.cellSize;
      let numColumns = this.props.gridWidth / this.props.cellSize;
      this.state = {
        grid: Utils.getInitialRandomGrid(numRows, numColumns, this.props.seedChanceOfLife)
      };
    }
  
    componentDidMount() {
      this.renderInitialCanvas();
      this.canvasUpdateIntervalID = setInterval(this.renderCanvas.bind(this), this.props.updateInterval);
    }
  
    componentWillUnmount() {
      clearInterval(this.canvasUpdateIntervalID);
    }
  
    renderInitialCanvas() {
      this.drawCells();
    }
  
    renderCanvas() {
      this.setState(
        (oldState, props) => {
          return {grid: Utils.getNextGrid(oldState.grid)}
        },
        () => this.drawCells()
      );
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
  }

  export default LifeCanvas;