import React, {useEffect, useState } from 'react'
import $ from 'jquery';
import { kiosks_total_report } from '../../actions/stats-api';

export const TableTotalReport = ({date}) => {
    const [serviceTableData, setServiceTableData] = useState()
    useEffect(() => {
        if ($("#example2").hasClass("dataTable")) {
            $("#example2").DataTable({
                responsive: false,
                autoWidth: false,
            });
        }
        const fetchService = async () => {
            try {
                const response = await kiosks_total_report(date.from, date.to);
                setServiceTableData(response)
            } catch (error) {
                alert(error);
            }
        };
        fetchService();
        return () => {
            $("#example2").DataTable().destroy();
        }
    }, [date])
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
    console.log(serviceTableData)
  return (
    <>
    <div className='table-responsive'>
        <table id="example2" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th >kiosk_id</th>
                    <th>kiosk_name</th>
                    <th>address</th>
                    <th>status</th>
                    <th>status_name</th>
                    <th>orders</th>
                    <th>summa</th>
                </tr>
            </thead>
            <tbody>
            {serviceTableData?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.kiosk_id}</td>
                                <td>{item.kiosk_name}</td>
                                <td>{item.address}</td>
                                <td>{item.status}</td>
                                <td>{item.status_name}</td>
                                <td>{item.orders}</td>
                                <td>{item.summa}</td>
                            </tr>
                        ))}
            </tbody>
            <tfoot></tfoot>
        </table>
    </div>
</>
  )
}

