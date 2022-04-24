import axiosClient from './axiosClient'

const truckApi = {
  getAll: (params) => {
    const url = '/truck'
    return axiosClient.get(url, { params })
  },

  get: (id) => {
    const url = `/truck/${id}`
    return axiosClient.get(url)
  },
  post: (data) => {
    const url = `/truck`
    return axiosClient.post(url, data)
  },
  put: (id, data) => {
    const url = `/truck/${id}`
    return axiosClient.put(url, data)
  },
  delete: (id) => {
    const url = `/truck/${id}`
    return axiosClient.delete(url)
  },
}

export default truckApi
