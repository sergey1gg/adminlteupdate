import React, { useEffect, useState } from 'react'
import Select from "react-select";


export const OptionsSelect = ({dateReq, data, name, selectedOptions, setSelectedOptions, disabled}) => {

    function handleSelect(data) {
        setSelectedOptions(data);
        
    }
  
    return (
        <div className="text-start ml-2">
            <h5>{name}</h5>
            <div className="dropdown-container">
                <Select
                    options={data}
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti={true}
                    isDisabled={disabled}
                />
            </div>
        </div>
    );
}