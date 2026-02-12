// 1.	Validate input (if empty → show “Please type a message first.”)
// 2.	Show status: Sending…
// 3.	Send POST request to: https://httpbin.org/post
// 4.	Include: method: "POST"; header "Content-Type": "application/json"; body: JSON.stringify({ message, createdAt })
// 5.	Parse response JSON and display what you sent (the echoed JSON)
// Output requirements:
// •	Show “Sent successfully.” on success
// •	Show error message on failure
// •	Display JSON nicely formatted (use JSON.stringify(obj, null, 2))

// Access HTML elements (input, send button, status div, result pre)
let inputMessage = document.getElementById("msg");
let sendBtn = document.getElementById("btnSend");
let statusDiv = document.getElementById("status");
let resultPre = document.getElementById("output");

// When user clicks Send button
sendBtn.addEventListener("click", async () => {
  const message = inputMessage.value.trim();
  if (!message) {
    statusDiv.textContent = "Please type a message first.";
    return;
  }

  statusDiv.textContent = "Sending...";
  resultPre.textContent = ""; // Clear previous result

  try {
    const res = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, createdAt: new Date().toISOString() }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    resultPre.textContent = JSON.stringify(data.json, null, 2); // Display echoed JSON
    resultPre.classList.remove("hidden");
    statusDiv.textContent = "Sent successfully.";

  } catch (error) {
    statusDiv.textContent = `Error: ${error.message}`;
  }
});