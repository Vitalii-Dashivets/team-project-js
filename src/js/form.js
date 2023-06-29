const btnUp=document.querySelector("button[data-action=signup]");
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
    dataUser.email = form.email.value;
    dataUser.password = form.password.value;
    dataUser.authType = statusAuth;
    console.log(form.email.value);
    console.log(form.password.value);
    console.log(dataUser);
    form.email.value = '';
    form.password.value = '';
}