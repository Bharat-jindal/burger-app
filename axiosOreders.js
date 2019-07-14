import  axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-app-773ea.firebaseio.com'
});
export default instance;