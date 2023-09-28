import React, { useEffect, useRef, useState } from 'react'
import { serviceAction, serviceActions, serviceAdd } from '../../actions/service-api'
const formData = new FormData();
export const HardParam = ({id, actionList ,setHardParam, hardData, service_id}) => {
 
  const [actionsData, setActionsData]=useState([])
  
  const [valueInput, setValueInput]=useState(hardData?.value ? hardData.value : '')
  const [photoPreview, setPhotoPreview] = useState('');
  const photoInputRef = useRef(null);
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
  const handlePhotoInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {

      const reader = new FileReader();
      
      formData.append('file', file);
      
      reader.onload = function (e) {

      setPhotoPreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

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
    </div>
        </div>
          
        <div className="col-md-6">

          <div className="form-group mt-3">
            <label htmlFor="value">Значение</label>
            <input
              type="text"
              className="form-control"
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
              onClick={()=> serviceAdd(formData.get("file"), service_id, hardData.group_id, hardData.step_id, hardData.step_num, hardData.operation, hardData.description, valueInput, hardData.description)}
            >
              Готово
            </button>
          </div>
        </div>
      </div>
    </div>
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