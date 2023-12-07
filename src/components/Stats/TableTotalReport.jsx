import React, {useEffect, useState } from 'react'
import $ from 'jquery';
import { kiosks_total_report } from '../../actions/stats-api';

export const TableTotalReport = ({date,  selectedKiosk, selectedOptions }) => {
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
                let filteredByOperation = response;
                if (response) {
                  if (selectedOptions) {
                    const filters = JSON.parse(localStorage.getItem("filters")) || [];
                    const selectedFilter = filters.find((filter) => filter.name === selectedOptions.value);
            
                    if (selectedFilter) {
            
                      if (selectedFilter?.kiosks) {
                        filteredByOperation = filteredByOperation.filter((item) =>
                          selectedFilter.kiosks.some((kiosk) => kiosk.value === item.kiosk_name)
                        );
                      }
                    }
                  }
                  else if (selectedKiosk && selectedKiosk.length > 0) {
                    filteredByOperation = response.filter((item) => selectedKiosk.some((kiosk) => kiosk.value === item.kiosk_name));
                  }
                }
                setServiceTableData(filteredByOperation)
            } catch (error) {
                alert(error);
            }
        };
        fetchService();
        return () => {
            $("#example2").DataTable().destroy();
        }
    }, [date, selectedKiosk, selectedOptions])
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
        <table id="example2" className="table table-bordered table-striped">
            <thead>
                <tr>

                    <th >Id киоска</th>
                    <th>Имя киоска</th>
                    <th>Адрес</th>
                    <th>Id статуса</th>
                    <th>Имя статуса</th>
                    <th>Кол-во заказов</th>
                    <th>Сумма заказов</th>
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

