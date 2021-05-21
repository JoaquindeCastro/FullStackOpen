const Filter = ({filter,setFilter,handleOnChange}) => {
    return (
      <form>
        <label htmlFor="filter"><em>Filter by name: </em></label><input name="filter" value={filter} onChange={handleOnChange(setFilter)} /><br/><br/>
      </form>
    )
}

export default Filter