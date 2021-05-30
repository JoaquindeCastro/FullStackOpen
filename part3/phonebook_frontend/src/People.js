const People = ({people, handleDelete}) => {
    return (
      <table>
        <tbody>
        {people.map(e => 
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.number}</td>
            <td><button onClick={() => handleDelete(e.id)}>Delete</button></td>
          </tr>
        )}
        </tbody>
      </table>
    )
}

export default People