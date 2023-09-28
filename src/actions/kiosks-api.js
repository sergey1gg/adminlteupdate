import axios from 'axios'
import { setActions, setKiosks, setOrders, setHistory } from '../reducers/toolkitReducer';

export const kiosksList = () => {
  return async dispatch => {
    try {
      const response = await axios.get("https://urc.zone:9007/kiosk/list",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      dispatch(setKiosks(response.data.data))
    } catch (error) {
     // alert(error.message);
    }
  }
};
export const switchChange = (kiosk_id,open) => {
  return async dispatch => {
    try {
      const response = await axios.post("https://urc.zone:9007/kiosk/open_close",{kiosk_id,open},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      dispatch(kiosksList())
    } catch (error) {
     // alert(error.message);
    }
  }
};



export const getActions = (kioskId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://urc.zone:9007/kiosk/action?kiosk_id=${kioskId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      dispatch(setActions(response.data.data))
    } catch (error) {
     // alert(error.message);
    }
  }
};

export const postActions = (kiosk_id, machine_id, type_name, machine_name, action_id, action_name, customParams) => {
  const params = customParams !== undefined ? customParams : null;
  return async dispatch => {
   try {
     const response = await axios.post(`https://urc.zone:9007/kiosk/action`, { kiosk_id, machine_id, type_name, machine_name, action_id, action_name, params },
        {
         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      alert(response.data.data)
    } catch (error) {
      alert(error.message);
    }
  }
};

export const getOrders = (kiosk_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://urc.zone:9007/kiosk/orders?kiosk_id=${kiosk_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });

      const orders = response.data.data;

      const updatedOrders = orders.reduce((acc, order) => {
        const existingOrder = acc.find((item) => item.order_id === order.order_id);
        if (existingOrder) {
          existingOrder.data.push(order);
        } else {
          acc.push({
            order_id: order.order_id,
            data: [order],
          });
        }
        return acc;
      }, []);

      dispatch(setOrders(updatedOrders));
    } catch (error) {
      // alert(error.message);
    }
  };
};

export const getHistory = (order_id) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://urc.zone:9007/kiosk/order?order_id=${order_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      return response.data.data
    } catch (error) {
     // alert(error.message);
    }
  }
};

export const returnPay = (data) => {
  return async dispatch => {
    try {
      const response = await axios.post(`https://urc.zone:9007/kiosk/action`,{kiosk_id:data[0],machine_id:data[1],
    machine_name:data[2],action_id:data[3],action_name:data[4],params:data[5]},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
        alert(response.data.data)
    } catch (error) {
     // alert(error.message);
    }
  }
};

