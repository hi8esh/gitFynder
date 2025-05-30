document.getElementById("searchBtn").addEventListener("click", function() {
    var username = document.getElementById("username").value;
    if (username) {
        fetch("https://api.github.com/users/" + username)
            .then(response => {
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var userInfo = `
                    <section class="userinfo-detail" aria-label="GitHub User Information">
                        <h2>
                            <span class="userinfo-label">User found:</span>
                            <span class="userinfo-value">${data.login}</span>
                        </h2>
                        <img src="${data.avatar_url}" alt="Avatar of ${data.login}" width="100" height="100">
                        <p>
                            <span class="userinfo-label">Name:</span>
                            <span class="userinfo-value">${data.name || "N/A"}</span>
                        </p>
                        <p>
                            <span class="userinfo-label">Bio:</span>
                            <span class="userinfo-value">${data.bio || "N/A"}</span>
                        </p>
                        <p>
                            <span class="userinfo-label">Public Repos:</span>
                            <span class="userinfo-value">${data.public_repos}</span>
                        </p>
                        <p>
                            <span class="userinfo-label">Followers:</span>
                            <span class="userinfo-value">${data.followers}</span>
                        </p>
                        <p>
                            <span class="userinfo-label">Following:</span>
                            <span class="userinfo-value">${data.following}</span>
                        </p>
                        <p>
                            <span class="userinfo-label">Profile URL:</span>
                            <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">${data.html_url}</a>
                        </p>
                    </section>
                `;
                document.getElementById("userInfo").style.display = "block";
                document.getElementById("userInfo").innerHTML = userInfo;
            })
            .catch(error => {
                alert(error.message);
            });
    } else {
        alert("Please enter a GitHub username.");
    }
});