const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const exercises = [{part: part1, exercises: exercises1},
     {part: part2, exercises: exercises2},
      {part: part3, exercises: exercises3}]

  return (
    <div>
      <Header course={course} />
      <Content props={exercises} />
      <Total props={exercises} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({ props }) => {
  return (
    <div>
      <p>
        {props[0].part} {props[0].exercises}
      </p>
      <p>
        {props[1].part} {props[1].exercises}
      </p>
      <p>
        {props[2].part} {props[2].exercises}
      </p>
    </div>

  )
}

const Total = ({ props }) => {
  return (
    <div>
      <p>Number of exercises {props[0].exercises + 
      props[1].exercises + 
      props[2].exercises}</p>
    </div>
  )
}

export default App