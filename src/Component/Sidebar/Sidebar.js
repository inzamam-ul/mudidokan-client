import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useRouteMatch } from "react-router-dom";

const Sidebar = () => {
  const { url } = useRouteMatch();
  return (
    <>
      <Link to="/">
        <Navbar.Brand>
          <h3 className="brand my-3 brand-admin">MudiDokan.com</h3>
        </Navbar.Brand>
      </Link>

      <Nav className="align-items-center admin-menu text-left flex-column header">
        <NavLink
          activeClassName="is-active"
          className="nav-link py-3"
          to={`${url}/manage`}
        >
          Manage Product
        </NavLink>
        <NavLink
          activeClassName="is-active"
          className="nav-link py-3"
          to={`${url}/addProduct`}
        >
          Add Product
        </NavLink>
        <NavLink
          activeClassName="is-active"
          className="nav-link py-3"
          to={`${url}/edit`}
        >
          Edit Product
        </NavLink>
      </Nav>
    </>
  );
};

export default Sidebar;
