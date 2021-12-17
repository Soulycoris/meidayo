import axios from 'axios';
import { host } from './host';
axios.defaults.baseURL = host.baseUrl;
// axios.interceptors.request.use(config => {
//   // loading
//   return config
// }, error => {
//   return Promise.reject(error)
// })
