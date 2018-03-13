import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://gofdrones.herokuapp.com/api/v1') => {
  // ------
  // Configuration
  // ------
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000,
  })

  // ------
  // Services
  // ------
  const getWeapons = () => api.get('/weapons')
  const getUsers = () => api.get('/users')
  const findOrCreateUser = ({ name }) => api.post('/users', { name })
  const addWin = ({ id }) => api.patch(`/users/${id}/win`)

  // ------
  // Interface
  // ------
  return {
    getWeapons,
    getUsers,
    findOrCreateUser,
    addWin,
  }
}

export default {
  create,
}
