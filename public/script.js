const save_button = document.querySelectorAll("button");

fetch("/api/reminder", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
})
  .then((res) => res.json())
  .then((res) => {
    console.log("******",res);
    const arrayReminders = res;
    arrayReminders.forEach((reminder) => {
      const query = `[blockId="${reminder.text_id}"] .description`;
      document.querySelector(query).value = reminder.reminder;
    })
  });

function save(event) {
  console.log(event.target.closest(".time-block").getAttribute("blockId"));

  const reminder = event.target.closest(".time-block").children[1].value.trim();
  const text_id = event.target.closest(".time-block").getAttribute("blockId");
  const postObj = {
    reminder: reminder,
    text_id: text_id,
  };

  fetch("/api/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}

save_button.forEach((button) => {
  button.addEventListener("click", (event) => save(event));
});
