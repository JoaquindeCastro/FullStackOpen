const People = ({people}) => {
    return (
      <table>
        <tbody>
        {people.map(e => 
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.number}</td>
          </tr>
        )}
        </tbody>
      </table>
    )
}

export default People