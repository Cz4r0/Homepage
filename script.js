// -----------------------------------
// 📌 POMOCNICZE FUNKCJE STORAGE
// -----------------------------------
function getPinnedSites() {
  const data = localStorage.getItem("pinned");
  return data ? JSON.parse(data) : [];
}
function savePinnedSites(list) {
  localStorage.setItem("pinned", JSON.stringify(list));
}

// -----------------------------------
// 📌 PRYPINANIE STRON
// -----------------------------------
function pinSite() {
  const urlInput = document.getElementById("pinned-url").value.trim();
  if (!urlInput) return;
  const list = getPinnedSites();
  if (!list.includes(urlInput)) {
    list.push(urlInput);
    savePinnedSites(list);
    updatePinnedList();
  }
}

function removePinnedSite(i) {
  const list = getPinnedSites();
  list.splice(i, 1);
  savePinnedSites(list);
  updatePinnedList();
}

function updatePinnedList() {
  const list = getPinnedSites();
  const ul = document.getElementById("pinned-list");
  const sec = document.getElementById("pinned");
  ul.innerHTML = "";
  sec.innerHTML = "";

  list.forEach((url, i) => {
    // w ustawieniach
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${url}" target="_blank">${url.replace(/^https?:\/\//, "")}</a>
      <button onclick="removePinnedSite(${i})">❌</button>
    `;
    ul.appendChild(li);

    // na stronie głównej
    const div = document.createElement("div");
    div.classList.add("pinnedItems");
    div.innerHTML = `
      <a href="${url}" target="_blank">
        <img src="https://www.google.com/s2/favicons?sz=64&domain_url=${url}"
             alt="icon">
      </a>
    `;
    sec.appendChild(div);
  });
}

// -----------------------------------
// ⏰ CZAS
// -----------------------------------
function updateTime() {
  const el = document.getElementById("timePlaceholder");
  if (!el) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  el.textContent = `${hh}:${mm}`;
}

// -----------------------------------
// 🎨 USTAWIENIE TŁA
// -----------------------------------
function loadSettings() {
  const bg = localStorage.getItem("background");
  if (bg) document.body.style.backgroundImage = `url(${bg})`;
}
function handleBackgroundChange(e) {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    document.body.style.backgroundImage = `url(${ev.target.result})`;
    localStorage.setItem("background", ev.target.result);
  };
  r.readAsDataURL(f);
}

// -----------------------------------
// ⚙️ OTWIERANIE / ZAMYKANIE USTAWIEŃ
// -----------------------------------
function openSettings() {
  document.getElementById("settings").style.display = "block";
}
function closeSettings() {
  document.getElementById("settings").style.display = "none";
}

// -----------------------------------
// 🚀 INICJALIZACJA
// -----------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // 1) Załaduj tło, przypięte strony i czas
  loadSettings();
  updatePinnedList();
  updateTime();
  setInterval(updateTime, 1000);

  // 2) Obsługa zmiany tła
  document
    .getElementById("background-selector")
    .addEventListener("change", handleBackgroundChange);

  // 3) Checkboxy do pokazywania/ukrywania sekcji
  document
    .getElementById("pinned-checkbox")
    .addEventListener("change", e =>
      document.getElementById("pinned").style.display =
        e.target.checked ? "flex" : "none"
    );
  document
    .getElementById("searchBar-checkbox")
    .addEventListener("change", e =>
      document.getElementById("searchBar").style.display =
        e.target.checked ? "block" : "none"
    );
  document
    .getElementById("time-checkbox")
    .addEventListener("change", e =>
      document.getElementById("time").style.display =
        e.target.checked ? "block" : "none"
    );

  // 4) Przycisk otwierania dotyczący ustawień
  document
    .getElementById("settingsBtn")
    .addEventListener("click", openSettings);

  // 5) Przycisk zamykania
  document
    .getElementById("settingsCloseBtn")
    .addEventListener("click", closeSettings);
});
