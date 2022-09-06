let tBody = document.querySelector("tbody");
let date = new Date();
let day = date.getDay();

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
  fetch("/json/31.json")
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
    })
    .catch((err) => console.error(err));
};
fetchAndSet();
