/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASURENENT_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


//inicializar provedor de google
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorCode + ": " + errorMessage + email);
     
    });
}

const signInEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
};


const registerWithEmailAndPassword = async (name, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    user.displayName= name;
    updateProfile(user,{displayName: name})   

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + ": " + errorMessage);
  });
 
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  signInEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logout,
};
