import React, { useState } from 'react'
import Select from 'react-select';
import { FilterModal } from '../components/Stats/FilterModal';

export const Filter = ({selectedData, filters, setFilters, selectedOptions, setSelectedOptions}) => {

    const optionList = filters?.map((e) => e.name).map((value) => ({
        value,
        label: value,
      }));
      
    function handleSelect(data) {
        setSelectedOptions(data);   
    }
    return (
        <>
        <div className="text-start ml-2">
            <h5>Фильтры</h5>
            <div className="d-flex flex-row justify-content-between">
                <Select
                    options={optionList}
                    value={selectedOptions}
                    onChange={handleSelect}
                    isClearable={true}
                    isSearchable={true}
                    hideSelectedOptions={true}
                    
                />
                <button className='btn btn-primary ml-2' data-toggle="modal" data-target='#exampleModal' 
                
                >Создать Фильтр</button>
            </div>
        </div>
        <FilterModal selectedData={selectedData} filters={filters} setFilters={setFilters}/>
        </>
    );
}