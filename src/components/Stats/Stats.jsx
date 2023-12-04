import React, { useEffect, useState } from 'react'
import { DatePicker } from '../../utils/DatePicker';
import { OptionsSelect } from '../../utils/OptionsSelect';
import { Filter } from '../../utils/Filter';
import { kiosks_orders_report } from '../../actions/stats-api';
import { ChartC } from './Chart';
import { Table } from './Table';
import { PieOrders } from './PieOrders';

export const Stats = () => {
  const [dateReq, setDateReq] = useState({ from: null, to: null });
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();

  const [filters, setFilters] = useState()


  const [selectedKiosk, setSelectedKiosk] = useState();
  const [selectedOperation, setSelectedOperation] = useState();
  const [selectedOptions, setSelectedOptions] = useState(); //выбранный фильтр
  useEffect(() => {
    setFilters(JSON.parse(localStorage.getItem("filters")))
  }, [])
console.log(data)
  useEffect(() => {
    async function fetchData() {
      const res = await kiosks_orders_report(dateReq.from, dateReq.to)
      setData(res)
  
    }
    if ((dateReq.from < dateReq.to) || (dateReq.from === dateReq.to) && dateReq.to && dateReq.from) {
      fetchData()
    }
  }, [dateReq])

  useEffect(() => {
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
    setFilteredData(filteredByOperation)
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
        setFilteredData(filteredByOperation)
      }
    }
  }
   

  }, [selectedKiosk, selectedOperation, selectedOptions])

  const kiosksData = [...new Set(data?.map(e => e.kiosk_name))].map(value => ({
    value,
    label: value,
  }));
  const statusData = [...new Set(data?.map(e => e.status_name))].map(value => ({
    value,
    label: value,
    
  }));

  return (
    <div className='content-wrapper p-2'>
      <div className='d-flex flex-column flex-md-row ml-0 ml-md-2 align-items-md-center '>
        <DatePicker setDateReq={setDateReq} />
        <OptionsSelect data={kiosksData} name={"Киоски"} selectedOptions={selectedKiosk} setSelectedOptions={setSelectedKiosk} disabled={selectedOptions? true: false}/>
        <OptionsSelect data={statusData} name={"Операции"} selectedOptions={selectedOperation} setSelectedOptions={setSelectedOperation} disabled={selectedOptions? true: false} />
        <Filter selectedData={{ kiosks: selectedKiosk, operations: selectedOperation }} filters={filters} setFilters={setFilters}
          selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
      </div>
      {data && <ChartC selectedFilter={selectedOptions} selectedKiosk={selectedKiosk} selectedOperation={selectedOperation} data={filteredData? filteredData: data} />}
      {data && <PieOrders data={data} selectedKiosk={selectedKiosk} selectedOptions={selectedOptions}/>}
      {data && <Table date={dateReq} selectedKiosk={selectedKiosk} selectedOperation={selectedOperation} selectedOptions={selectedOptions} />}
    </div>
  );
};
