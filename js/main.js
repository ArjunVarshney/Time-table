let menu = document.querySelector("header>span");
let sidebar = document.querySelector("aside");
let tablecontent = document.querySelector("tbody");
let groupHead = document.querySelector(".grouphead");
let style = getComputedStyle(document.body);

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

//change color and show the faculty name on click on the subject
const showFaculty = (container) => {
  if (container.innerText != container.dataset.faculty) {
    container.innerText = container.dataset.faculty;
    container.style.backgroundColor = style.getPropertyValue("--secondaryside");
  } else {
    container.innerText = container.dataset.subject;
    container.style.backgroundColor = style.getPropertyValue("--primary");
  }
};
