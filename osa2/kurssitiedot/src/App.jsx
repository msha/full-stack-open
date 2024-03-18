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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      {courses.map((course) => {
        return (<Content key={course.id} course={course}></Content>)
      })}
    </div>
  )
}

export default App