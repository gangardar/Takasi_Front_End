import React, { useContext, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useUpdatePassenger from "../services/queries/useUpdatePassenger";
import AuthContext from "../services/contexts/authContext";

interface Props {
  showLogout: boolean;
  logoutToggle: () => void;
}

const PassengerPhoto = ({ showLogout, logoutToggle }: Props) => {
  const { authResponse } = useContext(AuthContext);
  const upload = useUpdatePassenger();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleClick = async () => {
    if (!selectedFile) {
      return; // No file selected, handle accordingly (e.g., show an error message).
    }
    const formData = new FormData();
    formData.append("photo", selectedFile!);

    try {
      // Upload the profile using the useUpdatePassenger mutation
      await upload.mutateAsync(formData);

      // Close the modal after the upload is complete
      logoutToggle();
    } catch (error) {
      // Handle any errors that occurred during the upload (e.g., show an error message).
      console.error("Error uploading profile:", error);
    }
  };

  return (
    <Modal show={showLogout} onHide={logoutToggle} animation={true}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Upload Your Profile</Form.Label>
            <Form.Control
              type="file"
              ref={fileInputRef}
              autoFocus
              onChange={handleFileChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClick}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PassengerPhoto;
