// Czas – aktualizacja co sekundę
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const timeElement = document.getElementById('time');
  timeElement.textContent = timeString;

  // Automatyczna zmiana koloru tekstu w zależności od jasności tła
  const bgColor = window.getComputedStyle(document.body).backgroundImage;
  const img = new Image();
  img.src = bgColor.slice(5, -2);
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    timeElement.style.color = brightness > 128 ? 'black' : 'white';
  };
}
setInterval(updateTime, 1000);
updateTime();

// Ustawienia – otwieranie i zamykanie
document.getElementById('settingsBtn').addEventListener('click', () => {
  document.getElementById('settings').style.display = 'block';
});
document.getElementById('settingsCloseBtn').addEventListener('click', () => {
  document.getElementById('settings').style.display = 'none';
});

// Zmiana tła
const bgInput = document.getElementById('bgInput');
bgInput.addEventListener('change', () => {
  const file = bgInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const url = e.target.result;
    document.body.style.backgroundImage = `url('${url}')`;
    localStorage.setItem('customBackground', url);
  };
  if (file) reader.readAsDataURL(file);
});

// Resetowanie tła
document.getElementById('resetBackgroundBtn').addEventListener('click', () => {
  localStorage.removeItem('customBackground');
  document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=1461&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
});

// Wczytanie tła z localStorage
const savedBg = localStorage.getItem('customBackground');
if (savedBg) {
  document.body.style.backgroundImage = `url('${savedBg}')`;
}

// Przypinanie elementów
let pinnedItems = JSON.parse(localStorage.getItem('pinnedItems')) || [];

function displayPinnedItems() {
  const pinnedContainer = document.getElementById('pinned');
  pinnedContainer.innerHTML = '';
  pinnedItems.forEach((item, index) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.classList.add('pinnedItems');

    const img = document.createElement('img');
    img.src = item.icon;
    img.alt = item.name;
    img.title = item.name;

    link.appendChild(img);
    pinnedContainer.appendChild(link);
  });
}
displayPinnedItems();

// Dodawanie przypiętych
document.getElementById('addPinnedBtn').addEventListener('click', () => {
  let url = document.getElementById('pinned-url').value.trim();
  const name = document.getElementById('pinned-name').value.trim();
  const icon = document.getElementById('pinned-icon').value.trim();

  // Automatyczne dodanie https:// jeśli brak
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  if (url && name && icon) {
    const newItem = { url, name, icon };
    pinnedItems.push(newItem);
    localStorage.setItem('pinnedItems', JSON.stringify(pinnedItems));
    displayPinnedItems();

    // Reset pól formularza
    document.getElementById('pinned-url').value = '';
    document.getElementById('pinned-name').value = '';
    document.getElementById('pinned-icon').value = '';
  }
});
