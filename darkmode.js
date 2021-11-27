let mode = document.querySelector(".mode");
mode.addEventListener("click", () => {
  if (mode.innerText == "dark_mode") {
    mode.innerText = "light_mode";
    lightmode();
  } else {
    mode.innerText = "dark_mode";
    darkmode();
  }
});

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

// #5f6368
// #202124

// #dadce0
