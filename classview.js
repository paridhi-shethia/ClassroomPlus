const params   = new URLSearchParams(window.location.search);
const courseId = params.get("id");
const course   = courses.find(c => c.id === courseId);

if (!course) window.location.href = "index.html";

// Update browser tab title
document.title = `${course.name} – ClassroomPlus`;

// ── Class header band ────────────────────────────────────
document.getElementById("class-header").innerHTML = `
  <div class="class-header-box" style="background-color: ${course.color};">
    <h1 class="class-title">${course.name}</h1>
    <p class="class-teacher">${course.teacher}</p>
  </div>
`;

// ── Tab switcher ─────────────────────────────────────────
function switchTab(name, btn) {
  // Hide all panels
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  // Remove active from all tab buttons
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  // Show selected panel
  document.getElementById("tab-" + name).classList.add("active");
  // Mark clicked button active
  btn.classList.add("active");
}

// ── Announcements tab ────────────────────────────────────
const annList = document.getElementById("announcements-list");

if (course.announcements.length === 0) {
  annList.innerHTML = `<p class="empty-state">No announcements for this course.</p>`;
} else {
  course.announcements.forEach(ann => {
    const card = document.createElement("div");
    card.className = "announcement-card";
    card.innerHTML = `
      <div class="announcement-text">${ann.text}</div>
      <div class="announcement-date">${ann.date}</div>
    `;
    annList.appendChild(card);
  });
}

// ── Assignments tab ──────────────────────────────────────
// ── Assignments tab ──────────────────────────────────────
const asnList = document.getElementById("assignments-list");

if (course.assignments.length === 0) {
  asnList.innerHTML = `<p class="empty-state">No assignments for this course.</p>`;
} else {
  course.assignments.forEach(asn => {
    let badge = "";
    if (asn.status === "pending") {
      badge = `<span class="badge badge-pending">Pending</span>`;
    } else if (asn.status === "submitted") {
      badge = `<span class="badge badge-submitted">Submitted</span>`;
    } else if (asn.status === "graded") {
      badge = `<span class="badge badge-graded">Graded ${asn.grade}</span>`;
    }

    let dateLine = `Due: ${asn.due}`;
    if (asn.submittedOn) dateLine += ` &nbsp;·&nbsp; Submitted: ${asn.submittedOn}`;

    const item = document.createElement("div");
    item.className = "assignment-item";
    item.innerHTML = `
      <div>
        <div class="assignment-title">${asn.title}</div>
        <div class="assignment-due">${dateLine}</div>
      </div>
      ${badge}
    `;
    asnList.appendChild(item);
  });
}

// ── Submitted tab (within this course) ──────────────────
const subList = document.getElementById("submitted-list");
const done = course.assignments.filter(a => a.status === "submitted" || a.status === "graded");

if (done.length === 0) {
  subList.innerHTML = `<p class="empty-state">Nothing submitted yet in this course.</p>`;
} else {
  done.forEach(asn => {
    let badge = asn.status === "graded"
      ? `<span class="badge badge-graded">Graded ${asn.grade}</span>`
      : `<span class="badge badge-submitted">Submitted</span>`;

    const item = document.createElement("div");
    item.className = "assignment-item";
    item.innerHTML = `
      <div>
        <div class="assignment-title">${asn.title}</div>
        <div class="assignment-due">Due: ${asn.due} &nbsp;·&nbsp; Submitted: ${asn.submittedOn}</div>
      </div>
      ${badge}
    `;
    subList.appendChild(item);
  });
}