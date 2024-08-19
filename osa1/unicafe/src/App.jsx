import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => {
    setGood(good + 1)
    console.log('good:', good)
  }

  const giveNeutral = () => {
    setNeutral(neutral + 1)
    console.log('neutral:', neutral)
  }

  const giveBad = () => {
    setBad(bad + 1)
    console.log('bad:', bad)
  }

  return (
    <div>
      <Header title="give feedback" />
      <Button handleClick={giveGood} text="good" />
      <Button handleClick={giveNeutral} text="neutral" />
      <Button handleClick={giveBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        <Header title="statistics" />
        No feedback given
      </div>
    )
  }
  const average = (good - bad) / total
  const positive = 100 * (good / total)

  return (
    <div>
      <Header title="statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )  
}

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

export default App