import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AddProduct from "../AddProduct/AddProduct";
import ManageProduct from "../MnageProduct/ManageProduct";
import Sidebar from "../Sidebar/Sidebar";
import "./Admin.css";

const Admin = () => {
  const { path } = useRouteMatch();
  return (
    <div className="container-fluid ps-0">
      <div className="row">
        <div className="col-md-3 sticky-top px-0 admin-bar bg-custom">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Switch>
            <Route exact path={path}>
              <ManageProduct />
            </Route>
            <Route path={`${path}/addProduct`}>
              <AddProduct />
            </Route>
            <Route path={`${path}/manage`}>
              <ManageProduct />
            </Route>
            <Route path={`${path}/edit`}>
              <h2 className="mt-5">Comming soon.....</h2>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Admin;
