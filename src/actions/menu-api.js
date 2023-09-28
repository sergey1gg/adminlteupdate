import axios from 'axios'
import { setDependens, setGroup, setMenu, setProduct } from '../reducers/menuReducer';

export const menuList = () => {
  return async dispatch => {
    try {
      const response = await axios.get("https://urc.zone:9007/kiosk/menu_list",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
        dispatch(setMenu(response.data.data))
    } catch (error) {
      alert(error.message);
    }
  }
};
export const editMenu = (id,name,active) => {
  return async dispatch => {
    try {
      const response = await axios.post("https://urc.zone:9007/kiosk/menu_list",{id,name,active},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
        dispatch(menuList())
    } catch (error) {
      alert(error.message);
    }
  }
};


export const groupList = (menuId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://urc.zone:9007/kiosk/menu_group?id=${menuId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
        dispatch(setGroup(response.data.data))
    } catch (error) {
      alert(error.message);
    }
  }
};

export const editGroup = (id,menu,name,active,picture,note) => {
  return async dispatch => {
    try {
      const response = await axios.post(`https://urc.zone:9007/kiosk/menu_group`,{id,menu,name,active,picture,note},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
        dispatch(groupList(menu))
    } catch (error) {
      alert(error.message);
    }
  }
};
export const productList = (groupId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://urc.zone:9007/kiosk/menu_product_addition?id=${groupId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      dispatch(setProduct(response.data.data))
    } catch (error) {
      alert(error.message);
    }
  }
};
export const editProduct = (id,group,name,note,tovar,picture,price,active) => {
  return async dispatch => {
    try {
      const response = await axios.post(`https://urc.zone:9007/kiosk/menu_product_addition`,{id,group,name,note,tovar,picture,price,active},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      dispatch(productList(group))
    } catch (error) {
      alert(error.message);
    }
  }
};

export const dependensList = (productId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://urc.zone:9007/kiosk/menu_product_addition?id=${productId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      dispatch(setDependens(response.data.data))
    } catch (error) {
      alert(error.message);
    }
  }
};

export const editDependens = (id,group,name,note,tovar,picture,price,active) => {
  return async dispatch => {
    try {
     const response = await axios.post(`https://urc.zone:9007/kiosk/menu_product_addition`,{id,group,name,note,tovar,picture,price,active},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      dispatch(dependensList(group))
    } catch (error) {
      alert(error.message);
    }
  }
};