// frontend/MentalGarden/journal.js

document.getElementById("save-entry").addEventListener("click", async () => {
    const username = localStorage.getItem("username") || "defaultUser";
    const entry = document.getElementById("journal-entry").value;
  
    await fetch("http://localhost:8000/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, entry, date: new Date().toISOString().slice(0, 10) }),
    });
  
    alert("Günlük kaydedildi!");
    document.getElementById("journal-entry").value = "";
  });
  