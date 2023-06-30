import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { signOut } from 'firebase/auth';
// test update + push, update
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  push,
  update,
} from 'firebase/database';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';

const btnUp = document.querySelector('button[data-action=signup]');
const btnIn = document.querySelector('button[data-action=signin]');
const btnLogout = document.querySelector('button[data-action=logout]');
const form = document.querySelector('.form');
const formBtn = document.querySelector('#formBtn');
const userP = document.querySelector('.user');
let statusAuth = 'signup';
btnUp.style.color = 'blue';
btnUp.style.textDecoration = 'underline';

form.addEventListener('submit', onFormSubmit);
btnUp.addEventListener('click', onBtnUpSelect);
btnIn.addEventListener('click', onBtnInSelect);
btnLogout.addEventListener('click', onLogout);

const dataUser = {
  userId: '',
  name: '',
  email: '',
  password: '',
  authType: statusAuth,
  data: [],
};

const newData = ['mango', 'poly', 'ajax', 'dinamo'];
// console.log(dataUser);
function onBtnInSelect() {
  if (statusAuth === 'signin') {
    return;
  }

  statusAuth = 'signin';
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

  statusAuth = 'signup';
  formBtn.textContent = 'SIGN UP';
  btnUp.style.color = 'blue';
  btnUp.style.textDecoration = 'underline';
  btnIn.style.color = 'black';
  btnIn.style.textDecoration = 'none';
}

// console.log(form);

const firebaseConfig = {
  apiKey: 'AIzaSyAWL009d3fIg7FDNeFa1MpQ8vcCju1UWEQ',
  authDomain: 'project-js-fson82.firebaseapp.com',
  projectId: 'project-js-fson82',
  storageBucket: 'project-js-fson82.appspot.com',
  messagingSenderId: '729076020797',
  appId: '1:729076020797:web:e3a2da2c14a169a281dc54',
};

function onFormSubmit(event) {
  event.preventDefault();
  dataUser.name = form.name.value;
  dataUser.email = form.email.value;
  dataUser.password = form.password.value;
  dataUser.authType = statusAuth;
  dataUser.data = [2, 4, 5, 7, 8, 9];
  // console.log(form.email.value);
  // console.log(form.password.value);
  // console.log(dataUser);
  form.name.value = '';
  form.email.value = '';
  form.password.value = '';

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const database = getDatabase();

  if (statusAuth === 'signup') {
    createUserWithEmailAndPassword(auth, dataUser.email, dataUser.password)
      .then(userCredential => {
        // Signed in

        const user = userCredential.user;
        dataUser.userId = user.uid;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  } else if (statusAuth === 'signin') {
    signInWithEmailAndPassword(auth, dataUser.email, dataUser.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.uid);
        dataUser.userId = user.uid;
        console.log(dataUser);
        userP.textContent = `User: ${dataUser.email} ID: ${dataUser.userId}`;

        setTimeout(() => {
          writeUserData(dataUser);
        }, 10000);
        readUserData(dataUser.userId);
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode:', errorCode, ' ', errorMessage);
        alert(errorMessage);
      });
  }
}

function writeUserData({ userId, name, email, password, data }) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    password: password,
    data: data,
  });
}

function readUserData(userId) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function updateUserData({ array, userId }) {
  const db = getDatabase();
  const postData = array;

  const updates = {};
  updates['users/' + userId + '/data/'] = postData;
  console.log('updates: ', updates);
  return update(ref(db), updates);
}

//  test update // A post entry
function writeNewPost({ uid, username }) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    author: username,
    uid: uid,
    body: 'body',
    title: 'title',
    authorPic: 'picture',
  };
  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;
  console.log('newPostKey', newPostKey);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  // updates['/posts/' + newPostKey] = postData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  updates['users/' + uid + '/data/'] = postData;
  //
  return update(ref(db), updates);
}
//  test update

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.

    signInWithEmailAndPassword(auth, email, password);
    // Signed in

    //         });
  })
  .catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

function onLogout() {
  const auth = getAuth();
  console.log('dataUser to: ', dataUser);
  // writeNewPost({
  //   uid: dataUser.userId,
  //   username: dataUser.name,
  // });
  updateUserData({
    userId: dataUser.userId,
    array: newData,
  });
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}
export { dataUser };
