function setStatus(el, message, isError) {
  if (!el) return;
  el.textContent = message;
  el.className = isError ? "error" : "ok";
}

function initSignup() {
  const client = getSupabaseClient();
  const form = document.getElementById("signup-form");
  const status = document.getElementById("auth-status");
  const googleBtn = document.getElementById("google-btn");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    setStatus(status, "Creating account...", false);
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: homeRedirect() },
    });
    if (error) {
      setStatus(status, error.message, true);
      return;
    }
    if (data.session) {
      window.location.href = homeRedirect();
      return;
    }
    window.location.href = "/check-email";
  });

  googleBtn?.addEventListener("click", () => signInWithGoogle(client, status));
}

function initLogin() {
  const client = getSupabaseClient();
  const form = document.getElementById("login-form");
  const status = document.getElementById("auth-status");
  const googleBtn = document.getElementById("google-btn");
  const dialog = document.getElementById("login-miss-dialog");
  const signupLink = document.getElementById("go-signup");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    setStatus(status, "Signing in...", false);
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus(
        status,
        "No account found for that email, or the password is wrong.",
        true
      );
      dialog?.showModal();
      return;
    }
    window.location.href = homeRedirect();
  });

  googleBtn?.addEventListener("click", () => signInWithGoogle(client, status));
  signupLink?.addEventListener("click", () => {
    window.location.href = "/signup";
  });
}

async function signInWithGoogle(client, status) {
  setStatus(status, "Redirecting to Google...", false);
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: homeRedirect() },
  });
  if (error) {
    setStatus(status, error.message, true);
  }
}

async function initHome() {
  const client = getSupabaseClient();
  const {
    data: { session },
    error: sessionError,
  } = await client.auth.getSession();

  if (sessionError || !session) {
    window.location.href = "/login";
    return;
  }

  window.location.href = homeRedirect();
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "signup") initSignup();
  if (page === "login") initLogin();
  if (page === "home") initHome();
});
