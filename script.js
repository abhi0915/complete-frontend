// Task 4: interactive buttons | Task 5: API integration | Task 6: client-side validation
"use strict";

const colorButton = document.getElementById("colorButton");
const interactionMessage = document.getElementById("interactionMessage");
const themeButton = document.getElementById("themeButton");
const reloadPostsButton = document.getElementById("reloadPosts");
const postsContainer = document.getElementById("postsContainer");
const apiStatus = document.getElementById("apiStatus");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

const backgroundColors = ["#f7f4ff", "#effbf7", "#fff6ed", "#eef5ff"];
let colorIndex = 0;

colorButton.addEventListener("click", () => {
  document.body.style.backgroundColor = backgroundColors[colorIndex];
  colorIndex = (colorIndex + 1) % backgroundColors.length;
  interactionMessage.textContent = "Background changed successfully. Click again to try another color.";
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("theme-alt");
  const enabled = document.body.classList.contains("theme-alt");
  themeButton.textContent = enabled ? "Restore theme" : "Change theme";
  interactionMessage.textContent = enabled ? "Alternative teal theme enabled." : "Original purple theme restored.";
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

async function loadPosts() {
  postsContainer.innerHTML = '<div class="col-12"><div class="loading-card">Getting posts from the API…</div></div>';
  apiStatus.textContent = "Loading sample posts…";
  reloadPostsButton.disabled = true;
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const posts = await response.json();
    if (!Array.isArray(posts) || posts.length === 0) throw new Error("The API returned no posts.");
    postsContainer.innerHTML = posts.map((post) => `
      <div class="col-md-6 col-lg-4">
        <article class="post-card">
          <span class="post-id">POST #${escapeHTML(post.id)}</span>
          <h3>${escapeHTML(post.title)}</h3>
          <p>${escapeHTML(post.body)}</p>
        </article>
      </div>`).join("");
    apiStatus.textContent = `Showing ${posts.length} posts fetched successfully.`;
  } catch (error) {
    postsContainer.innerHTML = '<div class="col-12"><div class="error-card">Could not load posts. Check your internet connection and try again.</div></div>';
    apiStatus.textContent = "API request failed.";
    console.error("API loading error:", error);
  } finally {
    reloadPostsButton.disabled = false;
  }
}
reloadPostsButton.addEventListener("click", loadPosts);
loadPosts();

function setInvalid(input, invalid) {
  input.classList.toggle("is-invalid", invalid);
  input.classList.toggle("is-valid", !invalid);
  return !invalid;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("fullName");
  const email = document.getElementById("email");
  const topic = document.getElementById("topic");
  const message = document.getElementById("message");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validName = setInvalid(name, name.value.trim().length < 2);
  const validEmail = setInvalid(email, !emailPattern.test(email.value.trim()));
  const validTopic = setInvalid(topic, topic.value === "");
  const validMessage = setInvalid(message, message.value.trim().length < 10);

  if (validName && validEmail && validTopic && validMessage) {
    formFeedback.textContent = "All fields look good! This demo does not send data to a server.";
    formFeedback.className = "success";
    contactForm.reset();
    [name, email, topic, message].forEach((field) => field.classList.remove("is-valid"));
  } else {
    formFeedback.textContent = "Please correct the highlighted fields.";
    formFeedback.className = "error";
  }
});

contactForm.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.classList.contains("is-invalid")) {
      // Re-check the field while the user edits it.
      if (field.id === "fullName") setInvalid(field, field.value.trim().length < 2);
      if (field.id === "email") setInvalid(field, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value.trim()));
      if (field.id === "topic") setInvalid(field, field.value === "");
      if (field.id === "message") setInvalid(field, field.value.trim().length < 10);
    }
  });
});
