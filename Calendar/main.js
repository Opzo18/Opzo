document.addEventListener("DOMContentLoaded", function () {
  updateCalendar();
});

function updateCalendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();

  const calendarBody = document.getElementById("calendarBody");
  const currentMonthElement = document.getElementById("currentMonth");

  const options = { month: "long", year: "numeric" };
  currentMonthElement.textContent = new Intl.DateTimeFormat("pl-PL", options).format(currentDate);

  // Determine the number of rows needed
  const numRows = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

  for (let i = 0; i < numRows; i++) {
    const row = calendarBody.insertRow(i);

    for (let j = 0; j < 7; j++) {
      const cell = row.insertCell(j);

      const dayInMonth = i * 7 + j + 1 - firstDayOfMonth;

      if (dayInMonth > 0 && dayInMonth <= daysInMonth) {
        cell.textContent = dayInMonth;

        cell.addEventListener("click", function () {
          alert(`${dayInMonth}/${currentMonth + 1}/${currentYear}`);
        });
      }
    }
  }
}
