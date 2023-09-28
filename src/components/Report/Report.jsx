import React, { useEffect, useRef, useState } from 'react'
import { reportGet } from '../../actions/report-api';
import { ReportModal } from './ReportModal';
import { ServiseTable } from './ServiseTable';

export const Report = () => {
  const [reportData, setReportData]=useState()
  const [selectedComment, setSelectedComment]=useState()
  const [selectedFirstDate, setSelectedFirstDate] = useState('');
  const [selectedTable, setSelectedTable]=useState({step: 1})
  const dateInputRef = useRef(null);

  const [selectedSecondDate, setSelectedSecondDate] = useState('');
  const dateSecondInputRef = useRef(null);

const handleReport =()=>{

    const fetchService = async () => {
      try {
        const response = await reportGet(selectedFirstDate, selectedSecondDate);
         setReportData(response)
         
      } catch (error) {
        alert(error);
      }
    };
    if( selectedFirstDate && selectedSecondDate){
    fetchService(); 
    }

  };
  console.log(selectedTable)
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
      <button type="button" className="btn btn-success col-md-auto" style={{opacity: selectedFirstDate && selectedSecondDate? '1': '0.5'}}
      onClick={handleReport}>Report</button>
    </div>
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Service</h1>
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
                  <div className="table-responsive">
                    {selectedTable.step ===1 ?(
                    <table id="example1" className="table table-bordered table-striped">
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
                        <td className={!item.comment? "bg-danger" : ''}
                        onClick={()=> setSelectedComment(item.comment)} data-toggle="modal" data-target="#exampleModal3">{item.service_id}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id})}>{item.kiosk_id}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id})}>{item.Address}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id})}>{new Date(item.data_start).toLocaleString()}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id})}>{new Date(item.data_finish).toLocaleString()}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id})}>{item.user_id}</td>
                        <td onClick={()=> setSelectedTable({step:2, service_id: item.service_id})}>{item.user_name}</td>
                      </tr>
                     ))}
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                    ): <ServiseTable selectedTable={selectedTable}/>}
                  </div>
              </div>
              {/* /.card-body */}
            </div>
            {selectedTable.step===2 ? <button type="button" className="btn btn-primary" onClick={()=> setSelectedTable({step: 1})}>Back</button> : null}
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


