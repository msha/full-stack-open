const Header = (props) => {
  
    return <h1>{props.course}</h1>
  }
  const Course = ({course}) => {
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

export default Course