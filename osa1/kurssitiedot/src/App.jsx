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
const Total = (props) => {
  let sum = 0;
  props.parts.forEach(p =>  sum += p.exercises );
  return <p>Number of exercises {sum}</p>}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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


  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  )
}

export default App