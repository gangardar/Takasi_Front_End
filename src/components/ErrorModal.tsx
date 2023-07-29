import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ErrorModal = (error: Error) => {
  const [errorState, setErrorState] = useState(!!error);
  const close = () => setErrorState(false);
  return (
    <Modal show={errorState} onHide={close} className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error.message}</Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
