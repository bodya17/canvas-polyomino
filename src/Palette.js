import React from 'react'

const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'magenta']

const Palette = ({onClick}) => (
  <ul>
    {colors.map(color => <li
      key={color}
      onClick={() => onClick(color)}
      style={{background: color, height: '30px'}}
    >{color}</li>)}
  </ul>
)

export default Palette