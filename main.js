let menu = document.querySelector("header>span");
let sidebar = document.querySelector("aside");
let day = document.querySelector(".day");
let tablecontent = document.querySelector("tbody");
let subject,
  code,
  weekday,
  sno,
  str = "";
let faculty = [
  ["Dr. Geeta Verma"],
  ["Dr. Saiful I. Ansari"],
  ["Er. Braj Kishore Verma"],
  ["Er. Rahul Chakravorty"],
  ["Er. Shashank Singh"],
  ["Ms. Ruchi Chaturvedi"],
  ["Dr. Satish Chand, Dr.Saiful I. Ansari"],
  ["Er. Braj Kishore Verma, Er. Bhupesh Kr. Pal"],
  ["Er. Rohit Singh, Er. S.K. Katiyar"],
  ["Er. Avadh Kishore Singh, Rahul Chakravorty"],
  ["Free"],
];
let afterlunch = [];
let subjects = [
  "Engineering Mathematics (KAS-203T)",
  "Engineering Physics (KAS-201T)",
  "Basic Electrical Engineering (KEE-201T)",
  "Programming for Problem Solving (KCS-201T)",
  "AI For Engineering (KMC-201)",
  "Soft Skill (KNC-201)",
  "Engineering Physics Lab (KAS-251P)",
  "Basic Electrical Engineering Lab (KEE-251P)",
  "Engineering Graphics & Design lab (KCE-251P)",
  "Programming for Problem Solving (KCS-251P)",
  "Free",
];
let codes = [
  "KAS-203T",
  "KAS-201T",
  "KEE-201T",
  "KCS-201T",
  "KMC-201",
  "KNC-201",
  "KAS-251P",
  "KEE-251P",
  "KCE-251P",
  "KCS-251P",
  "Free",
];

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
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let group = localStorage.getItem("group");
if (group == null) {
  group = "21";
}

let timetable = [];
fetch(`./timetables/${group}.json`)
  .then((response) => response.json())
  .then((data) => {
    timetable = data.timetable;
    afterlunch = data.timings;
    getschedule(date);
  });
function changegroup(element) {
  localStorage.setItem("group", element.innerHTML);
  window.location.reload();
}
expand();
function expand() {
  let menu = document.querySelector(".expand");
  let groupcategories = document.querySelector(".groupcategories");
  menu.classList.toggle("menuopen");
  groupcategories.classList.toggle("expanded");
}
function changeday(element) {
  if (innerWidth <= 700) {
    sidebar.style.width = "0";
    menu.innerHTML = "menu";
  }
  date = new Date(`March ${element.id}, 2021`);
  let currentdate = new Date();
  str = "";
  tablecontent.innerHTML = "";
  document.querySelector(".Hometime").style.display = "none";
  if (currentdate.getDay() === date.getDay()) {
    interval = setInterval(() => {
      active();
    }, 1000);
  } else {
    clearInterval(interval);
  }
  getschedule(date);
}

let interval = setInterval(() => {
  active();
}, 1000);

function getschedule(date) {
  for (let i = 0; i < 7; i++) {
    if (date.getDay() == i) {
      weekday = days[date.getDay()];
      day.innerHTML = weekday;
      let todaytt = timetable[i];
      if (weekday == "Sunday" || weekday == "Saturday") {
        document.querySelector(".Holiday").style.display = "block";
      } else {
        document.querySelector(".Holiday").style.display = "none";
        setTimetable(todaytt, date);
      }
    }
  }
}

function setTimetable(todaytt, date) {
  for (let i = 0; i < todaytt.length; i++) {
    const element = todaytt[i];
    sno = i + 1;
    subject = getSubject(element.substr(0, element.length - 3));
    code = element.substr(0, element.length - 3);
    type = getType(element.substr(element.length - 3, element.length));
    timings = getTimings(i + 1, date);
    teacher = getFaculty(code);
    appendall(sno, subject, type, timings);
    if (sno == 3) {
      appendall(" ", "Lunch", " ", "12:00 - 12:40");
    }
  }
  printtimetable(str);
}

