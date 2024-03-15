import { useState } from 'react'

const Button = ({state, func, name}) => {
  return (<button onClick={func}>{name}</button>)
}

const Header = () => {
  return (<h1>give feedback</h1>)
}

const StatisticLine = ({text,count}) => {
  return (<tr><td>{text}</td><td>{count}</td></tr>)
}

const Statistics = ({good,neutral,bad}) => {
  if(good || neutral ||bad) {
  return (<div><h1>Statistics</h1>
  <table>
  <tbody>
  <StatisticLine text="good" count={good}></StatisticLine>
  <StatisticLine text="neutral" count={neutral}></StatisticLine>
  <StatisticLine text="bad" count={bad}></StatisticLine>
  <tr><td>all</td><td>{(good+neutral+bad)}</td></tr>
  <tr><td>average</td><td>{(good - bad)/(good+neutral+bad)}</td></tr>
  <tr><td>positive</td><td>{((good)/(good+neutral+bad))*100} %</td></tr>
  </tbody>
  </table>

  </div>
  )
  } else {
  return (<div><h1>Statistics</h1>No feedback given</div>)
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header></Header>
      <Button name="good" func={() => {setGood(good+1)}}></Button>
      <Button name="neutral" func={() => {setNeutral(neutral+1)}}></Button>
      <Button name="bad" func={() => {setBad(bad+1)}}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App