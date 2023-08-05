import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { FaAlignJustify } from "react-icons/fa6";
import AuthContext from "../../services/contexts/authContext";

interface Props {
  Toggle: () => void;
}

const NavAdmin = ({ Toggle }: Props) => {
  const { authResponse } = useContext(AuthContext);
  const admin = authResponse?.user;
  console.log("admin", authResponse);
  return (
    <div>
      <Navbar className="bg-transparant">
        <Container>
          <Navbar.Brand href="#home" className=" text-info fs-8">
            <i onClick={Toggle}>{<FaAlignJustify />}</i>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="text-light fs-6">
              Signed in as:{" "}
              <a href="#login" className="text-white">
                {admin?.name}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavAdmin;