function getSubject(code) {
  if (code === "") {
    return "MMI";
  }
  if (code === "Quiz") {
    return code;
  }
  if (code === "IIC") {
    return code;
  }
  for (let i = 0; i < codes.length; i++) {
    if (codes[i] === code) {
      return subjects[i];
    }
  }
}

function getType(code) {
  if (code === "(L)") {
    return "Lecture";
  } else if (code === "(T)") {
    return "Tutorial";
  } else if (code === "(P)") {
    return "Practical";
  } else if (code === "(Q)") {
    return "Quiz";
  } else if (code === "(I)") {
    return "IIC";
  } else {
    return "MMI";
  }
}

function getTimings(n, date) {
  if (n == 1) {
    return "9:00 - 10:00";
  }
  if (n == 2) {
    return "10:00 - 11:00";
  }
  if (n == 3) {
    return "11:00 - 12:00";
  }
  if (n > 3) {
    return afterlunch[date.getDay()][n - 4];
  }
}
function appendall(sno, subject, type, time) {
  str += `<tr>
    <td>${sno}</td>
    <td onclick = "showFaculty(this)">${subject}</td>
    <td>${type}</td>
    <td>${time}</td>
  </tr>
`;
}

let sidetab = document.querySelector("aside > ul > li");
function showFaculty(element) {
  background = window
    .getComputedStyle(sidetab)
    .getPropertyValue("background-color");
  if (element.parentElement.style.background == background) {
    let subject = getFacultySubject(element.innerText);
    element.innerText = subject;
    element.parentElement.style.background = "none";
  } else {
    let subject = element.innerText;
    if (subject !== "Quiz" && subject !== "Lunch" && subject !== "Free") {
      let code = subject.substring(
        subject.lastIndexOf("(") + 1,
        subject.lastIndexOf(")")
      );
      let faculty = getFaculty(code);
      element.innerText = faculty[0];
      element.parentElement.style.background = background;
    }
  }
}
function getFaculty(code) {
  for (let i = 0; i < codes.length; i++) {
    if (code === codes[i]) {
      return faculty[i];
    }
  }
}
function getFacultySubject(name) {
  for (let i = 0; i < faculty.length; i++) {
    if (faculty[i][0] === name) {
      return subjects[i];
    }
  }
}

function printtimetable(string) {
  tablecontent.innerHTML = string;
}

function active() {
  let date = new Date();
  let n = 0,
    x = 0;
  if (days[date.getDay()] != "Saturday" && days[date.getDay()] != "Sunday") {
    if (
      (date.getHours() >= 13 && date.getMinutes() >= 40) ||
      date.getHours() >= 14
    ) {
      n = 5;
    } else if (
      (date.getHours() >= 12 && date.getMinutes() >= 40) ||
      date.getHours() >= 13
    ) {
      n = 4;
    } else if (date.getHours() >= 12) {
      n = 3;
    } else if (date.getHours() >= 11) {
      n = 2;
    } else if (date.getHours() >= 10) {
      n = 1;
    }
  }
  let timearr = afterlunch[date.getDay()];
  for (let i = 0; i < timearr.length; i++) {
    let dash = timearr[i].indexOf("-");
    let colon = timearr[i].lastIndexOf(":");
    let hours = timearr[i].substring(dash + 2, colon);
    let minutes = timearr[i].substring(colon + 1);
    if (
      (date.getHours() >= parseInt(hours) + 12 &&
        date.getMinutes() >= parseInt(minutes)) ||
      date.getHours() >= parseInt(hours) + 13
    ) {
      x = i + 1;
    }
  }
  n = n + x;
  if (n - 1 === timetable[date.getDay()].length) {
    document.querySelector(".Hometime").style.display = "block";
  }
  finished(n);
}

function finished(n) {
  for (let i = 1; i <= n; i++) {
    let element = document.querySelector(`tr:nth-child(${i}) td:nth-child(2)`);
    element.style.textDecoration = "line-through";
    element.style.opacity = "0.6";
  }
}
