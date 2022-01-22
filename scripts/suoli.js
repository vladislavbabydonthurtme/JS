const suoliBtn = document.getElementById("souliBtn");
const signUpBtn = document.getElementById("signUpBtn");
const startSuoliBtn = document.getElementById("startSuoli");
const backToMainBtn = document.getElementById("backToMainBtn");
const logInBtn = document.getElementById("logInBtn");
const signUpRedirect = document.getElementById("signedUpRedirect");
const logedInRedirect = document.getElementById("logedInRedirect");

const form = document.querySelector("form");
const mainTitle = document.getElementById("mainTitle");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const SUemail = document.getElementById("SUemail");
const SUpassword = document.getElementById("SUpassword");
const LIemail = document.getElementById("LIemail");
const LIpassword = document.getElementById("LIpassword");

const souliFormDiv = document.getElementById("suoli");
const signUpForm = souliFormDiv.querySelectorAll("div")[0];
const logInForm = souliFormDiv.querySelectorAll("div")[1];
const suoliMessenger = document.getElementById("suoliMessenger");
const divMsg = document.querySelector(".signUpMsg");
const mainDiv = document.getElementById("mainDiv");
const suoliDiv = document.getElementById("suoli");

const directToMainDiv = () => {
  suoliMessenger.classList.toggle("visible");
  divMsg.classList.toggle("visible");
  mainDiv.classList.toggle("flex");
  suoliDiv.classList.toggle("flex");
};

const checkingInputValues = (val) => {
  let isTheInputOk = true;
  for (let i of val) {
    if (i.value === "") {
      i.classList.add("error");
      i.placeholder = `Incorrect ${i.name}`;
      isTheInputOk = false;
    } else {
      i.classList.remove("error");
    }
  }
  return isTheInputOk;
};

const signUpBtnHandler = () => {
  const val = [firstName, lastName, SUemail, SUpassword];

  const isTheInputOk = checkingInputValues(val);

  if (isTheInputOk === true) {
    divMsg.classList.toggle("visible");
    suoliMessenger.classList.toggle("visible");

    const http = new XMLHttpRequest();
    http.open("POST", "/signingUp", true);
    http.setRequestHeader("content-type", "application/json");

    const newUserObject = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: SUemail.value,
      password: SUpassword.value,
    };

    http.send(JSON.stringify(newUserObject));

    http.onload = () => {
      if (http.response) {
        suoliMessenger.addEventListener("click", suoliMessengerHandler);
        backToMainBtn.addEventListener("click", backToMainBtnHandler);
      }
    };
  } else {
    alert("You need to provide us with all the information required !");
  }
  firstName.value = "";
  lastName.value = "";
  SUemail.value = "";
  SUpassword.value = "";
};

const suoliMessengerHandler = () => {
  directToMainDiv();
};

const backToMainBtnHandler = () => {
  directToMainDiv();
};

const startSuoliHandler = () => {
  mainDiv.classList.toggle("flex");
  suoliDiv.classList.toggle("flex");
};

const logInBtnHandler = () => {
  const val = [LIemail, LIpassword];
  const isTheInputOk = checkingInputValues(val);
  if (isTheInputOk) {
    const http = new XMLHttpRequest();
    http.open("POST", "/logingIn", true);
    http.setRequestHeader("content-type", "application/json");
    const enteringUserObject = {
      email: LIemail.value,
      password: LIpassword.value,
    };
    http.send(JSON.stringify(enteringUserObject));
    http.onload = () => {
      if (http.response) {
        const resp = JSON.parse(http.response);
        mainDiv.innerHTML = `<h2 id="mainTitle">Hello ${resp.firstName} ${resp.lastName} ! Great to see you!</h2>
      <button id='logOutBtn' type="button">log out</button>`;
        divMsg.classList.toggle("visible");
        suoliMessenger.classList.toggle("visible");
        const logOutBtn = document.getElementById("logOutBtn");
        logOutBtn.addEventListener("click", logOutBtnHandler);
      } else {
        alert("No such user exists !");
      }
    };
  } else {
    alert("You need to provide us with all the information required !");
  }
  LIemail.value = "";
  LIpassword.value = "";
};

const RedirectHandler = () => {
  signUpForm.classList.toggle("visibility");
  logInForm.classList.toggle("visibility");
};

const logOutBtnHandler = () => {
  const http = new XMLHttpRequest();
  http.open("POST", "/logingOut", true);
  http.send();
  mainDiv.innerHTML = `<h2 id="mainTitle">Hello guest ! would you like to sign in ? </h2>
  <button id='startSuoli' type="button">Sign up / Log in</button>`;
  const startSuoliBtn2 = document.getElementById("startSuoli");
  startSuoliBtn2.addEventListener("click", startSuoliHandler);
};

backToMainBtn.addEventListener("click", backToMainBtnHandler);
logedInRedirect.addEventListener("click", RedirectHandler);
signUpRedirect.addEventListener("click", RedirectHandler);
signUpBtn.addEventListener("click", signUpBtnHandler);
startSuoliBtn.addEventListener("click", startSuoliHandler);
logInBtn.addEventListener("click", logInBtnHandler);
