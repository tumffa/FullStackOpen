import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <b>total of {course.parts.reduce
      ((sum, part) => sum + part.exercises, 0)} exercises</b>
    </div>
  )
}

export default Course