import axios from 'axios';
import { host } from './index';
axios.defaults.baseURL = host.baseUrl;
// axios.interceptors.request.use(config => {
//   // loading
//   return config
// }, error => {
//   return Promise.reject(error)
// })
