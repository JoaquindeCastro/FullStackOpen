const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const exercises = course.parts.map(part => part.exercises)
    const sum = exercises.reduce((s,v) => s+v)
  
    return(
      <em>Total Exercises: {sum}</em>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part part={part} key={part.name}/>)}
      </div>
    )
  }
  
  const Course = ({ course }) => {
      return (
          <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        )
  }

  export default Course