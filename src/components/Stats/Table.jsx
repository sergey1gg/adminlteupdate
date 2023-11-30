import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { kiosks_items_report } from '../../actions/stats-api';
import { PieItemsReport } from './PieItemsReport';
import { TableTotalReport } from './TableTotalReport';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import * as XLSX from 'xlsx';

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

    const exportToExcel = () => {
        const ws = XLSX.utils.table_to_sheet(document.getElementById('example1'));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Сохраняем файл
        XLSX.writeFile(wb, 'table.xlsx');
    };

    const exportToPDF = () => {

        const table = document.getElementById('example1');

        const tableData = [];

        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            const rowData = [];

            for (let j = 0; j < row.cells.length; j++) {
                const cell = row.cells[j];

                rowData.push(cell.textContent.trim());
            }

            tableData.push(rowData);
        }

        const documentDefinition = {
            content: [
                {
                    table: {
                        body: tableData,
                    },
                },
            ],
            defaultStyle: {
                fontSize: 8, // Установите желаемый размер шрифта для всего документа
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
            {serviceTableData && <PieItemsReport data={serviceTableData} />}
            {serviceTableData && <TableTotalReport date={date} />}
        </>
    )
}

