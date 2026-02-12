// TASK A2: Implement GET with fetch (Random User)
// Requirements:
// 1) Show status: "Loading..."
// 2) Hide previous result (if any)
// 3) Fetch from: https://randomuser.me/api/
// 4) If (!res.ok) show error message
// 5) Parse JSON and render: name + email + avatar
// 6) Show status: "Loaded successfully."
//
// Must-have pattern: async/await, try/catch, res.ok, await res.json()

// 0) Access HTML elements (IDs required: btnLoad, status, result)
const loadUserBtn = document.getElementById("btnLoad");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

// 1) Add click event listener to Load user button
// Hint: loadUserBtn.addEventListener("click", async () => { ... });

loadUserBtn.addEventListener("click", async () => {
  // 2) UI state: show loading + disable button
  // TODO: statusDiv.textContent = "Loading...";
  // TODO: loadUserBtn.disabled = true;


  // 3) Hide previous result (required)
  // TODO: resultDiv.classList.add("hidden");
  // TODO: resultDiv.innerHTML = "";


  try {
    // 4) Fetch random user data
    // TODO: const res = await fetch("https://randomuser.me/api/");


    // 5) Check res.ok (HTTP errors do not throw automatically)
    // TODO: if (!res.ok) throw new Error(`HTTP ${res.status}`);


    // 6) Parse JSON
    // TODO: const data = await res.json();
    // TODO: const user = data.results[0];


    // 7) Render name + email + avatar into resultDiv
    // TODO: resultDiv.innerHTML = `...`;


    // 8) Show result area (remove "hidden")
    // TODO: resultDiv.classList.remove("hidden");


    // 9) Status success
    // TODO: statusDiv.textContent = "Loaded successfully.";
  } catch (err) {
    // 10) Status error
    // TODO: statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    // 11) Re-enable button (always)
    // TODO: loadUserBtn.disabled = false;
  }
});