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
const Total = (props) => {
  let sum = 0;
  props.parts.forEach(p =>  sum += p.exercises );
  return <p>Number of exercises {sum}</p>}
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