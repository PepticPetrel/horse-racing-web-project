const modal = document.getElementById("modal");
const btn = document.getElementById("signInBtn");
const span = document.querySelector(".close");
const passwordInput = document.getElementById("password");
const registerBtn = document.querySelector(".register");
let horseData = {}

registerBtn.onclick = function (event) {

  const password = passwordInput.value.trim();

  if (password === "") {
    alert("Поле паролю не може бути порожнім.");
    return;
  }

  if (password.length < 6) {
    alert("Пароль повинен містити щонайменше 6 символів.");
    return;
  }

  alert("Пароль прийнято. Реєстрація успішна!");
};

btn.onclick = function () {
  modal.style.display = "block";

};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

fetch('track-date.json')
    .then(response => response.json())
    .then(data => {
      horseData = data;
      const trackSelect = document.getElementById('track-name');
      const trackImage = document.getElementById('track-image');
      const trackDescriptionImg = document.getElementById('description-img');
      const trackDescription = document.getElementById('description');


      for (let track in data.tracks) {
      const option = document.createElement('option');
      option.value = track;
      option.text = track;
      trackSelect.appendChild(option);
    }

      trackSelect.addEventListener('change', () => {
        const selectedTrack = trackSelect.value;
        const trackData = data.tracks[selectedTrack];

        trackImage.src = trackData.info.image;
        trackDescriptionImg.src = trackData.info.img;
        trackDescription.textContent = trackData.info.description;    
    });
  });

  function handlePlaceClick(horseId) {
  const trackName = document.getElementById('track-name').value;
  if (!trackName || !horseData.tracks[trackName]) return;

  const horse = horseData.tracks[trackName].horses[horseId];
  if (!horse || !horse.info) return;

  document.getElementById("horse-img").src = horse.info.image || "";
  document.getElementById("horse-name").textContent = horse.info.name || "—";
  document.getElementById("horse-age").textContent = horse.info.age ? horse.info.age + " years" : "—";
  document.getElementById("horse-number").textContent = horse.info["track-number"] || "—";
  document.getElementById("horse-jockey").textContent = horse.info.jockey || "—";
  document.getElementById("horse-owner").textContent = horse.info.owner || "—";
}