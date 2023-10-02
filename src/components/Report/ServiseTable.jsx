import React, { useEffect, useState } from 'react'
import { reportItem } from '../../actions/report-api';
import $ from 'jquery';


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

    useEffect(() => {
      if (!$("#example2").hasClass("dataTable")) {
        $("#example2").DataTable({
          responsive: false,
          autoWidth: false,
        });
      }
    
    }, []);
  
  useEffect(() => {
  if ($("#example2").hasClass("dataTable")) {
    $("#example2").DataTable().destroy();
  }
  
  if (serviceTableData?.length > 0) {
    $("#example2").DataTable({
      responsive: false,
      autoWidth: false,
    });
  }
  }, [serviceTableData]);
  return (
   <>
   <div className='table-responsive'>
   <h3>Service id- {selectedTable?.id}, operation - {selectedTable?.user}</h3>
<table id="example2" className="table table-bordered table-striped">
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
                        <td> <a href={item.photo_file} target="_blank">{item?.photo_file?.split("/")[item?.photo_file?.split("/").length-1]}</a></td>
                      </tr>
                     ))}
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                    </div>
                    </>
  )
}

