import axios from "axios";

export const serviceList = async() => {
      try {
        const response = await axios.get("https://app.robottod.ru:9007/service/list",
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
      const response = await axios.post("https://app.robottod.ru:9007/service/start", {kiosk_id:id},
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
    const response = await axios.get(`https://app.robottod.ru:9007/service/action?kiosk_id=${id}&machin_type=${action_id}`, 
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
    const formData = new FormData();
    formData.append('photo_file', photo_file);
    formData.append('service_id', service_id);
    formData.append('group_id', group_id);
    formData.append('item_id', item_id);
    formData.append('item_step', item_step);
    formData.append('operation', operation);
    formData.append('value_desc', value_desc);
    formData.append('value', value);
    formData.append('description', description);
    const response = await axios.post(`https://app.robottod.ru:9007/service/add_item`,formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    alert (response.data.data)
  } catch (error) {
    console.log(error);
  }
};
export const serviceAddSimple = async(service_id, group_id, item_id, item_step, operation, description) => {
  try {
    const formData = new FormData();
    formData.append('service_id', service_id);
    formData.append('group_id', group_id);
    formData.append('item_id', item_id);
    formData.append('item_step', item_step);
    formData.append('operation', operation);
    formData.append('description', description);
    
    const response = await axios.post(`https://app.robottod.ru:9007/service/add_item`,formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    return response.data.data
  } catch (error) {
    console.log(error);
  }
};
export const serviceDel = async(service_id, step_id) => {
  try {
    const response = await axios.post(`https://app.robottod.ru:9007/service/del_item`,{service_id: service_id, step_id: step_id}, 
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
    const response = await axios.post(`https://app.robottod.ru:9007/service/finish`,{service_id: service_id, comment: comment}, 
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
    debugger
    return response.data.data
  } catch (error) {
    console.log(error);
  }
};
export const serviceActions = async(kiosk_id, machine_id, type_name, machine_name, action_id, action_name, customParams) => {
  const params = customParams !== undefined ? customParams : null;
   try {
     const response = await axios.post(`https://urc.zone:9007/kiosk/action`, { kiosk_id, machine_id, type_name, machine_name, action_id, action_name, params },
        {
         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
      alert(response.data.data)
    } catch (error) {
      alert(error.message);
    }
};
