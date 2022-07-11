import axios from 'axios';
export const fetchVersion = () => axios.get<string>('/common/version');
