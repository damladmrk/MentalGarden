// frontend/MentalGarden/main.js

document.getElementById("moodForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const sentence = document.getElementById("dailySentence").value;
  const mood = parseInt(document.getElementById("moodSelect").value);
  const username = localStorage.getItem("username") || "defaultUser";

  await fetch("http://localhost:8000/mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      sentence: sentence,
      mood: mood,
      date: new Date().toISOString().slice(0, 10),
    }),
  });

  const flower = document.createElement("img");
  flower.src = `assets/flower${mood}.svg`;
  flower.className = "flower";
  document.getElementById("garden-view").appendChild(flower);

  document.getElementById("dailySentence").value = "";
  document.getElementById("moodSelect").selectedIndex = 0;
});

window.addEventListener("DOMContentLoaded", async () => {
  const username = localStorage.getItem("username") || "defaultUser";
  const response = await fetch(`http://localhost:8000/mood-history/${username}`);
  const moodHistory = await response.json();

  moodHistory.forEach((entry) => {
    const flower = document.createElement("img");
    flower.src = `assets/flower${entry.mood}.svg`;
    flower.className = "flower";
    document.getElementById("garden-view").appendChild(flower);
  });
});
