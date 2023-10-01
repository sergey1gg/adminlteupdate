import axios from "axios";

const server=process.env.REACT_APP_SERVER_URL;
export const serviceList = async() => {
      try {
        const response = await axios.get(`${server}/service/list`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
          })
        return response.data.data
      } catch (error) {
        console.log(error);
      }
  };
  
export const serviceStart = async(id, setServiceData) => {
    try {
      const response = await axios.post(`${server}/service/start`, {kiosk_id:id},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })

      setServiceData(Array(response.data.data))
    } catch (error) {
      console.log(error);
    }
};

export const serviceAction = async(id, action_id) => {
  try {
    const response = await axios.get(`${server}/service/action?kiosk_id=${id}&machin_type=${action_id}`, 
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
    return response.data.data
  } catch (error) {
    console.log(error);
  }
};



export const serviceAdd = async(photo_file, service_id, group_id, item_id, item_step, operation, value_desc, value, description) => {
  try {
    const requestData = {
      service_id: service_id,
      group_id: group_id,
      item_id: item_id,
      item_step: item_step,
      operation: operation,
      description: description,
      value_desc: value_desc,
    };
    function isBase64(str) {
      const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)/;
    
      return base64Regex.test(str);
    }

    if (photo_file !== null && isBase64(photo_file)) {
      requestData.photo_file = photo_file;
    } else {
      alert('Invalid Base64 format for photo_file');
    }
    if (value !== "") {
      requestData.value = value;
    }
    const response = await axios.post(`${server}/service/add_item`,requestData, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
   return response.data.data
  } catch (error) {
    alert(error);
  }
};
export const serviceAddSimple = async(service_id, group_id, item_id, item_step, operation, description) => {
  try {    
    const response = await axios.post(`${server}/service/add_item`,{service_id: service_id, group_id: group_id, item_id: item_id, item_step: item_step, operation: operation, description: description}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    return response.data.data
  } catch (error) {
    console.log(error);
  }
};
export const serviceDel = async(step_id) => {
  try {
    const response = await axios.post(`${server}/service/del_item`,{step_id: step_id}, 
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
    return response.data.data
  } catch (error) {
    console.log(error);
  }
};

export const serviceFinish = async(service_id, comment) => {
  try {
    const response = await axios.post(`${server}/service/finish`,{service_id: service_id, comment: comment}, 
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
    window.location.reload()
  } catch (error) {
    console.log(error);
  }
};
export const serviceActions = async(kiosk_id, machine_id, type_name, machine_name, action_id, action_name, customParams) => {
  const params = customParams !== undefined ? customParams : null;
   try {
     const response = await axios.post(`${server}/kiosk/action`, { kiosk_id, machine_id, type_name, machine_name, action_id, action_name, params },
        {
         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      alert(response.data.data)
    } catch (error) {
      alert(error.message);
    }
};
