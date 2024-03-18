const Header = (props) => {
  
  return <h1>{props.course}</h1>
}
const Content = ({course}) => {
  return (
    <div>
      <Header course={course.name}></Header>
      {course.parts.map((part) => {
        return (<Part key={part.name} part={part.name} exercises={part.exercises}></Part>)
      }) }
      <Total parts={course.parts}></Total>
      </div>
)}
const Part = (props) => {
  return (
    <p>
    {props.part} {props.exercises}
    </p>
  )
}
const Total = ({parts}) => {
  
  return <b>total of {parts.reduce((acc,cur) => acc+cur.exercises, 0)} exercises</b>}
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
      <Content course={course}></Content>
    </div>
  )
}

export default App