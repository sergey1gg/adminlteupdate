import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serviceAddSimple } from "../../actions/service-api";

export const AddHardModal = ({data, handleCheckboxChange, setAddModal}) => {

  console.log(data)
  const [startService, setStartService] =useState()
  const navigate=useNavigate()
    return (
      <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Remove step</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"
              onClick={()=> setAddModal({})}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal"
                onClick={()=> setAddModal({})}>Cancel</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=> 
                {setAddModal({}); handleCheckboxChange(0, data.item);}}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    );
  };