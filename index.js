const login = document.querySelector('form'),
    button = login.querySelector('button'),
    title = document.querySelector('.title');

function handleLogin() {
    const id = login.querySelector('input').text;
    const pw = login.querySelector('input').text;
    console.log(id,pw);
}

function signIn() {
    login.addEventListener(button, handleLogin);
}

function speicalIn() {
    title.outerHTML='<a href="main.html">Come here</a>'
}

function titleEvent() {
    title.addEventListener('mouseover', speicalIn);
}

function init() {
    signIn();
    titleEvent();
}

init();