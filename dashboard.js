const grid = document.getElementById("course-grid");

let totalPending   = 0;
let totalSubmitted = 0;

courses.forEach(course => {
  course.assignments.forEach(asn => {
    if (asn.status === "pending") totalPending++;
    if (asn.status === "submitted" || asn.status === "graded") totalSubmitted++;
  });
});

// Summary bar
const summaryBar = document.createElement("div");
summaryBar.className = "summary-bar";
summaryBar.innerHTML = `
  <div class="summary-card">
    <span class="summary-label">Courses</span>
    <span class="summary-value accent-purple">${courses.length}</span>
  </div>
  <div class="summary-card">
    <span class="summary-label">Pending</span>
    <span class="summary-value accent-orange">${totalPending}</span>
  </div>
  <div class="summary-card">
    <span class="summary-label">Submitted</span>
    <span class="summary-value accent-green">${totalSubmitted}</span>
  </div>
`;

const mainContent = document.querySelector(".main-content");
const title       = document.querySelector(".page-title");
mainContent.insertBefore(summaryBar, title.nextSibling);

// Course cards
courses.forEach(course => {
  const pending = course.assignments.filter(a => a.status === "pending").length;

  const badge = pending > 0
    ? `<span class="badge badge-pending">${pending} pending</span>`
    : `<span class="badge badge-clear">All clear</span>`;

  let warning = "";
  course.assignments.forEach(asn => {
    if (asn.status === "pending") {
      const diff = Math.ceil((new Date(asn.due) - new Date()) / (1000 * 60 * 60 * 24));
      if (diff >= 0 && diff <= 2) {
        warning = `<div class="deadline-warning">⚠ Due ${diff === 0 ? "today" : "in " + diff + (diff === 1 ? " day" : " days")}: ${asn.title}</div>`;
      }
    }
  });

  const card = document.createElement("a");
  card.href      = `class.html?id=${course.id}`;
  card.className = "course-card";

  // Set the background color directly on the card element via a data attribute
  // and let CSS handle the header band via a pseudo approach
  card.innerHTML = `
    <div class="course-card-header" style="background-color: ${course.color};">
      <div class="course-name">${course.name}</div>
      <div class="course-teacher">${course.teacher}</div>
      ${warning}
    </div>
    <div class="course-card-body">
      ${badge}
    </div>
  `;

  grid.appendChild(card);
});