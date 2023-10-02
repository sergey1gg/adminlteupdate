import React, { useEffect, useRef, useState } from 'react'
import { reportGet } from '../../actions/report-api';
import { ReportModal } from './ReportModal';
import { ServiseTable } from './ServiseTable';
import $ from 'jquery';
import 'datatables.net-bs4';
import "datatables.net-responsive-bs4";

export const Report = () => {
  const [reportData, setReportData]=useState()
  const [selectedComment, setSelectedComment]=useState()
  const [selectedFirstDate, setSelectedFirstDate] = useState('');
  const [selectedTable, setSelectedTable]=useState({step: 1})
  const dateInputRef = useRef(null);
  const [selectedSecondDate, setSelectedSecondDate] = useState('');
  const dateSecondInputRef = useRef(null);

  
  useEffect(() => {
    if (!$("#example1").hasClass("dataTable")) {
      $("#example1").DataTable({
        responsive: false,
        autoWidth: false,
      });
    }
  
  }, []);

useEffect(() => {
if ($("#example1").hasClass("dataTable")) {
  $("#example1").DataTable().destroy();
}

if (reportData?.length > 0) {
  $("#example1").DataTable({
    responsive: false,
    autoWidth: false,
  });
}
}, [reportData]);


const handleReport =()=>{

    const fetchService = async () => {
      try {
        const response = await reportGet(selectedFirstDate, selectedSecondDate);
         setReportData(response)
         
      } catch (error) {
        alert(error);
      }
    };
    if( selectedFirstDate){
    fetchService(); 
    }

  };
  console.log(reportData)
  return (
    <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
    <div className="form-group d-flex row" style={{padding: '0 15.5px'}}>
     
      <input
        type="date"
        id="datePicker"
        className="form-control col"
        ref={dateInputRef}
        onChange={()=> setSelectedFirstDate(dateInputRef.current.value)}
      />

      <input
        type="date"
        id="datePicker"
        className="form-control col"
        ref={dateSecondInputRef}
        onChange={()=> setSelectedSecondDate(dateSecondInputRef.current.value)}
      />
      <button type="button" className="btn btn-success col-md-auto" style={{opacity: selectedFirstDate ? '1': '0.5'}}
      onClick={handleReport}>Report</button>
    </div>
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
           
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
              {/* /.card-header */}
              <div className="card-body">
                  <div className={`table-responsive ${selectedTable.step ===1? '': 'd-none'}`}>
                   
                    <table id="example1" className={`table table-bordered table-striped `}>
                      <thead>
                        <tr>
                          <th>id</th>
                          <th >Name</th>
                          <th>Address</th>
                          <th>Start</th>
                          <th>Stop</th>
                          <th>User_id</th>
                          <th>User_name</th>
                        </tr>
                      </thead>
                      <tbody>
                     {reportData?.map((item,index) =>(
                      <tr key={index}>
                        <td className={item.comment? "bg-danger" : ''}
                        onClick={()=> setSelectedComment(item.comment)} data-toggle="modal" data-target="#exampleModal3">{item.service_id}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id, user:item.user_name, id: item.service_id})}>{item.kiosk_name}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id, user:item.user_name, id: item.service_id})}>{item.Address}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id, user:item.user_name, id: item.service_id})}>{new Date(item.data_start).toLocaleString()}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id, user:item.user_name, id: item.service_id})}>
                           {item.data_finish ? new Date(item.data_finish).toLocaleString() : ''}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id, user:item.user_name, id: item.service_id})}>{item.user_id}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id, user:item.user_name, id: item.service_id})}>{item.user_name}</td>
                      </tr>
                     ))}
                      </tbody>
                      <tfoot></tfoot>
                      
                    </table>
                   
                  </div>
                  {selectedTable.step ===2? <ServiseTable selectedTable={selectedTable}/>: null}
              </div>
              {/* /.card-body */}
            </div>
            {selectedTable.step===2 ? <button type="button" className="btn btn-primary my-2" onClick={()=> setSelectedTable({step: 1})}>Back</button> : null}
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </section>
    {/* /.content */}
    <ReportModal comment={selectedComment}/>
  </div>
  )
}


