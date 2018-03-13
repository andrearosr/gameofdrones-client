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

  // ------
  // Interface
  // ------
  return {
    getWeapons,
    getUsers,
  }
}

export default {
  create,
}
