import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-bs4';
import { useEffect } from 'react';
import "datatables.net-responsive-bs4";
import { getActions, getHistory, getOrders, kiosksList, postActions, returnPay } from '../actions/kiosks-api';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../reducers/toolkitReducer';
export const Kiosk = ({isLoggedIn}) => {
  const auth=useSelector(s=>s.kiosks.isAuth)
  if(!auth){
    window.location.href="/login"
  }

  const dispatch = useDispatch()
  const { id } = useParams()
  const [currentTable, setcurrentTable] = useState("Orders")

  const orders = useSelector(state => state.kiosks.orders)
  const tableData = useSelector(state => state.kiosks.kiosks)

  useEffect(() => {
    if (!$("#example1").hasClass("dataTable")) {
      $("#example1").DataTable({
        responsive: true,
        autoWidth: false,
      });
    }
  }, [currentTable]);
  useEffect(() => {
    if ($("#example1").hasClass("dataTable")) {
      $("#example1").DataTable().destroy();
    }
  }, [orders]);

  const navigate = useNavigate()

 

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPositions, setShowPositions] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleShowPositions = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };
  const positions = orders[selectedRow];
  useEffect(() => {
    $(document).on('click', '.btn-show-positions', function () {
      const index = $(this).data('index');
      handleShowPositions(index);
    });
    $(document).on('click', '.btn-show-history', function () {
      const index = $(this).data('index');
      setSelectedOrder(index);
    });
  }, [selectedRow])
  useEffect(() => {
    dispatch(getActions(id));
    dispatch(getOrders(id))
    return ()=>{
      resetState()
    }
  }, [])
  const [returnpay, setReturnPay]=useState([])
  const items = orders.map((row, index) => (
    <React.Fragment key={index}>
      <tr>
        <td onClick={()=>handleShowPositions(index)}>{row.order_id}</td>
        <td  onClick={()=>handleShowPositions(index)}>{row.data[0].client}</td>
        <td onClick={()=>handleShowPositions(index)}>{new Date(row.data[0].datetime).toLocaleString()}</td>
        <td onClick={()=>handleShowPositions(index)}>{row.data[0].summa}</td>
        <td onClick={()=>handleShowPositions(index)}>{row.data[0].status}</td>
        <td onClick={()=>handleShowPositions(index)}>{row.data[0].pay_text ? row.data[0].pay_text : "null"}</td>
        <td onClick={()=>handleShowPositions(index)}>{row.data[0].promo ? row.data[0].promo : "null"}</td>
        <td>
          <div className="btn-group">
          <button type="button" className="btn btn-default" data-toggle="dropdown">Action</button>
          <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu" role="menu">
          <button data-index={row.order_id} type="button" className="btn btn-info btn-sm btn-block btn-show-history" data-toggle="modal" data-target="#exampleModal2">
            <i className="fa fa-eye"></i> History
          </button>
          <button type="button" className="btn btn-danger btn-sm btn-block" data-toggle="modal" data-target="#exampleModal"
          onClick={()=>setReturnPay([id,row.data[0].client, row.order_id, null,'return_pay',null])}>
            <i className="fa fa-trash"></i> Return
          </button>
          </div>
          
          </div>
        </td>
      </tr>
      {/* Проверяем, соответствует ли текущая строка выбранной */}
      {selectedRow === index && (
        <tr>
          <td colSpan="8">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Tovar_id</th>
                    <th>Name</th>
                    <th>Tech_name</th>
                    <th>Price</th>
                    <th>Mass</th>
                    <th>Promo</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                {positions?.data.map((position, positionIndex) => (
                    <tr key={positionIndex}>
                      <td>{position.item_id}</td>
                      <td>{position.tovar_id}</td>
                      <td>{position.name}</td>
                      <td>{position.technical_name}</td>
                      <td>{position.price}</td>
                      <td>{position.mass ? position.mass : "null"}</td>
                      <td>{position.promo ? position.promo : "null"}</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  ));

  const currentKiosk = tableData.find(kiosk => kiosk.id.toString() === id);
  if (tableData.length === 0) {
    dispatch(kiosksList())
  }
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Kiosk Info</h1>
              <span>{currentKiosk?.Name}</span>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* /.card */}
              <div className="card">
                <div className="card-header">
                  <div className="col-sm-12 col-md-6">
                    <div className="dt-buttons btn-group flex-wrap">
                      <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => { setcurrentTable("Orders") }}>
                        <span>Orders</span>
                      </button>
                      <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => setcurrentTable("Action")}>
                        <span>Action</span>
                      </button>
                      <button className="btn btn-outline-primary btn-sm" type="button">
                        <span>Stock</span>
                      </button>
                      <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => { setcurrentTable("Description"); setSelectedRow(null) }}>
                        <span>Description</span>
                      </button>
                      <button className="btn btn-outline-primary btn-sm" type="button">
                        <span>Logs</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  {currentTable === "Orders" && (
                    <div className="table-responsive">
                      <table id="example1" className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Client_id</th>
                            <th>Time</th>
                            <th>Summa</th>
                            <th>State</th>
                            <th>Payment</th>
                            <th>Promo</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items}
                        </tbody>
                        <tfoot></tfoot>
                      </table>
                    </div>
                  )}
                  {currentTable === "Description" && (
                    <div className="row" style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: "space-between" }}>
                      <div>
                        <p className="font-weight-bold">Name of kiosk:</p>
                        <p className="font-weight-bold">Serial number:</p>
                        <p className="font-weight-bold">Address:</p>
                        <p className='font-weight-bold'>Inn:</p>
                        {/* Добавьте другие надписи */}
                      </div>
                      <div>
                        <p>{currentKiosk.Name}</p>
                        <p>{currentKiosk.Serial}</p>
                        <p>{currentKiosk.Address}</p>
                        <p>{currentKiosk.inn}</p>
                        {/* Добавьте другие значения */}
                      </div>
                    </div>
                  )}
                  {currentTable === "Action" && (
                    <div>
                      <ActionButtons />
                    </div>
                  )}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalReturn returnpay={returnpay}/>
      <ModalHistory selectedOrder={selectedOrder} />
      {/* /.content */}
    </div>

  );
}

