import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  console.log(loggedInUser);
  return (
    <div className="bg-light">
      <Navbar className="container" expand="lg">
        <Link to="/">
          <Navbar.Brand>
            <h3 className="brand">MudiDokan.com</h3>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto align-items-center header">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/orders">
              Orders
            </Link>
            <Link className="nav-link" to="/admin">
              Admin
            </Link>

            {loggedInUser.email ? (
              <span className="rounded p-2 bg-light">
                <img
                  style={{ height: 40, borderRadius: 50 }}
                  src={loggedInUser.picture}
                  alt=""
                />
                Welcome, {loggedInUser.displayName || loggedInUser.name}
              </span>
            ) : (
              <Link className="nav-link" to="/login">
                <button
                  type="submit"
                  className="btn-outline-secondary cancle rounded"
                >
                  Login
                </button>
              </Link>
            )}
            {loggedInUser.email && (
              <button
                onClick={() => setLoggedInUser({})}
                className="btn logout nav-link btn-custom"
              >
                Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
