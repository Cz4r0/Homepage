window.onload = function() {
    function updateTime() {
      const time = new Date();
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      document.getElementById('timePlaceholder').textContent = `${hours}:${minutes}`;
    }
    
    setInterval(updateTime, 1000); // Aktualizowanie czasu co sekundę
    updateTime(); // Wyświetlenie początkowego czasu
  };  