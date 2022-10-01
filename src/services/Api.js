import axios from 'axios'

export default () => {
  const baseURL =
    import.meta.env.DEV
      ? 'http://localhost:8088/'
      : 'https://www.godslayerscomic.com/api'
  return axios.create({
    baseURL,
  })
}
