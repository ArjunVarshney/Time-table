let mode = document.querySelector(".mode");
let prevmode = localStorage.getItem("mode");
function changemode() {
  if (localStorage.getItem("mode") == "dark") {
    localStorage.setItem("mode", "light");
    mode.innerText = "light_mode";
    lightmode();
  } else {
    localStorage.setItem("mode", "dark");
    mode.innerText = "dark_mode";
    darkmode();
  }
}

if (localStorage.getItem("mode") == null) {
  changemode();
} else {
  changemode();
  changemode();
}
mode.addEventListener("click", changemode);

function lightmode() {
  let root = document.querySelector(":root");
  root.style.setProperty("--primary", "#ffffff");
  root.style.setProperty("--secondarytext", "#202124");
  root.style.setProperty("--secondary", "#5f6368");
  root.style.setProperty("--side", "#ffffff");
  root.style.setProperty("--secondaryside", "#dfdfdf");
}
function darkmode() {
  let root = document.querySelector(":root");
  root.style.setProperty("--primary", "#202124");
  root.style.setProperty("--secondarytext", "#e8eaed");
  root.style.setProperty("--secondary", "#5f6368");
  root.style.setProperty("--side", "#303134");
  root.style.setProperty("--secondaryside", "#3c3d40");
}
