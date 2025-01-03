// Fetch user profile data
const getUserProfile = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");
    return await response.json();
  };
  
  // Fetch user repositories
  const getUserRepositories = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error("Repositories not found");
    return await response.json();
  };
  
  // Display user profile
  const displayUserProfile = (user) => {
    const profileDiv = document.getElementById("profile");
    profileDiv.innerHTML = `
    <div class="profile">
        <h2>${user.name || user.login}</h2>
        <div class="img-container">
            <img src="${user.avatar_url}" alt="Profile Picture" width="150">
        </div>
        <p><strong>Username:</strong> ${user.login}</p>
        <p><strong>Bio:</strong> ${user.bio || "No bio available"}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
        <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
    </div>
    `;
  };
  
  // Display user repositories
  const displayUserRepositories = (repos) => {
    const reposDiv = document.getElementById("repositories");
    reposDiv.innerHTML = "<h3>Repositories:</h3>";
  
    if (repos.length === 0) {
      reposDiv.innerHTML += "<p>No repositories found.</p>";
      return;
    }
  
    const repoList = document.createElement("ul");
    repos.forEach((repo) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${
        repo.description || "No description"
      }
      `;
      repoList.appendChild(listItem);
    });
  
    reposDiv.appendChild(repoList);
  };
  
  // Handle search button click
  document.getElementById("search-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
      alert("Please enter a username");
      return;
    }
  
    try {
      document.getElementById("profile").innerHTML = "Loading...";
      document.getElementById("repositories").innerHTML = "";
  
      const userProfile = await getUserProfile(username);
      const userRepositories = await getUserRepositories(username);
  
      displayUserProfile(userProfile);
      displayUserRepositories(userRepositories);
    } catch (error) {
      document.getElementById("profile").innerHTML = `<p>${error.message}</p>`;
      document.getElementById("repositories").innerHTML = "";
    }
  });
  