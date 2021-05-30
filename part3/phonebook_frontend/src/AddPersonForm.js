const AddPersonForm = ({newName,setNewName,newNum,setNewNum,handleSubmit,handleOnChange}) => {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Add new entry</h2>
        <div>
          <label htmlFor="name">Name: </label><input name="name" value={newName} onChange={handleOnChange(setNewName)} /><br/><br/>
          <label htmlFor="number">Number: </label><input name="number" value={newNum} onChange={handleOnChange(setNewNum)} />
        </div>
        <br/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default AddPersonForm