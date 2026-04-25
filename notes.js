async function getCurrentUser() {
  const { data: { session } } = await window.db.auth.getSession();
  return session ? session.user : null;
}

async function renderNotes() {
  const list = document.getElementById("notes-list");
  if (!list) return;

  list.innerHTML = `<p style="color:#bbb; font-size:0.85rem; padding:0.5rem 0;">Loading notes...</p>`;

  const user = await getCurrentUser();
  if (!user) {
    list.innerHTML = `<p class="empty-state">Sign in with Google to save and view your notes.</p>`;
    updateNotesHeading(0);
    return;
  }

  const { data: notes, error } = await window.db
    .from("notes")
    .select("*")
    .eq("course_id", courseId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Notes fetch error:", error);
    list.innerHTML = `<p class="empty-state">Error loading notes. Try refreshing.</p>`;
    return;
  }

  updateNotesHeading(notes.length);

  if (notes.length === 0) {
    list.innerHTML = `<p class="empty-state">No notes yet. Add one above.</p>`;
    return;
  }

  list.innerHTML = "";
  notes.forEach(note => renderNoteCard(note));
}

function renderNoteCard(note) {
  const list = document.getElementById("notes-list");
  const date = new Date(note.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });

  const card = document.createElement("div");
  card.className = "note-card";
  card.id = `note-${note.id}`;
  card.innerHTML = `
    <div class="note-content">${escapeHtml(note.text)}</div>
    <div class="note-footer">
      <span class="note-date">${date}</span>
      <div class="note-actions">
        <button class="note-btn edit-btn" onclick="startEdit('${note.id}')">Edit</button>
        <button class="note-btn delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
      </div>
    </div>
  `;
  list.appendChild(card);
}

async function addNote() {
  const input = document.getElementById("note-input");
  if (!input) return;
  const text = input.value.trim();
  if (text === "") { input.focus(); return; }

  const user = await getCurrentUser();
  if (!user) {
    alert("Please sign in with Google first to save notes.");
    return;
  }

  const { error } = await window.db
    .from("notes")
    .insert({ user_id: user.id, course_id: courseId, text: text });

  if (error) {
    console.error("Note save error:", error);
    alert("Could not save note. Try again.");
    return;
  }

  input.value = "";
  renderNotes();
}

async function deleteNote(id) {
  if (!confirm("Delete this note?")) return;
  const { error } = await window.db.from("notes").delete().eq("id", id);
  if (error) { console.error("Delete error:", error); return; }
  renderNotes();
}

function startEdit(id) {
  const card = document.getElementById(`note-${id}`);
  const currentText = card.querySelector(".note-content").innerText;
  card.innerHTML = `
    <textarea class="note-textarea edit-textarea" id="edit-input-${id}">${currentText}</textarea>
    <div class="note-footer">
      <div class="note-actions">
        <button class="note-btn save-btn" onclick="saveEdit('${id}')">Save</button>
        <button class="note-btn cancel-btn" onclick="renderNotes()">Cancel</button>
      </div>
    </div>
  `;
  const ta = document.getElementById(`edit-input-${id}`);
  ta.focus();
  ta.setSelectionRange(ta.value.length, ta.value.length);
}

async function saveEdit(id) {
  const ta = document.getElementById(`edit-input-${id}`);
  const newText = ta.value.trim();
  if (newText === "") return;
  const { error } = await window.db.from("notes").update({ text: newText }).eq("id", id);
  if (error) { console.error("Edit error:", error); return; }
  renderNotes();
}

function updateNotesHeading(count) {
  const heading = document.getElementById("notes-heading");
  if (heading) {
    heading.innerHTML = `
      <div class="section-heading-row">
        <h2 class="section-heading">My Notes</h2>
        <span class="section-count">${count}</span>
      </div>
    `;
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("note-input");
  if (noteInput) {
    noteInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.ctrlKey) addNote();
    });
  }
  renderNotes();
});