const ModalReturn = ({returnpay}) => {
  const dispatch=useDispatch()
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger"
             onClick={()=> dispatch(returnPay(returnpay))}  data-dismiss="modal">Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ModalHistory = ({ selectedOrder }) => {
  const dispatch = useDispatch()
  const [history, setHistory] = useState([]);
  async function fetchHistory() {
    if (selectedOrder) {
      const res = await dispatch(getHistory(selectedOrder));
      setHistory(res);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, [selectedOrder]);

  return (
    <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">History</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.order_id}</td>
                      <td>{item.status}</td>
                      <td>{new Date(item.datetime).toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
const ModalAction = ({ command, onClose, inputValues }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
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
            <button type="button" className="btn btn-danger" onClick={() => dispatch(postActions(id, command.machine_id, command.type_name, command.machine_name, command.action_id, command.action_name,inputValues[0]))} data-dismiss="modal">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ActionButtons = () => {
  const dispatch=useDispatch()
  const { id } = useParams()
  const commands = useSelector(state => state.kiosks.actions)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const handleButtonClick = (command) => {
    setSelectedCommand(command);
    setIsModalOpen(true);
  };

  const handleNotConfirmClick=(command,inputValues)=>{
    dispatch(postActions(id, command.machine_id, command.type_name, command.machine_name, command.action_id, command.action_name,inputValues))
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
      <div style={{ display: "flex", gap: "10px" }}>
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
        <ModalAction command={selectedCommand} onClose={closeModal} inputValues={inputValues}/>
      )}
    </div>
  );
}