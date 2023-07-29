import React, { Suspense, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PassengerFormData } from "./PassengerReg";
import { FaAlignJustify, FaUserLarge } from "react-icons/fa6";
import APIClient from "../services/api-client";

const apiClient = new APIClient<number>("passenger/disable");

interface Props {
  passenger: PassengerFormData;
}
const PassengerAdminModal = ({ passenger }: Props) => {
  // Passenger Delete Modal State
  const [bolDeleteModal, setBolDeleteModal] = useState(!!passenger);
  useEffect(() => {
    setBolDeleteModal(!!passenger);
  }, [passenger]);
  //   const deleteModal = () => passenger ?? setBolDeleteModal(true);
  const removeDeleteModal = () => setBolDeleteModal(false);

  return (
    <Modal show={bolDeleteModal} onHide={removeDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form key={passenger?.id}>
          <div className="d-flex justify-content-center">
            <div className=" ">
              {passenger?.photo === null ? (
                <div
                  className="bg-primary align-items-center p-4 rounded-circle shadow-2"
                  style={{ height: "100px", width: "100px", fontSize: "3rem" }}
                >
                  <i className="text-gray-500">
                    <FaUserLarge />
                  </i>
                </div>
              ) : (
                <img
                  src={passenger?.photo}
                  className="rounded-circle w-100 h-100 object-cover"
                  alt="Profile Picture"
                />
              )}
            </div>
          </div>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={passenger?.email}
              readOnly
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={passenger?.status}
              readOnly
              placeholder="Staus"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={passenger?.name}
              readOnly
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={passenger?.phone}
              readOnly
              placeholder="Phone"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={passenger?.age}
              readOnly
              placeholder="Age"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="success" onClick={removeDeleteModal}>
          Update
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            removeDeleteModal();
            console.log(passenger);
            {
              passenger && apiClient.suspend(passenger.id!);
            }
          }}
        >
          Suspend
        </Button>
        <Button variant="danger" onClick={removeDeleteModal}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PassengerAdminModal;
