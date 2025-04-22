// Funkcja do dodania przypiętej strony
function pinSite() {
  const pinnedUrl = document.getElementById("pinned-url").value.trim();

  // Sprawdzamy, czy URL zaczyna się od "http://" lub "https://"
  let url = pinnedUrl;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;  // Jeśli nie, dodajemy https://
  }

  // Tworzymy element listy do wyświetlenia przypiętej strony
  const pinnedItem = document.createElement("li");
  pinnedItem.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  
  // Dodajemy przypiętą stronę do listy
  document.getElementById("pinned-list").appendChild(pinnedItem);

  // Czyszczenie pola input po dodaniu przypiętej strony
  document.getElementById("pinned-url").value = "";
}

// Funkcja do resetowania tła
function updateBackground() {
  const file = document.getElementById("background-selector").files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    document.body.style.backgroundImage = `url(${e.target.result})`;
  };
  
  reader.readAsDataURL(file);
}

// Funkcja do resetowania tła na domyślne
document.getElementById("reset-bg-btn").addEventListener("click", function() {
  document.body.style.backgroundImage = ''; // Resetuje tło
});

// Funkcja do otwierania ustawień
function openSettings() {
  document.getElementById("settings").style.display = "block";
}

// Funkcja do zamykania ustawień
function closeSettings() {
  document.getElementById("settings").style.display = "none";
}

// Funkcja do aktualizacji czasu
function updateTime() {
  const timeElement = document.getElementById("time");
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  timeElement.innerHTML = `${hours}:${minutes}`;
}

// Aktualizacja czasu co minutę
setInterval(updateTime, 60000);
updateTime(); // Wywołanie funkcji po załadowaniu strony
