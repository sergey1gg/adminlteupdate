import axios from 'axios'
import { setAuth } from '../reducers/toolkitReducer';


const serverUrl=process.env.REACT_APP_SERVER_URL;


export const login = async (phone, password) => {
    try {
      const response = await axios.post(
        `${serverUrl}/customer/login`,
        {
          phone,
          password,
        },
      );
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      return response
    } catch (error) {
      throw error
    }
  };
  export const auth = () => {
    return async dispatch => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      
      if (refresh_token) {

        const response = await axios.post(`${serverUrl}/customer/refresh_tocken`, {
          refresh_token,
        });
  
        localStorage.setItem('access_token', response.data.access_token);
        dispatch(setAuth())
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  }