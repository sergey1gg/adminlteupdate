import React, { useEffect, useState } from "react"
import { serviceList } from "../../actions/service-api";
import $ from 'jquery';
import 'datatables.net-bs4';
import "datatables.net-responsive-bs4";
import { ServiceModal } from "./ServiceModal";

export const Service =()=>{
 const [serviceData, setServiceData]=useState()
  const [selectedKiosk, setSelectedKiosk]=useState()

 useEffect(()=>{
    const fetchService = async () => {
        try {
          const response = await serviceList();
          setServiceData(response)
  
        } catch (error) {
          alert(error);
        }
      };
      fetchService();    
 },[])
 const items = serviceData?.map((row, index) => (
    <tr key={index}>
      <td>{row.kiosk_id}</td>
      <td onClick={()=> setSelectedKiosk({name:row.name, id:row.kiosk_id})} data-toggle="modal" data-target="#exampleModal3">{row.name}</td>
      <td onClick={()=> setSelectedKiosk({name:row.name, id:row.kiosk_id})} data-toggle="modal" data-target="#exampleModal3">{row.address}</td>
      <td>{row.picture}</td>
    </tr>
  )) 
 return (
  <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
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
                      <table id="example1" className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Picture</th>
                          </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                        <tfoot></tfoot>
                      </table>
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
      <ServiceModal kiosk={selectedKiosk}/>
    </div>
 )
}
