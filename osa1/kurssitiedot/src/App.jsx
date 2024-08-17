const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content props={course.parts} />
      <Total props={course.parts} />
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
      {props.map((part, index) => (
        <Part props={part} key={index} />
      ))}
    </div>
  )
}

const Total = ({ props }) => {
  const exs = props.map(part => part.exercises)
  const sum = exs.reduce((acc, cur) => acc + cur)
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const Part = ({ props }) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

export default App