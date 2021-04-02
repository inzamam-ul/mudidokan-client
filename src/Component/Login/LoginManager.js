import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const intializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};

//google sign in
export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        successful: true,
      };
      return signedInUser;
    });
};

//update user name
const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful.
      console.log("User name updated successfully");
    })
    .catch(() => {
      // An error happened.
      console.log("User name dosen't updated successfully");
    });
};

// login user
export const logInUserWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userInfo) => {
      // Signed in
      const newUserInfo = userInfo.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      return newUserInfo;

      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

//Create user with email and password
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      newUserInfo.name = name;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const errorMessage = error.message;
      let newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
      // ..
    });
};
