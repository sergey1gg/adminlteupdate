import $ from 'jquery';
import 'datatables.net-bs4';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "datatables.net-bs4";
import "datatables.net-responsive-bs4";
import { kiosksList, switchChange } from '../actions/kiosks-api';
import {useDispatch, useSelector} from "react-redux"
export const Home = () => {
  
  const dispatch=useDispatch()
  useEffect(() => {
    // Проверяем, существует ли таблица с указанным id
    if (!$("#example1").hasClass("dataTable")) {
      $("#example1").DataTable({
        responsive: false,
        autoWidth: false,
      });
    }
  
    if (!$("#example2").hasClass("dataTable")) {
      $("#example2").DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
      });
    }
  }, []);

  const tableData=useSelector(state=>state.kiosks.kiosks)
  useEffect(() => {
        dispatch(kiosksList());    
  }, []); 

  useEffect(() => {
    if ($("#example1").hasClass("dataTable")) {
      $("#example1").DataTable().destroy();
    }
  
    if ($("#example2").hasClass("dataTable")) {
      $("#example2").DataTable().destroy();
    }
  
    if (tableData.length > 0) {
      $("#example1").DataTable({
        responsive: false,
        autoWidth: false,
      });
    }
  }, [tableData]);
    const navigate =useNavigate()
    const handleSwitchChange = (rowId, checked) => {
      dispatch(switchChange(rowId,checked))
    };
const items= tableData?.map((row,index) => (
          <tr key={row.id}>
            <td >{row.id}</td>
            <td onClick={()=> {navigate(`/kiosks/${row.id}`)}}>{row.Name}</td>
            <td onClick={()=> {navigate(`/kiosks/${row.id}`);}}>{row.Address}</td>
            <td>
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={`switch-${index}`}
        checked={row.OpenClose === 1}
        onChange={(e) => handleSwitchChange(row.id, e.target.checked)}
      />
      <label className="custom-control-label" htmlFor={`switch-${index}`}></label>
    </div>
  </td>
          </tr>
        ));

  return (

<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Kiosks</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <button className='btn  btn-primary'>+ Add customer</button>
          </ol>
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
            </div>
            {/* /.card-header */}
            <div className="card-body">
            <div className='table-responsive'>
            {tableData &&(
            <table id="example1" className="table table-bordered table-striped table-sm">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Open/close</th>
                  </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
                <tfoot>
                </tfoot>
              </table>
            )}
              </div>
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
  {/* /.content */}
</div>

  );
};