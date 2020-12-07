import axios from 'axios'

export const Apisful = axios.create({
  // We are using apisful.com as a backend for this e-commerce website
  baseURL: 'https://api.apisful.com/v1/collections/',
  headers: {
    // Put your access key here
    'X-Api-Key': 'IE7Bufk1NgFOBZwc6PxTOIqUB5AFLYf4Ennv4xvO5m4'
  },
  validateStatus (status) {
    return status >= 200 && status < 500
  }
})
