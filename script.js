// --- ZMIENNE GLOBALNE ---
let pinnedItems = JSON.parse(localStorage.getItem('pinnedItems')) || [];

// --- ZEGAR ---
function updateTime() {
  const timeElement = document.getElementById('time');
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  timeElement.textContent = timeString;

  // Automatyczna zmiana koloru czasu w zależności od tła
  const bgColor = window.getComputedStyle(document.body).backgroundImage;
  if (bgColor.includes('white') || bgColor.includes('wwdc') || getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)') {
    timeElement.style.color = 'black';
  } else {
    timeElement.style.color = 'white';
  }
}
setInterval(updateTime, 1000);
updateTime();

// --- WYŚWIETLANIE PRZYPINANYCH ---
function displayPinnedItems() {
  const pinnedContainer = document.getElementById('pinned');
  pinnedContainer.innerHTML = '';
  pinnedItems.forEach((item, index) => {
    const element = document.createElement('div');
    element.className = 'pinnedItems';
    element.innerHTML = `<a href="${item.url}" target="_blank"><img src="${item.icon}" alt="${item.name}" title="${item.name}"></a>`;
    pinnedContainer.appendChild(element);
  });
}
displayPinnedItems();

// --- PRZYCISK USTAWIEŃ ---
document.getElementById('settingsBtn').addEventListener('click', () => {
  document.getElementById('settings').style.display = 'block';
});
document.getElementById('settingsCloseBtn').addEventListener('click', () => {
  document.getElementById('settings').style.display = 'none';
});

// --- ZMIANA TŁA ---
const bgInput = document.getElementById('bg-url');
if (bgInput) {
  bgInput.addEventListener('change', () => {
    const newBg = bgInput.value.trim();
    if (newBg) {
      document.body.style.backgroundImage = `url('${newBg}')`;
      localStorage.setItem('bgImage', newBg);
    }
  });
}

// --- RESET TŁA ---
document.getElementById('reset-bg-btn').addEventListener('click', () => {
  localStorage.removeItem('bgImage');
  location.reload();
});

// --- PRZYWRACANIE TŁA Z LOCALSTORAGE ---
const savedBg = localStorage.getItem('bgImage');
if (savedBg) {
  document.body.style.backgroundImage = `url('${savedBg}')`;
}

// --- DODAWANIE PRZYPINANEJ STRONY ---
document.getElementById('addPinnedBtn').addEventListener('click', () => {
  const url = document.getElementById('pinned-url').value.trim();
  const name = document.getElementById('pinned-name').value.trim();
  const icon = document.getElementById('pinned-icon').value.trim();

  // Automatyczne dodanie https://
  const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

  if (url && name && icon) {
    const newItem = { url: formattedUrl, name, icon };
    pinnedItems.push(newItem);
    localStorage.setItem('pinnedItems', JSON.stringify(pinnedItems));
    displayPinnedItems();

    // Resetuj pola
    document.getElementById('pinned-url').value = '';
    document.getElementById('pinned-name').value = '';
    document.getElementById('pinned-icon').value = '';
  }
});
