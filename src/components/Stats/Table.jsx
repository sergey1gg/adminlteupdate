import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { kiosks_items_report } from '../../actions/stats-api';
import { PieItemsReport } from './PieItemsReport';
import { TableTotalReport } from './TableTotalReport';
import pdfMake from "pdfmake/build/pdfmake";


import * as XLSX from 'xlsx';

export const Table = ({ date, selectedKiosk, selectedOperation, selectedOptions }) => {

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
                const data = await kiosks_items_report(date.from, date.to);
                let filteredByKiosk = data;
                if(data){
                if (selectedKiosk && selectedKiosk.length > 0) {
                  filteredByKiosk = data.filter((item) => selectedKiosk.some((kiosk) => kiosk.value === item.kiosk_name));
                  
                }
            
                let filteredByOperation = filteredByKiosk;
                if (selectedOperation && selectedOperation.length > 0) {
                  filteredByOperation = filteredByKiosk.filter(
                    (item) => selectedOperation.some((operation) => operation.value === item.status_name)
                  );
                }
                setServiceTableData(filteredByOperation)
                if (selectedOptions) {
                  const filters = JSON.parse(localStorage.getItem("filters")) || [];
                  const selectedFilter = filters.find((filter) => filter.name === selectedOptions.value);
                
                  if (selectedFilter) {
                    let filteredByOperation = data;
                
                    if (selectedFilter?.kiosks && selectedFilter.kiosks.length > 0) {
                      filteredByOperation = filteredByOperation.filter((item) =>
                      selectedFilter.kiosks.some((kiosk) => kiosk.value === item.kiosk_name)
                      );
                    }
                
                    if (selectedFilter.operations && selectedFilter.operations.length > 0) {
                      filteredByOperation = filteredByOperation.filter((item) =>
                      selectedFilter.operations.some((operation) => operation.value === item.status_name)
                      );
                    }
                    setServiceTableData(filteredByOperation)
                  }
                }
              }
            
            } catch (error) {
                alert(error);
            }
        };
        fetchService();
        return () => {
            $("#example1").DataTable().destroy();
        }
    }, [date, selectedKiosk, selectedOperation, selectedOptions])

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

    const exportToExcel = () => {
        const headers = [
            "order_id",
            "kiosk_id",
            "kiosk_name",
            "tovar_id",
            "tovar_name",
            "price",
            "status",
            "status_name",
            "datetime",
            "mass",
            "promo",
        ];
    
        const tableData = serviceTableData.map(item => headers.map(header => item[header] ? item[header].toString() : ''));
    
        const ws = XLSX.utils.aoa_to_sheet([headers, ...tableData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
        // Сохраняем файл
        XLSX.writeFile(wb, 'table.xlsx');
    };

    const exportToPDF = () => {

        const tableData = [];

        const headers = [
            "order_id",
            "kiosk_id",
            "kiosk_name",
            "tovar_id",
            "tovar_name",
            "price",
            "status",
            "status_name",
            "datetime",
            "mass",
            "promo",
        ];
        serviceTableData.forEach(item => {
            const rowData = headers.map(header => item[header] ? item[header].toString() : '');
            tableData.push(rowData);
        });
        const documentDefinition = {
            content: [
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: [
                            headers,
                            ...tableData,
                        ],
                    },
                },
            ],
            defaultStyle: {
                fontSize: 8,
            },
        };

        pdfMake.createPdf(documentDefinition).download('table.pdf');
    };
    return (
        <>
            <div className='table-responsive' >
                <button onClick={exportToExcel}>Export to excel </button>
                <button onClick={exportToPDF}>Export to PDF </button>
                <table id="example1" className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Заказ</th>
                            <th >Id киоска</th>
                            <th>Имя киоска</th>
                            <th>Id товара</th>
                            <th>Имя товар</th>
                            <th>Цена</th>
                            <th>Id статуса</th>
                            <th>Имя статуса</th>
                            <th>Дата</th>
                            <th>Масса</th>
                            <th>Промо</th>
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
                                <td>{item.datetime.split("T").join(", ").split(".")[0]}</td>
                                <td>{item.mass}</td>
                                <td>{item.promo}</td>
                            </tr>
                        ))}

                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
            {serviceTableData && <PieItemsReport data={serviceTableData} />}
            {serviceTableData && <TableTotalReport date={date}  selectedKiosk={selectedKiosk} selectedOptions={selectedOptions} />}
        </>
    )
}

