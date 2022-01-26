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
const suoliMsgBackground = document.getElementById("suoliMsgBackground");
const divMsg = document.querySelector(".signUpMsg");
const mainDiv = document.getElementById("mainDiv");
const suoliDiv = document.getElementById("suoli");

const passwordHashing = (password) => {
  const sha = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" },{ numRounds: 1 });
  sha.update(password);
  const hashedPassword = sha.getHash("HEX");
  return hashedPassword;
};

const directToMainDiv = () => {
  suoliMsgBackground.classList.remove("visible");
  divMsg.classList.remove("visible");
  mainDiv.classList.add("flex");
  suoliDiv.classList.remove("flex");
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
  divMsg.classList.toggle("visible");
  suoliMsgBackground.classList.toggle("visible");
  const isTheInputOk = checkingInputValues(val);

  if (isTheInputOk === true) {
    const http = new XMLHttpRequest();
    http.open("POST", "/signingUp", true);
    http.setRequestHeader("content-type", "application/json");

    const hashedPassword = passwordHashing(SUpassword.value);
    console.log("sign up hash " + hashedPassword);

    const newUserObject = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: SUemail.value,
      password: hashedPassword,
    };

    http.send(JSON.stringify(newUserObject));

    http.onload = () => {
      if (http.response === "error") {
        alert("This emai already exist in the database. try logging in !");
      } else {
        suoliMsgBackground.addEventListener("click", directToMainDiv);
        backToMainBtn.addEventListener("click", directToMainDiv);
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

const startSuoliHandler = () => {
  mainDiv.classList.remove("flex");
  suoliDiv.classList.add("flex");
};

const endSuoliHandler = () => {
  mainDiv.classList.add("flex");
  suoliDiv.classList.remove("flex");
};

const logInBtnHandler = () => {
  const val = [LIemail, LIpassword];
  const isTheInputOk = checkingInputValues(val);
  if (isTheInputOk) {
    const http = new XMLHttpRequest();
    http.open("POST", "/logingIn", true);
    http.setRequestHeader("content-type", "application/json");

    console.log("log in hash"+passwordHashing(LIpassword.value));

    const enteringUserObject = {
      email: LIemail.value,
      password: passwordHashing(LIpassword.value)
    };

    http.send(JSON.stringify(enteringUserObject));
    http.onload = () => {
      if (http.response) {
        const resp = JSON.parse(http.response);
        mainDiv.innerHTML = `<h2 id="mainTitle">Hello ${resp.firstName} ${resp.lastName} ! Great to see you!</h2>
      <button id='logOutBtn' type="button">log out</button>`;
        suoliMsgBackground.classList.add("visible");
        divMsg.classList.add("visible");
        //suoliMessenger.classList.remove("visible");
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

backToMainBtn.addEventListener("click", directToMainDiv);
logedInRedirect.addEventListener("click", RedirectHandler);
signUpRedirect.addEventListener("click", RedirectHandler);
signUpBtn.addEventListener("click", signUpBtnHandler);
startSuoliBtn.addEventListener("click", startSuoliHandler);
logInBtn.addEventListener("click", logInBtnHandler);
