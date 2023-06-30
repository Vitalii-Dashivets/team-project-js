// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyAWL009d3fIg7FDNeFa1MpQ8vcCju1UWEQ',
//   authDomain: 'project-js-fson82.firebaseapp.com',
//   projectId: 'project-js-fson82',
//   storageBucket: 'project-js-fson82.appspot.com',
//   messagingSenderId: '729076020797',
//   appId: '1:729076020797:web:e3a2da2c14a169a281dc54',
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAWL009d3fIg7FDNeFa1MpQ8vcCju1UWEQ',
  authDomain: 'project-js-fson82.firebaseapp.com',
  databaseURL: 'https://project-js-fson82-default-rtdb.firebaseio.com',
  projectId: 'project-js-fson82',
  storageBucket: 'project-js-fson82.appspot.com',
  messagingSenderId: '729076020797',
  appId: '1:729076020797:web:e3a2da2c14a169a281dc54',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Reference messages collection
let messagesRef = firebase.database().ref('contactformmessages');

// все значения формы и передадим их в Firebase при отправке формы
$('#contactForm').submit(function (e) {
  e.preventDefault();

  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: $('.fullname').val(),
    email: $('.email').val(),
    subject: $('.subject').val(),
    message: $('.message').val(),
  });

  $('.success-message').show();

  $('#contactForm')[0].reset();
});
