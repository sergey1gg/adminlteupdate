import axios from "axios";

const server=process.env.REACT_APP_SERVER_URL;
export const kiosks_orders_report = async(from, to) => {
      try {
        const response = await axios.get(`${server}/kiosk/orders_report?date_from=${from}T00:00:00&date_to=${to}T23:59:59`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
          })
        return response.data.data
      } catch (error) {
        console.log(error);
      }
}

export const kiosks_items_report = async(from, to) => {
  try {
    const response = await axios.get(`${server}/kiosk/items_report?date_from=${from}T00:00:00&date_to=${to}T23:59:59`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
    return response.data.data
  } catch (error) {
    console.log(error);
  }
}

export const kiosks_total_report = async(from, to) => {
  try {
    const response = await axios.get(`${server}/kiosk/kiosk_total_report?date_from=${from}T00:00:00&date_to=${to}T23:59:59`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
    return response.data.data
  } catch (error) {
    console.log(error);
  }
}