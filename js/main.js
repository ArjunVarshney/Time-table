let menu = document.querySelector("header>span");
let sidebar = document.querySelector("aside");
let tablecontent = document.querySelector("tbody");
let groupHead = document.querySelector(".grouphead");

document.querySelector(".Hometime").style.display = "none";

menu.addEventListener("click", () => {
  if (menu.innerHTML == "close") {
    sidebar.style.width = "0";
    menu.innerHTML = "menu";
  } else {
    sidebar.style.width = "80%";
    menu.innerHTML = "close";
  }
});

function expand() {
  let menu = document.querySelector(".expand");
  let groupcategories = document.querySelector(".groupcategories");
  menu.classList.toggle("menuopen");
  groupcategories.classList.toggle("expanded");
}

function changeDay(element) {
  day = parseInt(element.id);
  fetchAndSet();
}

let changeGroup = (element) => {
  localStorage.setItem("group", element.innerHTML);
  group = element.innerHTML;
  window.location.reload();
};
