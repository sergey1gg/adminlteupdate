import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serviceAdd, serviceAddSimple, serviceDel, serviceStart } from '../../actions/service-api'
import { HardParam } from './HardParam'
import {AddHardModal} from "./AddHardModal"
import { FinishModal } from './FinishModal'

export const ServiceStart = () => {
  const navigate=useNavigate()
    const [serviceData, setServiceData]=useState()
    const [selectMore, setSelectMore]=useState([])
    const {id}=useParams()
    const [checkboxes, setCheckboxes] = useState([]);
    const [hardParam, setHardParam]=useState(false)
    const [actionList, setActionList]=useState()
    const [hardData, setHardData]=useState()
    const [addModal, setAddModal]=useState({})
    const [finish, setFinish]=useState()
    const [hardSuccess, setHardSuccess]= useState()
  const handleCheckboxChange = (type, item) => {
    if (type ===0 ){
      if( !checkboxes[item.step_id]){
        serviceAddSimple(serviceData[0]?.service_id, item.group_id, item.step_id, item.step_num, item.operation, item.description).then((res)=>{
          serviceStart(id, setServiceData)
        })

      }
      else{
        serviceData[0].items.forEach((elem) => {
          if (elem.step_id === item.step_id) {
            serviceDel(elem.id).then((res)=>{
              serviceStart(id, setServiceData)
            })

          }
        });


      }

}   else{
  if( checkboxes[item.step_id]){
  return(
    setAddModal({param: true, id: serviceData[0]?.service_id, item, type})
  )
  } 
}
  };
  const handleSetHardItem=(type, actionList, item)=>{
    if(type ===1 ){
      setHardParam(true)
      setActionList(JSON.parse(actionList))
      setHardData(item)
    }
  }
    useEffect(()=>{
        const fetchService = async () => {
            try {
              const response = await serviceStart(id,setServiceData);
              
            } catch (error) {
              alert(error);
            }
          };
          fetchService();    
    },[id, setServiceData, hardSuccess])
    useEffect(()=>{
      const fetchService = async () => {
          try {
             sortCheckBoxes(serviceData && serviceData[0]?.settings ? serviceData: null).then((updatedCheckboxes) => { 
              setCheckboxes(updatedCheckboxes)});
          } catch (error) {
            alert(error);
          }
        };
        fetchService();    
  },[serviceData])
    const sortAndGroupSettingsByGroupId = (settings) => {
      if (settings) {
        const sortedSettings = settings[0].settings.sort((a, b) => a.group_id.localeCompare(b.group_id));
        const groupedSettings = [];
        let currentGroup = null;

        sortedSettings.forEach((setting) => {
          if (!currentGroup || currentGroup.group_id !== setting.group_id) {
            currentGroup = { group_id: setting.group_id, settings: [] };
            groupedSettings.push(currentGroup);
          }
    
          currentGroup.settings.push(setting);

        }, {});
        return groupedSettings;
      }
      return [];
    };
    const sortCheckBoxes =async (settings) => {
      if (settings) {
       
        const matchingStepIds = []; 

        let updatedCheckboxes;
        settings[0]?.settings.forEach((setting) => {
          settings[0]?.items.forEach((item) => {
            if (setting.step_id === item.step_id) {
              matchingStepIds.push(setting.step_id);
            }
          });
        });
      
        updatedCheckboxes = matchingStepIds.reduce((prev, stepId) => {
          return { ...prev, [stepId]: true };

        }, {});
        
        return updatedCheckboxes
      }
    };
      const sortedSettings = sortAndGroupSettingsByGroupId(serviceData && serviceData[0]?.settings ? serviceData: null );
   
      const currentDate = new Date();
      console.log(serviceData)
  return (

 <div className="content-wrapper">
 {/* Content Header (Page header) */}
 <section className="content-header">
   
 </section>
 {/* Main content */}
 <section className="content">
   <div className="container-fluid">
     <div className="row">
     <div className="col-12">
  <div className="card card-secondary">
    <div className="card-header">
      <h3 className="card-title">Service</h3>
    </div>
    {!hardParam? (

    <div className="card-body d-flex flex-column">
    {sortedSettings?.map((setting, index) => (
  <div key={index}>
    <span className="">{setting.group_id}</span>
    {setting?.settings?.map((item, index2) => (
      <form className='mt-2 ' key={index2}>
        <div className="form-group mb-2">
          <div className="custom-control custom-checkbox"
           style={{display: (currentDate - new Date(item.last_time) > item.frequency *24*60*60*1000) || (selectMore.some(item => item.state === true && item.name === setting.group_id))? 'block': 'none'}}>
            <input
              type="checkbox"
              className="custom-control-input"
              id={`checkbox-${setting.group_id}-${item.description}`} 
              checked={Boolean(checkboxes && checkboxes[item?.step_id])}
              onChange={() => handleCheckboxChange(item.type, item)}
              data-toggle="modal" 
              data-target={item.type==1 && `#exampleModal`}
            />
            <label
              className="custom-control-label text-bold"
              htmlFor={`checkbox-${setting.group_id}-${item.description}`} 
              
            >
            </label>
            <span className='text-bold' onClick={()=> handleSetHardItem(item.type, item.action_id_list, item)}>{item.description}</span>
          </div>
        </div>
      </form>
    ))}
      <div className=' border-bottom border-dark container d-flex align-items-center'
    onClick={() => {
      setSelectMore((prev) => {
        const updatedSelectMore = [...prev];
        const existingItemIndex = updatedSelectMore.findIndex(item => item.name === setting.group_id);
    
        if (existingItemIndex !== -1) {

          updatedSelectMore[existingItemIndex].state = !updatedSelectMore[existingItemIndex].state;
        } else {
  
          updatedSelectMore.push({ state: true, name: setting.group_id });
        }
    
        return updatedSelectMore;
      });
    }}>
          <span>Еще</span>
          <i className="nav-icon fa fa-sort-down ml-2" />
        </div>
    </div>
  ))}

    </div>
            
            ): <HardParam id={id} actionList={actionList} setHardParam={setHardParam} hardData={hardData} service_id={serviceData[0]?.service_id} setHardSuccess={setHardSuccess}/>}
  </div>
  {!hardParam && 
  <>
  <button type="button" className="btn btn-primary" data-toggle="modal" data-target='#exampleModal2' onClick={()=> setFinish(true)}>Завершить</button>
  <button type="button" className="btn btn-secondary ml-2"onClick={()=> navigate("/service")}>Назад</button>
  </>} 
</div>
       {/* /.col */}
     </div>
     {/* /.row */}
   </div>
   {/* /.container-fluid */}
 </section>
 {finish && <FinishModal service_id={serviceData[0]?.service_id}/>}
 {addModal.param && <AddHardModal data={addModal} handleCheckboxChange={handleCheckboxChange}/>}
 {/* /.content */}
</div>
  )
}

