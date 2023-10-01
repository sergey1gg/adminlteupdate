import React, { useCallback, useEffect, useRef, useState } from 'react'
import { serviceAction, serviceActions, serviceAdd } from '../../actions/service-api'
import Webcam from "react-webcam";

const formData = new FormData();
export const HardParam = ({id, actionList ,setHardParam, hardData, service_id ,setHardSuccess}) => {
 
  const [actionsData, setActionsData]=useState([])
  
  const [capturingPhoto, setCapturingPhoto] = useState(false);
  const [valueInput, setValueInput]=useState('')

  const photoInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null)
  useEffect(()=>{
    const fetchService = async (id, item) => {
      try {
        const response = await serviceAction(id, item);
        setActionsData((prevData) => [...prevData, ...response]);

      } catch (error) {
        alert(error);
      }
    };
    if(actionList){
    actionList.map((item, index)=>{
      fetchService(id, item);
    })
  }
  },[])

  const handlePhotoPreviewClick = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };
 
  return (
    <div>
       <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">

          <img
            src={hardData?.example_img}
            alt=""
            className="img-fluid"
          />
          <p className='text-center'>{hardData.description}</p>
          
          <div className="custom-file">
      
      {/*
      <img
        src={photoPreview}
        alt=""
        className="img-fluid"
        onClick={handlePhotoPreviewClick}
      />
      <div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={photoInputRef}
        onChange={handlePhotoInputChange}
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={()=>  photoInputRef.current.click()}
      >
        Фото
      </button>
      {photoPreview &&
      <button
        type="button"
        className="btn btn-danger"
        onClick={()=>  setPhotoPreview()}
      >
        Удалить
      </button>
}
    </div>
    */}
    {imgSrc ?( 
      <>
    <img src={imgSrc} className='img-fluid' />
    <button className="btn btn-primary" onClick={()=> {setImgSrc(); setCapturingPhoto(true)}}>Переснять</button>
      </>
    ):(
          <button
        type="button"
        className={`btn btn-success  ${imgSrc !==null? "btn-success ": 'btn-danger'}`}
        onClick={()=>  setCapturingPhoto(true)}
      >
        Фото
      </button>

    )}
    </div>
        </div>
          
        <div className="col-md-6">

          <div className={`form-group mt-3 `}>
            <span htmlFor="value">{hardData.value}</span>
            <input
              type="text"
              className={`form-control ${valueInput ==="" ? "border border-danger": ''}`}
              id="value"
              value={valueInput ? valueInput : ""}
              onChange={(e)=> setValueInput(e.target.value)}
            />
          </div>

          {/* Область с отображаемыми кнопками */}
          {/** 
          <div className="mt-3">
            {actionsData.map((action, index) => (
              <button
                key={index}
                type="button"
                className="btn btn-primary mr-2 mt-2"
              >
                {action.machine_name}
              </button>
            ))}
          </div>
          */}
          <ActionButtons id={id} commands={actionsData}/>
          <div className="mt-4">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={()=> setHardParam(false)}
            >
              Назад
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={()=> {
                if (valueInput !== "" && imgSrc !== null){
                serviceAdd(imgSrc, service_id, hardData.group_id, hardData.step_id, hardData.step_num, hardData.operation, hardData.description, valueInput, hardData.description)
            .then(()=>setHardParam(false)).then(()=>setHardSuccess(true))
                }
              else{ alert("Заполните фото и значение")}}}
            >
              Готово
            </button>
          </div>
        </div>
      </div>
    </div>
    {capturingPhoto && <WebcamComponent imgSrc={imgSrc} setImgSrc={setImgSrc} setCapturingPhoto={setCapturingPhoto}/>}
    </div>
  )
}


const ModalAction = ({ command, onClose, inputValues, id }) => {

  return (
    <div className="modal fade" id="exampleModal3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Delete order and return pay</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" onClick={() => serviceActions(id, command.machine_id, command.type_name, command.machine_name, command.action_id, command.action_name,inputValues[0])} data-dismiss="modal">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ActionButtons = ({id, commands}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const handleButtonClick = (command) => {
    setSelectedCommand(command);
    setIsModalOpen(true);
  };

  const handleNotConfirmClick=(command,inputValues)=>{
    serviceActions(id, command.machine_id, command.type_name, command.machine_name, command.action_id, command.action_name,inputValues)
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (buttonIndex, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [buttonIndex]: value
    }));
  };

  
  const groupedCommands = {};
  commands.forEach(command => {
    const { machine_id, machine_name, action_id, machine_type, type_name, action_name, confirm, name,params } = command;
    if (!groupedCommands[type_name]) {
      groupedCommands[type_name] = [];
    }
    groupedCommands[type_name].push({
      machine_id,
      type_name,
      machine_name,
      action_id,
      action_name,
      confirm,
      name,
      params
    });
  });

  const newcommands = Object.entries(groupedCommands).map(([type_name, commands]) => (
    <div key={type_name}>
      <h5>machine_type: {type_name}</h5>
      <div style={{ display: "flex", gap: "10px", flexWrap: 'wrap' }}>
        {commands.map((button, buttonIndex) => (
          <div key={buttonIndex} style={{ display: "flex", alignItems: "center" }}>
            <button
              data-toggle={button.confirm ? "modal": null} data-target={button.confirm ? "#exampleModal3": null}
              className={button.confirm ? 'btn btn-danger' : 'btn btn-primary'}
              onClick={button.confirm ? () => handleButtonClick(button, inputValues[buttonIndex] || button.params) : () => handleNotConfirmClick(button, inputValues[buttonIndex] || button.params)}


            >
              {button.machine_name+ ' ' + button.action_name}
            </button>
            {button.params !== null && (
              <input
              type="text"
              size={button.params.toString().length}
              value={inputValues[buttonIndex] !== undefined ? inputValues[buttonIndex] : button.params}
              onChange={(e) => handleInputChange(buttonIndex, e.target.value)}
            />
            )}
          </div>
        ))}
      </div>
    </div>
  ));
  return (
    <div>
      {newcommands}
      {/* Модальное окно */}
      {isModalOpen && selectedCommand && (
        <ModalAction command={selectedCommand} onClose={closeModal} inputValues={inputValues} id={id}/>
      )}
    </div>
  );
}



  const WebcamComponent = ({imgSrc, setImgSrc, setCapturingPhoto}) => {
    const videoConstraints = {
      facingMode: "environment"
    };
    
    const webcamRef = useRef(null);
   
    const capture = useCallback(() => {
      try{
  
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setCapturingPhoto(false)
      }
      catch(e){
        alert(e)
      }
    }, [webcamRef]);
    const retake = () => {
      setImgSrc(null);
    };
  
    return (
  <div className="bg-black" style={{position: 'absolute', zIndex: '10', top: 0, width: '100%'}}>

        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (
          <Webcam  ref={webcamRef} videoConstraints={videoConstraints}  style={{ width: '100%', zIndex: '20' }} />
        )}
                
      <div className="btn-container d-flex justify-content-center bg-black py-2">
          <button className={`btn btn-success`} onClick={capture}>Фото</button>
          <button className='btn btn-danger' onClick={()=> setCapturingPhoto(false)}>Закрыть</button>
      </div>
      </div>
    )
  };