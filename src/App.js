import "./App.css";
import Header from "./Component/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import { createContext, useState } from "react";
import PrivetRoute from "./Component/PrivetRoute/PrivetRoute";
import Admin from "./Component/Admin/Admin";
import Home from "./Component/Home/Home";
import Checkout from "./Component/Checkout/Checkout";
import Shiping from "./Component/Shiping/Shiping";
import Orders from "./Component/Orders/Orders";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className="App">
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              <Home />
            </Route>
            <Route path="/login">
              <Header />
              <Login />
            </Route>
            <PrivetRoute path="/admin">
              <Admin />
            </PrivetRoute>
            <PrivetRoute path="/buy/:product/:id">
              <Header />
              <Checkout />
            </PrivetRoute>
            <Route path="/checkout/:product/:id">
              <Header />
              <Shiping />
            </Route>
            <PrivetRoute path="/orders">
              <Header />
              <Orders />
            </PrivetRoute>
            <Route path="*">
              <h2>NOT found</h2>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
