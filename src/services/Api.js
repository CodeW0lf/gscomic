import axios from 'axios'

export default () => {
  const baseURL =
    import.meta.env.DEV
      ? 'http://localhost:8088/'
      : '/api/'
  return axios.create({
    baseURL,
  })
}
