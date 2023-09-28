import axios from "axios";

export const reportGet = async(from, to) => {
    try {
      const response = await axios.get(`https://app.robottod.ru:9007/service/report?from=${from}&to=${to}`,
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
      const response = await axios.get(`https://app.robottod.ru:9007/service/report_item?service_id=${service_id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
      return response.data.data
    } catch (error) {
      console.log(error);
    }
  };
  