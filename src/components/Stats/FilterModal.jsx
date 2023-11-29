import React, { useState } from 'react'

export const FilterModal = ({ selectedData, filters, setFilters }) => {
  const [nameFilter, setNameFilter] = useState("")
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Создать Фильтр</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className='d-flex flex-row justify-content-between'>
              <div className='d-flex flex-column '>
                <h4>Киоски</h4>
                {selectedData?.kiosks?.map((i, index) => (
                  <span key={index}>{i.value}</span>
                ))}
              </div>
              <div className='d-flex flex-column'>
                <h4>Операции</h4>
                {selectedData?.operations?.map((i, index) => (
                  <span key={index}>{i.value} </span>
                ))}
              </div>
            </div>
            <div className='d-flex align-items-center mt-5'>
              <input type="text" placeholder='Введите имя'
              disabled={!selectedData || (!selectedData.kiosks || selectedData.kiosks.length < 1) || (!selectedData.operations || selectedData.operations.length < 1)}
                onChange={(e) => setNameFilter(e.target.value)}
                value={nameFilter} />
              <button className='btn btn-sm btn-success'
                disabled={nameFilter && nameFilter.length > 0 ? false : true}
                onClick={() => {
                  const existingFilters = JSON.parse(localStorage.getItem('filters')) || [];
                  const newFilter = {
                    name: nameFilter,
                    kiosks: selectedData.kiosks,
                    operations: selectedData.operations,
                  };
                  existingFilters.push(newFilter);
                  setNameFilter("")
                  localStorage.setItem('filters', JSON.stringify(existingFilters));
                  setFilters(existingFilters)
                }}>Подтвердить</button>
            </div>
            <div>
              <span>Мои Фильтры</span>
              {filters && filters?.map((e, index) => (
                <div key={index}  className='border border-primary'>
                  <span>{e.name}</span>
                  <div>
                    <span>Kiosks:</span>
                    {e.kiosks?.map((i, kioskIndex) => (
                      <div key={kioskIndex}>
                        <span>{i.value}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <span>Operations:</span>
                    {e.operations?.map((j, operationIndex) => (
                      <div key={operationIndex}>
                        <span>{j.value}</span>
                      </div>
                    ))}
                  </div>
                  <button className='btn btn-sm btn-danger' onClick={()=>{
           const storedFilters = JSON.parse(localStorage.getItem('filters')) || [];
           const updatedFilters = storedFilters.filter((filter) => filter.name !== e.name);
           localStorage.setItem('filters', JSON.stringify(updatedFilters));
           setFilters(updatedFilters);
        }}>Удалить</button>
                </div>
              ))}
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal"
            >Cancel</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal">Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}
