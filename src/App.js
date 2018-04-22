import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'
import Palette from './Palette'

class Canvas extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    this.props.draw(this.canvas, ctx);
  }
  componentDidUpdate () {
    const ctx = this.canvas.getContext('2d')
    this.props.draw(this.canvas, ctx);
  }
  render () {
    const {width, height, onClick} = this.props;
    return <canvas
      onClick={onClick}
      ref={node => this.canvas = node}
      width={width}
      height={height}></canvas>
  }
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      x: null,
      y: null,
      color: 'red'
    }
    this.setColor = this.setColor.bind(this);
  }

  setColor (color) {
    this.setState({color, x: null, y: null})
  }
  render() {
    return (
      <div style={{margin: '10px'}}>
        <Palette onClick={this.setColor} />
        <Canvas
          width={500}
          height={500}
          onClick={(e) => {
            const x = e.pageX - e.target.offsetLeft
            const y = e.pageY - e.target.offsetTop
            console.log(x, y);
            this.setState({x, y})
          }}
          draw={(canvas, ctx) => {
            ctx.strokeRect(0, 0, canvas.width, canvas.height)
            const rects = 10;
            const rectWidth = canvas.width / rects;
            for (let i = 0; i < rects; i++) {
              const x = i * rectWidth;
              ctx.strokeRect(x, 0, rectWidth, rectWidth)
              
              for (let j = 0; j < rects; j++) {
                ctx.strokeRect(x, j * rectWidth, rectWidth, rectWidth)
              }
            }
            const x = rectWidth * Math.floor(this.state.x / rectWidth)
            const y = rectWidth * Math.floor(this.state.y / rectWidth)
            ctx.fillStyle = this.state.color;
            if (x && y)
              ctx.fillRect(x, y, rectWidth, rectWidth);
          }} />
      </div>
    );
  }
}

export default App;
