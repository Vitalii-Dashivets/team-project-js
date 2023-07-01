import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
   setPersistence, browserSessionPersistence 
} from 'firebase/auth';

import { onBtnInSelect, onBtnUpSelect, firebaseConfig, dataUser, authStates, writeUserData,readUserData,onLogout } from './firebase-api.js';

const refsBtn = {
     btnUp : document.querySelector('button[data-action=signup]'),
     btnIn : document.querySelector('button[data-action=signin]'),
     btnLogout : document.querySelector('button[data-action=logout]'),
     form : document.querySelector('.form'),
     userP: document.querySelector('.user'),
    formBtn: document.querySelector("#formBtn"),
     
}

refsBtn.btnUp.style.color = 'blue';
refsBtn.btnUp.style.textDecoration = 'underline';

refsBtn.form.addEventListener('submit', onFormSubmit);
refsBtn.btnUp.addEventListener('click', onBtnUpSelect);
refsBtn.btnIn.addEventListener('click', onBtnInSelect);
refsBtn.btnLogout.addEventListener('click', onLogout);




function onFormSubmit(event) {

  event.preventDefault();
  
  dataUser.username = event.target.name.value;
  dataUser.email = event.target.email.value;
  const password = event.target.password.value;
  dataUser.shoppingList = '';
    
  
  refsBtn.form.name.value = '';
  refsBtn.form.email.value = '';
  refsBtn.form.password.value = '';
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  if (authStates.type === 'signup') {
    createUserWithEmailAndPassword(auth, dataUser.email,password)
      .then(userCredential => {
        
        const user = userCredential.user;
        dataUser.userId = user.uid;
         
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
         });
  } else if (authStates.type === 'signin') {
      
    signInWithEmailAndPassword(auth, dataUser.email,password)
      .then(userCredential => {
       
        const user = userCredential.user;
        dataUser.userId = user.uid;
       

        setTimeout(() => {
          writeUserData(dataUser);
          readUserData(dataUser.userId);
        }, 3000);
        
        
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  }



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
    .then(() => {
               
        signInWithEmailAndPassword(auth, email, password);
      })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


function startLoadingSets() {
  try {
    
    const storageData = sessionStorage.getItem('firebase:authUser:AIzaSyAWL009d3fIg7FDNeFa1MpQ8vcCju1UWEQ:[DEFAULT]');

    if (storageData === null) {
      return;
    }
    else {
      const parsedDataSS = JSON.parse(storageData);
      dataUser.userId = parsedDataSS.uid;
      authStates.status = true;
      readUserData(dataUser.userId);
    }
  }
  catch {
    return;
  }

  try {
    const localStorageData = localStorage.getItem('firebase:authUser:AIzaSyAWL009d3fIg7FDNeFa1MpQ8vcCju1UWEQ:[DEFAULT]');
    
    if (localStorageData === null) {
      return;
    }
    else {
      const parsedDataLS = JSON.parse(storageData);
      dataUser.userId = parsedDataLS.uid;
      authStates.status = true; 
      readUserData(dataUser.userId);
    }
  }
  catch {
       return;
  }
}

startLoadingSets();


  
export { dataUser ,refsBtn};
