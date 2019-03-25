const usernameField = document.getElementById("input-username");
const passwordField = document.getElementById("input-password");
const form = document.querySelector("form");
const outputText = document.getElementById("output-text");

let accessDenierCount = 0;
let seconds = 30;

const usernamesAndPasswords = {
  Yasha: "longsword",
  Beauregard: "bow",
  Nott: "dagger",
  Jester: "lollipop",
  Caleb: "flame",
  Fjord: "falchion",
  Mollymauk: "trickery"
};

function submitCredentials(e) {
  e.preventDefault();
  console.log(accessDenierCount);

  // outputText.innerHTML = "Hello!";
  for (let i = 0; i < Object.keys(usernamesAndPasswords).length; i++) {
    if (usernameField.value === Object.keys(usernamesAndPasswords)[i]) {
      if (passwordField.value === Object.values(usernamesAndPasswords)[i]) {
        outputText.innerHTML = `Welcome back ${
          Object.keys(usernamesAndPasswords)[i]
        }`;

        usernameField.value = "";
        passwordField.value = "";
      } else {
        accessDenierCount++;
        outputText.innerHTML = "Please try again!" + accessDenierCount;
        usernameField.value = "";
        passwordField.value = "";
      }
    }
  }
  accessDenied();
}

function accessDenied() {
  if (accessDenierCount === 3) {
    usernameField.setAttribute("disabled", true);
    passwordField.setAttribute("disabled", true);
    setCountdown();
  }
}

function setCountdown() {
  outputText.innerHTML = `Access denied. Please try again in ${seconds} ${
    seconds >= 10 ? "seconds" : "second"
  }.`;
  seconds -= 1;

  if (seconds >= 0) {
    setTimeout(setCountdown, 1000);
  } else if (seconds < 0) {
    resetLogin();
  }
}

function resetLogin() {
  usernameField.removeAttribute("disabled", true);
  passwordField.removeAttribute("disabled", true);
  accessDenierCount = 0;
  seconds = 30;

  outputText.innerHTML = "Please try again.";
}

form.addEventListener("submit", e => submitCredentials(e));
