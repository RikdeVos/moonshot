import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://launchlibrary.net/1.3',
});

export default instance;
