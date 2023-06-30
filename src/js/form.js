
// import { getCities } from "./firebase";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const btnUp = document.querySelector("button[data-action=signup]");
const btnIn = document.querySelector("button[data-action=signin]");
const form = document.querySelector(".form");
const formBtn = document.querySelector("#formBtn");

let statusAuth = "signup";
btnUp.style.color = 'blue';
btnUp.style.textDecoration = 'underline';

form.addEventListener("submit",onFormSubmit)
btnUp.addEventListener('click', onBtnUpSelect);
btnIn.addEventListener('click', onBtnInSelect);

const dataUser = {
    name:'',
    email: '',
    password: '',
    authType: statusAuth,
}

function onBtnInSelect() {
    if (statusAuth === 'signin') {
        return;
    }
    
    statusAuth = "signin";
    formBtn.textContent = 'SIGN IN';
    btnIn.style.color = 'blue';
    btnIn.style.textDecoration = 'underline';
    btnUp.style.color = 'black';
    btnUp.style.textDecoration = 'none';

}
function onBtnUpSelect() {
    if (statusAuth === 'signup') {
        return;
    }
    
    statusAuth = "signup";
    formBtn.textContent = 'SIGN UP';
    btnUp.style.color = 'blue';
    btnUp.style.textDecoration = 'underline';
    btnIn.style.color = 'black';
    btnIn.style.textDecoration = 'none';
}

console.log(form);

function onFormSubmit(event) {
    event.preventDefault();
    dataUser.name = form.name.value;
    dataUser.email = form.email.value;
    dataUser.password = form.password.value;
    dataUser.authType = statusAuth;
    console.log(form.email.value);
    console.log(form.password.value);
    console.log(dataUser);
    form.name.value = '';
    form.email.value = '';
    form.password.value = '';
    // getCities();

    const firebaseConfig = {
  apiKey: "AIzaSyAWL009d3fIg7FDNeFa1MpQ8vcCju1UWEQ",
  authDomain: "project-js-fson82.firebaseapp.com",
  projectId: "project-js-fson82",
  storageBucket: "project-js-fson82.appspot.com",
  messagingSenderId: "729076020797",
  appId: "1:729076020797:web:e3a2da2c14a169a281dc54"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const auth = getAuth();
createUserWithEmailAndPassword(auth, dataUser.email,dataUser.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


}
export { dataUser };