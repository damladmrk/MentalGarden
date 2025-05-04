document.getElementById("moodForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const sentence = document.getElementById("dailySentence").value;
  const mood = parseInt(document.getElementById("moodSelect").value);

  // 🌱 API'ye veri gönder
  await fetch("http://localhost:8000/mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "sevval",
      sentence: sentence,
      mood: mood,
      date: new Date().toISOString().slice(0, 10)
    })
  });

  // 🌳 Bahçeye görsel ekle
  const tree = document.createElement("img");
  tree.src = `assets/tree${mood}.svg`;
  tree.className = "flower";
  document.getElementById("garden-view").appendChild(tree);

  // 🧹 Formu temizle
  document.getElementById("dailySentence").value = "";
  document.getElementById("moodSelect").selectedIndex = 0;
});
