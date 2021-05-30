const Capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

export const Success = ({ message }) => {
  if (message === null) {
    return null
  }
  const style = {
    color: "green",
    background: "lightgreen",
    fontSize: 18,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={style}>
      {Capitalize(message)}
    </div>
  )
}

export const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  const style = {
    color: "red",
    background: "#FFCCCC",
    fontSize: 18,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={style}>
    {Capitalize(message)}
    </div>
  )
}