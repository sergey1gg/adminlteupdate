import React, { useEffect, useState } from 'react'
import { reportItem } from '../../actions/report-api';

export const ServiseTable = ({selectedTable}) => {
    const [serviceTableData, setServiceTableData]=useState()
    useEffect(()=>{
        const fetchService = async () => {
            try {
              const response = await reportItem(selectedTable?.service_id);
              setServiceTableData(response)
            } catch (error) {
              alert(error);
            }
          };
          fetchService(); 
    },[])
    console.log(serviceTableData)
  return (
   <>
   <h3>Service id- {serviceTableData && serviceTableData[0]?.service_id}, operation - {serviceTableData && serviceTableData[0]?.operation}</h3>
<table id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>id</th>
                          <th >step_num</th>
                          <th>operation</th>
                          <th>description</th>
                          <th>value_desc</th>
                          <th>value</th>
                          <th>photo_file</th>
                        </tr>
                      </thead>
                      <tbody>
                      {serviceTableData?.map((item,index) =>(
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.step_num}</td>
                        <td>{item.operation}</td>
                        <td>{item.description}</td>
                        <td>{item.value_desc}</td>
                        <td>{item.value}</td>
                        <td> <a href={item.photo_file} target="_blank">{item.photo_file}</a></td>
                      </tr>
                     ))}
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                    </>
  )
}

