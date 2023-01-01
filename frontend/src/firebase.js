import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUVj71E9c-2PDB5ZhNxKR2psv3MZ2AQ3M",
    authDomain: "social-epics.firebaseapp.com",
    projectId: "social-epics",
    storageBucket: "social-epics.appspot.com",
    messagingSenderId: "1005035958567",
    appId: "1:1005035958567:web:e5f5ff905accd7369f7902",
    measurementId: "G-K8603XCBE7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();

const authPhone = getAuth();
function verifyPhone(number){
    const recaptchaVerifier = new RecaptchaVerifier('sign-in-phone-number', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        //   onSignInSubmit();
        // console.log(response);s
        }
    }, authPhone);
    return signInWithPhoneNumber(authPhone, number, recaptchaVerifier);
}

// AUTHENTICATION FOR LOGIN
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();


export { auth, verifyPhone, provider };
export default db;