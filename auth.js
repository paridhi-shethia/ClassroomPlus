async function initAuth() {
  const { data: { session } } = await db.auth.getSession();
  renderAuthArea(session);

  db.auth.onAuthStateChange((_event, session) => {
    renderAuthArea(session);
  });
}

async function signInWithGoogle() {
  await db.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://paridhi-shethia.github.io/ClassroomPlus/index.html"
    }
  });
}

async function signOut() {
  await db.auth.signOut();
  window.location.href = "index.html";
}

initAuth();

function renderAuthArea(session) {
  const area = document.getElementById("auth-area");
  if (!area) return;

  if (session) {
    const user   = session.user;
    const name   = user.user_metadata.full_name || user.email;
    const avatar = user.user_metadata.avatar_url;

    area.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${avatar}" 
             style="width:30px; height:30px; border-radius:50%; border:2px solid #e0e0e0;" 
             alt="avatar"/>
        <span style="font-size:0.85rem; color:#444;">${name.split(" ")[0]}</span>
        <button onclick="signOut()" 
                style="font-size:0.8rem; padding:4px 12px; border-radius:20px; 
                       border:1px solid #ddd; background:none; cursor:pointer; color:#777;">
          Sign out
        </button>
      </div>
    `;
  } else {
    area.innerHTML = `
      <button onclick="signInWithGoogle()" 
              style="font-size:0.85rem; padding:6px 16px; border-radius:20px; 
                     background:#7F77DD; color:#fff; border:none; cursor:pointer; font-weight:500;">
        Sign in with Google
      </button>
    `;
  }
}

async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://paridhi-shethia.github.io/ClassroomPlus/index.html"
    }
  });
}


async function signOut() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

initAuth();
