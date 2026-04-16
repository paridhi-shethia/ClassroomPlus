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

  const card = docume
