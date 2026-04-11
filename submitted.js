// Collect all submitted and graded assignments across all courses
let allSubmitted = [];

courses.forEach(course => {
  course.assignments.forEach(asn => {
    if (asn.status === "submitted" || asn.status === "graded") {
      allSubmitted.push({
        ...asn,
        courseName: course.name,
        courseColor: course.color,
        courseId: course.id
      });
    }
  });
});

// Sort by submittedOn date — most recent first
allSubmitted.sort((a, b) => new Date(b.submittedOn) - new Date(a.submittedOn));

// ── Render function ──────────────────────────────────────
function renderList(filter) {
  const list = document.getElementById("submitted-list");
  list.innerHTML = "";

  const filtered = filter === "all"
    ? allSubmitted
    : allSubmitted.filter(a => a.status === filter);

  if (filtered.length === 0) {
    list.innerHTML = `<p class="empty-state">No assignments found.</p>`;
    return;
  }

  filtered.forEach(asn => {
    // Badge
    let badge = "";
    if (asn.status === "submitted") {
      badge = `<span class="badge badge-submitted">Submitted</span>`;
    } else if (asn.status === "graded") {
      badge = `<span class="badge badge-graded">Graded ${asn.grade}</span>`;
    }

    const item = document.createElement("div");
    item.className = "submitted-item";
    item.innerHTML = `
      <div class="submitted-course-tag" style="background: ${asn.courseColor}18; color: ${asn.courseColor}; border: 1px solid ${asn.courseColor}40">
        ${asn.courseName}
      </div>
      <div class="submitted-body">
        <div>
          <div class="assignment-title">${asn.title}</div>
          <div class="assignment-due">
            Due: ${asn.due} &nbsp;·&nbsp; Submitted: ${asn.submittedOn}
          </div>
        </div>
        ${badge}
      </div>
    `;
    list.appendChild(item);
  });
}

// ── Filter button logic ──────────────────────────────────
function filterWork(type, btn) {
  // Toggle active class on buttons
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  renderList(type);
}

// Render all on page load
renderList("all");