import axios from 'axios'

export default () => {
  const baseURL = (process.env.NODE_ENV !== "production") ? 'http://localhost:88/'
                                                          : 'https://www.godslayerscomic.com/api'
  return axios.create({
    baseURL
  });
}