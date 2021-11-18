let menu = document.querySelector("header>span");
let sidebar = document.querySelector("aside");
let day = document.querySelector(".day");
let tablecontent = document.querySelector("tbody");
let subject,
  code,
  weekday,
  sno,
  str = "";
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
  "Engineering Mathematics",
  "Engineering Chemistry",
  "Emerging Domain in Elec. Engineering",
  "Fundamentals of Mechanical Engg. and Mechatronics",
  "Emerging Technology for Engineering",
  "Soft Skill",
  "Engineering Chemistry lab",
  "Basic Electronics Engineering lab",
  "Mechanical Workshop lab",
  "English Language lab",
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
  str = "";
  getschedule(date);
}

function getschedule(date) {
  for (let i = 0; i < 7; i++) {
    if (date.getDay() == i) {
      weekday = days[date.getDay()];
      day.innerHTML = weekday;
      let todaytt = timetable[i];
      setTimetable(todaytt, date);
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
    appendall(sno, subject, type, timings);
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
    <td>${subject}</td>
    <td>${type}</td>
    <td>${time}</td>
  </tr>
`;
}

function printtimetable(string) {
  tablecontent.innerHTML = string;
}
active()
function active(){
  let date = new Date;
  time = date.getHours()+":"+date.getMinutes();
}