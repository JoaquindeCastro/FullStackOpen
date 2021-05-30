import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const create = newObject => axios.post(baseUrl, newObject)

const deleteOne = id => axios.delete(`${baseUrl}/${id}`)

const update = updatedObject => axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)

const peopleService = {getAll, create, deleteOne, update}

export default peopleService