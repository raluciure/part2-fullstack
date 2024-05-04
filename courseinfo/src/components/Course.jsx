const Header = (props) => {
    console.log(props)
    return (
        <h1>
            {props.course}
        </h1>
    )
}


const Part = (props) => {
    console.log(props)
    return (
        <p>{props.name} {props.exercises}</p>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <div>
            {props.parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    const initialValue = 0
    const totalExercises = props.parts.reduce((total, part) => total + part.exercises, initialValue);
    console.log(totalExercises)
    return (
        <p>
            <b>
                total of {totalExercises} exercises
            </b>
        </p>
    )
}


const Course = (props) => {
    console.log(props)
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course