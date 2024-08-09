import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => (
  <Modal show={true} centered>
    <Modal.Body style={{backgroundColor: "transparent"}}>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
        <div className="spinner-border text-info" role="status">
          {/* <span className="sr-only"></span> */}
        </div>
        {/* <FaSpinner color='text-blue-500' className="spinner " /> */}
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

export default Loader;
