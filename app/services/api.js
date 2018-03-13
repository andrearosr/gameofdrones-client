import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://127.0.0.1:5000/api/v1') => {
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

  // ------
  // Interface
  // ------
  return {
    getWeapons,
  }
}

export default {
  create,
}
