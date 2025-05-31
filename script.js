document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  handleSearch();
});

async function handleSearch() {
  const username = document.getElementById("username").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const userInfoDiv = document.getElementById("userInfo");

  // Reset UI
  errorMsg.textContent = "";
  errorMsg.classList.add("hidden");
  userInfoDiv.innerHTML = "";
  userInfoDiv.classList.add("hidden");

  if (!username) {
    errorMsg.textContent = "Please enter a GitHub username.";
    errorMsg.classList.remove("hidden");
    return;
  }

  // Show spinner
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.setAttribute("aria-busy", "true");
  userInfoDiv.appendChild(spinner);
  userInfoDiv.classList.remove("hidden");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("GitHub user not found.");
      } else if (response.status === 403) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    }

    const data = await response.json();

    const userInfo = `
      <section class="userinfo-details" aria-label="GitHub User Information">
        <h2>
          <span class="userinfo-label">User found:</span>
          <span class="userinfo-value username">${data.login}</span>
        </h2>
        <img src="${data.avatar_url}" alt="Avatar of ${data.login}" width="100" height="100" />
        <p><span class="userinfo-label">Name:</span> <span class="userinfo-value">${data.name || "N/A"}</span></p>
        <p><span class="userinfo-label">Bio:</span> <span class="userinfo-value">${data.bio || "N/A"}</span></p>
        <p><span class="userinfo-label">Public Repos:</span> <span class="userinfo-value">${data.public_repos}</span></p>
        <p><span class="userinfo-label">Followers:</span> <span class="userinfo-value">${data.followers}</span></p>
        <p><span class="userinfo-label">Following:</span> <span class="userinfo-value">${data.following}</span></p>
        <p><span class="userinfo-label">Profile URL:</span>
          <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">${data.html_url}</a>
        </p>
      </section>
    `;

    userInfoDiv.innerHTML = userInfo;
  } catch (error) {
    userInfoDiv.classList.add("hidden");
    errorMsg.textContent = error.message;
    errorMsg.classList.remove("hidden");
  }
}
