let tBody = document.querySelector("tbody");
let date = new Date();
let day = date.getDay();
let localGroup = localStorage.getItem("group");
let group = "31";

if (localGroup == "31" || localGroup == "32") {
  group = localGroup;
} else {
  localStorage.setItem("group", "31");
  group = "31";
}

let allDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//this fetches and sets the date in the table
const fetchAndSet = () => {
  // first set the inner content of the tBody to null the append the contect
  tBody.innerHTML = "";

  //also set the day of the current date or as requested
  document.querySelector(".day").innerHTML = allDays[day];

  //fetch the data from the json create in the json folders and perform the actions
  fetch(`https://arjunvarshney.github.io/Time-table/json/${group}.json`)
    .then((response) => response.json())
    .then((data) => {
      //gets the subject details from the subject code from the json
      const getDetails = (subject) => {
        if (
          subject == "Lunch" ||
          subject == "Quiz" ||
          subject == "MMI" ||
          subject == "IIC"
        ) {
          return {
            code: "",
            subject: subject,
            name: subject,
          };
        }
        let subjectCode = subject.substring(0, subject.length - 3);
        for (let i = 0; i < data.details.length; i++) {
          const element = data.details[i];
          if (element.code == subjectCode) {
            return element;
          }
        }
      };

      //gets the class type from the simgle letter of the type in the time table
      const getType = (subject) => {
        if (
          subject == "Lunch" ||
          subject == "Quiz" ||
          subject == "MMI" ||
          subject == "IIC"
        ) {
          return subject == "Lunch" ? "" : subject;
        }
        let classType = subject.substring(
          subject.length - 2,
          subject.length - 1
        );
        if (classType == "L") {
          return "Lecture";
        } else if (classType == "T") {
          return "Tutorial";
        } else if (classType == "P") {
          return "Practical";
        }
      };

      //returns a timetable row from the given details as a html template
      const getRow = (sno, subject, timming) => {
        let details = getDetails(subject);
        let type = getType(subject);
        let html = `<tr>
                 <td>${sno}</td>
                 <td onclick="showFaculty(this)">${details.subject} ${
          details.code == "" ? "" : "(" + details.code + ")"
        }</td>
                 <td>${type}</td>
                 <td>${timming}</td>
               </tr>`;

        return html;
      };

      //getting time table and the timings of the current date from the json file
      let timetable = data.timetable[day].class;
      let timmings = data.timetable[day].time;

      if (timetable.length == 0) {
        //setting holiday flag to block
        document.querySelector(".Holiday").style.display = "block";
        return;
      } else {
        //setting holiday flag to none
        document.querySelector(".Holiday").style.display = "none";
      }

      let c = 1;
      for (let i = 0; i < timetable.length; i++) {
        const subject = timetable[i];
        const timming = timmings[i];
        tBody.innerHTML += getRow(i == 3 ? "" : c, subject, timming);

        //lunch after 3rd periad ie at 4th position so the counter will not increase at lunch
        if (i != 2) c++;
      }

      /*---------------------logic for cancelling the subject after finishing------------------*/

      let rows = document.querySelectorAll("tr>td:nth-child(2)");
      console.log(rows);

      //if the current hour and the current min are greater than the end hour and end min then cancel the period
      if (date.getDay() == day) {
        let i = 0;
        for (i = 0; i < timmings.length; i++) {
          let element = timmings[i];
          let endTime = element.substring(element.indexOf("-") + 2);
          let endMin = parseInt(endTime.substring(endTime.indexOf(":") + 1));
          let endHour = parseInt(
            endTime.substring(0, endTime.indexOf(":") + 1)
          );
          endHour = endHour < 9 ? endHour + 12 : endHour;
          let currHour = date.getHours();
          let currMin = date.getMinutes();
          if (!(endHour <= currHour && endMin <= currMin)) {
            break;
          }
        }

        // i contains the number of periods from the start
        for (let j = 0; j < i; j++) {
          const element = rows[j];
          element.classList.add("cancel");
        }
      }
    })
    .catch((err) => console.error(err));
};
fetchAndSet();
