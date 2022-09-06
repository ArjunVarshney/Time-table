let diary = document.querySelector(".diary");
show();
function show() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = "";
  } else {
    notesobj = JSON.parse(notes);
  }
  diary.innerText = notesobj;
}

diary.addEventListener("input", () => {
  save();
});

function save() {
  localStorage.setItem("notes", JSON.stringify(diary.innerText));
}
