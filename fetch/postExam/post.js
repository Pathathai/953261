const msgEl = document.querySelector("#msg");
const btnSend = document.querySelector("#btnSend");
const statusEl = document.querySelector("#status");
const outputEl = document.querySelector("#output");

btnSend.addEventListener("click", async () => {
  const message = msgEl.value.trim();
  try {
    statusEl.textContent = "Sending...";
    outputEl.textContent = "";

    const res = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, createdAt: new Date().toISOString() }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    console.log("Response data:", data);
    console.log("Sent data:", data.json);
    outputEl.textContent = JSON.stringify(data.json, null, 2); // show what we sent back
    statusEl.textContent = "Sent successfully.";
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
});