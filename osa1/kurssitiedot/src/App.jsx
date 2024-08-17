const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  

  return (
    <div>
      <Header course={course} />
      <Content props={[part1, part2, part3]} />
      <Total props={[part1, part2, part3]} />
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
      <Part props={props[0]} />
      <Part props={props[1]} />
      <Part props={props[2]} />
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

const Part = ({ props }) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

export default App