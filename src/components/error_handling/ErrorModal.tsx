import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ErrorModal = (error: Error) => {
  const [errorState, setErrorState] = useState(!!error);
  const close = () => setErrorState(false);
  return (
    <Modal show={errorState} onHide={close} className="mt-3">
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center text-info">{error.message}</Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
