import React, { useState, useEffect } from "react";
import { LOGOUT } from "../../actions/types";

import Container from "react-bootstrap/Container";
//import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import Button from "react-bootstrap/Button";

import decode from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import instaverse from "../../images/instaverse.png";

import Avatar from "react-avatar";
import "./NavBar.css";

function NavBar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    // אם יש טוקן והוא פג תוקף יצא מהאפליקציה
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/auth");

    setUser(null);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Instaverse</Navbar.Brand>
          <img src={instaverse} alt="instaverse" height="60px" />

          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
          {/* <Nav>
            <Nav.Link eventKey={2} href="#memes">
              <Link to="/auth">Sign In</Link>
            </Nav.Link> */}

          {/* <Nav.Link eventKey={2} href="/auth"> */}
          {user ? (
            <div className="profile">
              {/* <img src={user.result.imageUrl} alt="instaverse" height="60px" /> */}
              <Avatar
                name={user.result.name.charAt(0)}
                color={Avatar.getRandomColor("sitebase", [
                  "red",
                  "green",
                  "blue",
                ])}
                size="50"
                round={true}
              />{" "}
              <Navbar.Brand href="/">{user.result.name}</Navbar.Brand>
              <Link className="button-85 m-2" to="/auth" onClick={logout}>
                Logout
              </Link>
              {/* <Button className="button-85 m-2" onClick={logout}>
                Logout
              </Button> */}
            </div>
          ) : (
            <Link className="button-85 m-2" to="/auth">
              Sign In
            </Link>
            // <Button className="button-85 m-2" component={Link} to="/auth">
            //   Sign In
            // </Button>
          )}
          {/* </Nav.Link> */}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
