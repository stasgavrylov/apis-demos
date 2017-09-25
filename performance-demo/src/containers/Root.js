import React, { Component } from 'react'
import styled from 'styled-components'
import { checkPerf } from "../utils"

const numbers = Array.from({ length: 100 }).map(_ => Array.from({ length: 100 }).map(() => Math.random().toFixed(2)));

const TCell = styled.td`
  background-color: ${props => `rgba(0, 255, 0, ${props.alpha})`}
`

class Root extends Component {
  componentDidMount() {
    // setTimeout is needed here, because componentDidMount runs before first paint event
    // sometimes with a delay over 1000 ms (depends on rendered component size)
    setTimeout(() => {
      console.log('First Paint')
      console.dir(performance.getEntriesByType('paint')[0])
    }, 2000)
  }

  @checkPerf
  renderStyledTable() {
    return (
      <table>
        <tbody>
        {numbers.map((arr, i) => (
          <tr key={i}>
            {arr.map((num, i) => (
              <TCell key={num+i} alpha={num}>{num}</TCell>
            ))}
          </tr>
        ))}
        </tbody>
      </table>);
  }

  @checkPerf
  renderTable() {
   return (
     <table>
       <tbody>
         {numbers.map((arr, i) => (
           <tr key={i}>
             {arr.map((num, i) => (
               <td style={{backgroundColor: `rgba(255, 0, 0, ${num})`}} key={i}>{num}</td>
             ))}
           </tr>
         ))}
      </tbody>
    </table>);
  }

  render() {
    return (
      <div>
        <h1 className='welcome-header'>Welcome to Performance API!</h1>
        {/*{this.renderTable()}*/}
        {this.renderStyledTable()}
      </div>
    )
  }
}

export default Root