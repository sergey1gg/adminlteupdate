import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { kiosks_items_report } from '../../actions/stats-api';
import { PieItemsReport } from './PieItemsReport';


export const Table = ({ date }) => {

    const [serviceTableData, setServiceTableData] = useState()

    useEffect(() => {
        if ($("#example1").hasClass("dataTable")) {
            $("#example1").DataTable({
                responsive: false,
                autoWidth: false,
            });
        }
        const fetchService = async () => {
            try {
                const response = await kiosks_items_report(date.from, date.to);
                setServiceTableData(response)
            } catch (error) {
                alert(error);
            }
        };
        fetchService();
        return () => {
            $("#example1").DataTable().destroy();
        }
    }, [date])

    useEffect(() => {
        if ($("#example1").hasClass("dataTable")) {
            $("#example1").DataTable().destroy();
        }

        if (serviceTableData?.length > 0) {
            $("#example1").DataTable({
                responsive: false,
                autoWidth: false,
            });
        }
    }, [serviceTableData]);
    return (
        <>
            <div className='table-responsive'>
                <table id="example1" className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>order_id</th>
                            <th >kiosk_id</th>
                            <th>kiosk_name</th>
                            <th>tovar_id</th>
                            <th>tovar_name</th>
                            <th>price</th>
                            <th>status</th>
                            <th>status_name</th>
                            <th>datetime</th>
                            <th>mass</th>
                            <th>promo</th>
                        </tr>
                    </thead>
                    <tbody>

                        {serviceTableData?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.order_id}</td>
                                <td>{item.kiosk_id}</td>
                                <td>{item.kiosk_name}</td>
                                <td>{item.tovar_id}</td>
                                <td>{item.tovar_name}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td>{item.status_name}</td>
                                <td>{item.datetime}</td>
                                <td>{item.mass}</td>
                                <td>{item.promo}</td>
                            </tr>
                        ))}

                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
            {serviceTableData && <PieItemsReport data={serviceTableData}/>}
        </>
    )
}

