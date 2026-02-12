// When user clicks Load user:
// 1.	Show status: Loading…
// 2.	Hide previous result (if any)
// 3.	Fetch from: https://randomuser.me/api/
// 4.	If !res.ok, show error message
// 5.	Parse JSON and render: name + email + avatar
// 6.	Show status: Loaded successfully.
// Must-have code pattern:
// •	async/await
// •	try/catch
// •	res.ok check
// •	await res.json()

// Output requirements:
// •	Name
// •	Email
// •	Avatar image

// Access HTML elements (load button, status div, result div)
let loadUserBtn = document.getElementById("btnLoad");
let statusDiv = document.getElementById("status");
let resultDiv = document.getElementById("result");

// Show status: Loading… when button is clicked
loadUserBtn.addEventListener("click", async () => {
  statusDiv.textContent = "Loading...";
    resultDiv.innerHTML = ""; // Clear previous result
    try {
        const res = await fetch("https://randomuser.me/api/");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const user = data.results[0];
        console.log(user);
        resultDiv.classList.remove("hidden");
        
        // Render user info: name, email, avatar
        resultDiv.innerHTML = `
            <h2>${user.name.first} ${user.name.last}</h2>
            <p>Email: ${user.email}</p>
            <img src="${user.picture.large}" alt="Avatar">
        `;
        statusDiv.textContent = "Loaded successfully.";
    } catch (error) {
        statusDiv.textContent = `Error: ${error.message}`;
    }
});