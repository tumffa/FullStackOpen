import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
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
      <Button props={{ handleClick: giveGood, text: 'good' }} />
      <Button props={{ handleClick: giveNeutral, text: 'neutral' }} />
      <Button props={{ handleClick: giveBad, text: 'bad' }} />
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
      <StatisticLine text="good" value={good} /><br />
      <StatisticLine text="neutral" value={neutral} /><br />
      <StatisticLine text="bad" value={bad} /><br />
      <StatisticLine text="all" value={total} /><br />
      <StatisticLine text="average" value={average} /><br />
      <StatisticLine text="positive" value={positive}/> %<br />
    </div>
  )  
}

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ props }) => { 
  console.log('props:', props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => <>{text} {value}</>

export default App