const Header = (props) => {
  
  return <h1>{props.course}</h1>
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}></Part>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}></Part>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}></Part>
      </div>
)}
const Part = (props) => {
  return (
    <p>
    {props.part} {props.exercises}
    </p>
  )
}
const Total = (props) => {return <p>Number of exercises {props.sum}</p>}
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
      <Header course={course}></Header>
      <Content parts={[part1,part2,part3]}></Content>
      <Total sum={part1.exercises,part2.exercises,part3.exercises}></Total>
    </div>
  )
}

export default App