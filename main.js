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
  ["Dr. Ashutosh Srivastava"],
  ["Er. Awanish Kr. Shukla"],
  ["Er. Dinesh"],
  ["New IT-1"],
  ["Mr. Shivesh Bhatnagar"],
  ["Dr. Ashutosh Srivastava, D. K Mishra"],
  ["Er. Awanish Kr. Shukla, Er. Sanjay Kr. Maurya"],
  ["Er. Nitesh Gupta, Er. Sunil Kr. Yadav"],
  ["Ms. Snigdh, Ms. Konica Mukherjee"],
];
let afterlunch = [
  [],
  ["1:35 - 2:25", "2:25 - 3:15", "3:15 - 4:55"],
  ["1:35 - 3:15"],
  ["1:35 - 2:25", "2:25 - 3:15", "3:15 - 4:55"],
  ["1:35 - 2:25", "2:25 - 4:55"],
  ["1:35 - 2:25", "2:25 - 3:15"],
  [],
];
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
];
let timetable = [
  [],
  [
    "Quiz(Q)",
    "KAS-103T(L)",
    "KEC-101T(L)",
    "KME-101T(L)",
    "KMC-102(L)",
    "KAS-102T(T)",
    "KAS-152P(P)",
  ],
  ["KEC-101T(L)", "KAS-103T(L)", "KAS-102T(L)", "KME-101T(L)", "KEC-151P(P)"],
  [
    "KAS-102T(L)",
    "KAS-103T(L)",
    "KEC-101T(L)",
    "KME-101T(L)",
    "KMC-102(L)",
    "KNC-101(L)",
    "KAS-154P(P)",
  ],
  [
    "KNC-101(L)",
    "KAS-103T(L)",
    "KAS-102T(L)",
    "KEC-101T(L)",
    "KEC-101T(T)",
    "KWS-151P(P)",
  ],
  [
    "Quiz(Q)",
    "KAS-103T(L)",
    "KAS-102T(L)",
    "KME-101T(L)",
    "KME-101T(T)",
    "KAS-103T(T)",
  ],
  [],
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
getschedule(date);

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
    if (sno == 4) {
      appendall(" ", "Lunch", " ", "12:55 - 1:35");
    }
  }
  printtimetable(str);
}

function getSubject(code) {
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
function appendall(sno, subject, type, time) {
  str += `<tr>
    <td>${sno}</td>
    <td onclick = "showFaculty(this)">${subject}</td>
    <td>${type}</td>
    <td>${time}</td>
  </tr>
`;
}

function showFaculty(element) {
  if (element.parentElement.style.background == "rgb(48, 49, 52)") {
    let subject = getFacultySubject(element.innerText);
    element.innerText = subject;
    element.parentElement.style.background = "none";
  } else {
    let subject = element.innerText;
    if (subject !== "Quiz" && subject !== "Lunch") {
      let code = subject.substring(
        subject.lastIndexOf("(") + 1,
        subject.lastIndexOf(")")
      );
      let faculty = getFaculty(code);
      element.innerText = faculty[0];
      element.parentElement.style.background = "rgb(48, 49, 52)";
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
