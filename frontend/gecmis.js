// frontend/MentalGarden/gecmis.js

const moodDescriptions = [
    "Bugün biraz stresli hissediyordum.",
    "Biraz üzgündüm bugün.",
    "Ne iyi ne kötü, dengeli bir gündü.",
    "Kendimi oldukça iyi hissediyordum.",
    "Bugün çok mutlu hissediyordum!"
  ];
  
  function formatDate(isoDate) {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    const d = new Date(isoDate);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  
  async function loadMoodHistory() {
    const username = localStorage.getItem("username") || "defaultUser";
    const response = await fetch(`http://localhost:8000/mood-history/${username}`);
    const moodData = await response.json();
  
    const moodGrid = document.getElementById("moodGrid");
    moodGrid.innerHTML = "";
  
    moodData.reverse().forEach(entry => {
      const card = document.createElement("div");
      card.className = "mood-card";
      card.innerHTML = `
        <p class="mood-date">${formatDate(entry.date)}</p>
        <img src="assets/tree${entry.mood}.svg" alt="Mood" class="mood-image" />
        <p class="mood-desc">${moodDescriptions[entry.mood]}</p>
      `;
      moodGrid.appendChild(card);
    });
  }
  
  async function loadJournals() {
    const username = localStorage.getItem("username") || "defaultUser";
    const res = await fetch(`http://localhost:8000/journal/${username}`);
    const data = await res.json();
  
    const container = document.getElementById("journal-list");
    container.innerHTML = "";
  
    data.reverse().forEach(entry => {
      const p = document.createElement("p");
      p.innerText = `${formatDate(entry.date)}: ${entry.entry}`;
      container.appendChild(p);
    });
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    loadMoodHistory();
    loadJournals();
  });
  