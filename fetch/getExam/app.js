const btnLoad = document.querySelector("#btnLoad");
const statusEl = document.querySelector("#status");
const resultEl = document.querySelector("#result");

function setStatus(text) {
  statusEl.textContent = text;
}

function renderUser(user) {
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <div class="flex items-center gap-3">
      <img class="w-12 h-12 rounded-full" src="${user.picture.medium}" alt="avatar" />
      <div>
        <div class="font-semibold">${user.name.first} ${user.name.last}</div>
        <div class="text-sm text-gray-600">${user.email}</div>
      </div>
    </div>
  `;
}

btnLoad.addEventListener("click", async () => {
  try {
    setStatus("Loading...");
    resultEl.classList.add("hidden");

    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    renderUser(data.results[0]);
    setStatus("User loaded successfully.");
  } catch (err) {
    setStatus(`Error: ${err.message}`);
  }
});