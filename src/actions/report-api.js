import axios from "axios";


const server=process.env.REACT_APP_SERVER_URL;
export const reportGet = async(from, to) => {
    try {
      const response = await axios.get(`${server}/service/report?from=${from}&to=${to}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
      return response.data.data
    } catch (error) {
      console.log(error);
    }
  };
  
export const reportItem = async(service_id) => {
    try {
      const response = await axios.get(`${server}/service/report_item?service_id=${service_id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
      return response.data.data
    } catch (error) {
      console.log(error);
    }
  };
  