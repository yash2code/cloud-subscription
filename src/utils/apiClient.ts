import axios from 'axios'

const APIClient = axios.create({
  baseURL: 'https://cloud-storage-prices-moberries.herokuapp.com',
})

export { APIClient }
