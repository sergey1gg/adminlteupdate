import { useState } from "react";
import { serviceFinish } from "../../actions/service-api";
import { useNavigate } from "react-router-dom";

export const FinishModal = ({service_id }) => {
  const navigate = useNavigate()
    const [comment, setComment]=useState("")
    return (
      <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Finish</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
             <p>Comment</p>
             <input type="text" 
             value={comment}
             onChange={(e)=> setComment(e.target.value)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal"
              onClick={()=> serviceFinish(service_id, comment).then(()=> window.location.href="/service")}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  