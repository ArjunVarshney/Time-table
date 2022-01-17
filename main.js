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
  ["Dr. D.K. Mishra"],
  ["Er. Awanish Kr. Shukla"],
  ["Er. Dinesh"],
  ["Er. Shashank Singh"],
  ["Mr. Shivesh Bhatnagar"],
  ["D. K Mishra, Mr. S.P.S. Sengar"],
  ["Er. Awanish Kr. Shukla, Er. Dhirendra Pratap Singh"],
  ["Er. Nitesh Gupta, Er. S.K. Katiyar"],
  ["Ms. Snigdha, Ms. Konica Mukherjee"],
  ["Free"],
];
let afterlunch = [];
let links = [];
let Meeting_details = [];
let subjects = [
  "Engineering Mathematics (KAS-103T)",
  "Engineering Chemistry (KAS-102T)",
  "Emerging Domain in Elec. Engineering (KEC-101T)",
  "Fundamentals of Mechanical Engg. and Mechatronics (KME-101T)",
  "Emerging Technology for Engineering (KMC-102)",
  "Soft Skill (KNC-101)",
  "Engineering Chemistry lab (KAS-152P)",
  "Basic Electronics Engineering lab (KEC-151P)",
  "Mechanical Workshop lab (KWS-151P)",
  "English Language lab (KAS-154P)",
  "Free",
];
let codes = [
  "KAS-103T",
  "KAS-102T",
  "KEC-101T",
  "KME-101T",
  "KMC-102",
  "KNC-101",
  "KAS-152P",
  "KEC-151P",
  "KWS-151P",
  "KAS-154P",
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
  group = "11";
}

let timetable = [];
fetch(`./timetables/${group}.json`)
  .then((response) => response.json())
  .then((data) => {
    timetable = data.timetable;
    afterlunch = data.timings;
    links = data.Links;
    Meeting_details = data.meetingDetails;
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
    join_link = getLink(code) != undefined ? getLink(code) : "";
    appendall(sno, subject, type, timings, join_link);
    if (sno == 4) {
      appendall(" ", "Lunch", " ", "12:55 - 1:35", "");
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
  } else if (code === "") {
    return "MMI";
  } else {
    return "Quiz";
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
  if (n == 4) {
    return "12:00 - 12:55";
  }
  if (n > 4) {
    return afterlunch[date.getDay()][n - 5];
  }
}
function appendall(sno, subject, type, time, join_link) {
  if (join_link == "") {
    str += `<tr>
      <td>${sno}</td>
      <td>${subject}</td>
      <td>${type}</td>
      <td>${time}</td>
    </tr>
  `;
  } else {
    str += `<tr>
      <td>${sno}</td>
      <td><div class="subject">${subject}</div><a target="_blank" class="linkbtn" href="${join_link}">Join</a></td>
      <td>${type}</td>
      <td>${time}</td>
    </tr>
    `;
  }
  // for showing faculty on click

  // if (join_link == "") {
  //   str += `<tr>
  //     <td>${sno}</td>
  //     <td onclick = "showFaculty(this)">${subject}</td>
  //     <td>${type}</td>
  //     <td>${time}</td>
  //   </tr>
  // `;
  // } else {
  //   str += `<tr>
  //     <td>${sno}</td>
  //     <td onclick = "showFaculty(this)"><div class="subject">${subject}</div><a target="_blank" class="linkbtn" href="${join_link}">Join</a></td>
  //     <td>${type}</td>
  //     <td>${time}</td>
  //   </tr>
  //   `;
  // }
}

let sidetab = document.querySelector("aside > ul > li");
function showFaculty(element) {
  background = window
    .getComputedStyle(sidetab)
    .getPropertyValue("background-color");
  if (element.parentElement.style.background == background) {
    let subject = getFacultySubject(element.innerText);
    let join_link = getFacultyLink(element.innerText);
    element.innerHTML =
      join_link != ""
        ? `<div class="subject">${subject}</div><a class="linkbtn" target="_blank" href="${join_link}">Join</a>`
        : `<div class="subject">${subject}</div>`;
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
function getLink(code) {
  for (let i = 0; i < codes.length; i++) {
    if (code === codes[i]) {
      return links[i];
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
function getFacultyLink(name) {
  for (let i = 0; i < faculty.length; i++) {
    if (faculty[i][0] === name) {
      return links[i];
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
      (date.getHours() >= 13 && date.getMinutes() >= 35) ||
      date.getHours() >= 14
    ) {
      n = 5;
    } else if (
      (date.getHours() >= 12 && date.getMinutes() >= 55) ||
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
