import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  intializeLoginFramework,
  logInUserWithEmailAndPassword,
} from "./LoginManager";
import "./Login.css";
import googleLogo from "../../images/google.png";

intializeLoginFramework();

const Login = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    emailValid: true,
    passwordValid: true,
    password: "",
    confirmPassword: "",
    newUser: false,
    photo: "",
    error: "",
    successful: false,
    passwordMached: true,
  });

  const handleSignUP = (e) => {
    e.preventDefault();
    if (
      user.name &&
      user.emailValid &&
      user.passwordValid &&
      user.passwordMached
    ) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          setUser(res);
          setLoggedInUser(res);
          res.success && history.replace(from);
        }
      );
    } else {
      const newUserInfo = { ...user };
      newUserInfo.error = "Please fill this from correctly";
      setUser(newUserInfo);
    }
  };

  //private route
  let history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: "/" };

  //email & password login
  const handleLogIn = (e) => {
    e.preventDefault();
    if (!user.newUser && user.email) {
      logInUserWithEmailAndPassword(user.email, user.password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        res.success && history.replace(from);
      });
    }
  };

  const handleChange = (e) => {
    let isFieldValid = true;

    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      if (!isFieldValid) {
        const newUserInfo = { ...user };
        newUserInfo.emailValid = false;
        setUser(newUserInfo);
      }
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const hasNumber = /\d{1}/.test(e.target.value);

      isFieldValid = hasNumber && isPasswordValid;

      const newUserInfo = { ...user };

      newUserInfo.passwordValid = isFieldValid;
      setUser(newUserInfo);
    }
    if (e.target.name === "confirmPassword") {
      const newUserInfo = { ...user };
      isFieldValid = e.target.value === newUserInfo.password;

      newUserInfo.passwordMached = isFieldValid;
      setUser(newUserInfo);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      if (newUserInfo.password === newUserInfo.confirmPassword) {
        newUserInfo.passwordMached = true;
      }
      if (e.target.name === "email") {
        newUserInfo.emailValid = true;
      }
      if (e.target.name === "password") {
        newUserInfo.passwordValid = isFieldValid;
      }

      setUser(newUserInfo);
    }
  };

  const { setLoggedInUser } = useContext(UserContext);

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  return (
    <div className="login d-flex mb-4 justify-content-center container">
      <div className="col-md-4 mb-4 rounded bg-custom p-3">
        <h3 className="py-2 mb-3">
          {user.newUser ? "Create an account" : "Login"}
        </h3>

        <form onSubmit={user.newUser ? handleSignUP : handleLogIn}>
          {user.newUser && (
            <input
              name="name"
              type="text"
              onBlur={handleChange}
              placeholder="Name"
            />
          )}
          <input
            name="email"
            type="text"
            onBlur={handleChange}
            placeholder="Email"
            required
          />
          {!user.emailValid && <p className="error">Email is not valid</p>}
          <input
            name="password"
            type="password"
            onBlur={handleChange}
            placeholder="Password"
            required
          />

          {!user.passwordValid && user.newUser && (
            <p className="error">Use at least one number</p>
          )}
          {!user.passwordMached && user.newUser && (
            <p className="error">Password not mached!!</p>
          )}
          {user.newUser && (
            <input
              name="confirmPassword"
              type="password"
              onBlur={handleChange}
              placeholder="Confirm Password"
              required
            />
          )}
          {!user.passwordMached && user.newUser && (
            <p className="error">Password not mached!!</p>
          )}
          <input
            type="submit"
            value={user.newUser ? "Create an account" : "Login"}
          />

          <p>
            {!user.newUser ? (
              <span>
                Don't have account?{" "}
                <span
                  className="underline"
                  onClick={() => {
                    const newUserInfo = { ...user };
                    newUserInfo.newUser = user.newUser ? false : true;
                    newUserInfo.password = "";

                    newUserInfo.error = "";
                    setUser(newUserInfo);
                  }}
                >
                  Create an account
                </span>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <span
                  className="underline"
                  onClick={() => {
                    const newUserInfo = { ...user };
                    newUserInfo.newUser = user.newUser ? false : true;
                    newUserInfo.error = "";
                    setUser(newUserInfo);
                  }}
                >
                  Login
                </span>
              </span>
            )}
          </p>
        </form>

        {user.error !== "" && <p style={{ color: "red" }}>{user.error}</p>}

        <p className="or">or</p>

        <button
          className="btn google-button btn-outline-secondary"
          onClick={googleSignIn}
        >
          <img className="google-Logo" src={googleLogo} alt="" />
          Continue with Google
        </button>

        {user.isSignedIn && <p>Welcome, {user.name}</p>}
        <br />
      </div>
    </div>
  );
};

export default Login;
