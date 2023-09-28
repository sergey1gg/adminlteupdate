import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ServiceModal = ({kiosk }) => {
  const [startService, setStartService] =useState()
  const navigate=useNavigate()
    return (
      <div className="modal fade" id="exampleModal3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Starting service in {kiosk?.name}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=> navigate(`/service/${kiosk?.id}`)}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  