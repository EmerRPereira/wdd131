/* =========================================================
   LISTA DE TEMPLOS (BRASIL)
   ========================================================= */
const temples = [
  {
    nameBR: "Templo de Belém",
    nameUS: "Belém Brazil Temple",
    locationBR: "Belém, Pará, Brasil",
    locationUS: "Belém, Pará, Brazil",
    dedicated: "2022-11-20",
    area: 2385,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/588d3a27e2b911ec94adeeeeac1e0a0694f432a0/full/640%2C/0/default"
  },
  {
    nameBR: "Templo de Brasília",
    nameUS: "Brasília Brazil Temple",
    locationBR: "Brasília, Brasil",
    locationUS: "Brasília, Brazil",
    dedicated: "2023-09-17",
    area: 2300,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/95f3f3abdd4811ed920ceeeeac1e15db91037802/full/640%2C/0/default"
  },
  {
    nameBR: "Templo de Campinas",
    nameUS: "Campinas Brazil Temple",
    locationBR: "Campinas, São Paulo, Brasil",
    locationUS: "Campinas, São Paulo, Brazil",
    dedicated: "2002-05-17",
    area: 2150,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/c9a81a6f86750d7d9ade3499d3df52e2f7f726a7/full/640%2C/0/default"
  },
  {
    nameBR: "Templo de Curitiba",
    nameUS: "Curitiba Brazil Temple",
    locationBR: "Curitiba, Paraná, Brasil",
    locationUS: "Curitiba, Paraná, Brazil",
    dedicated: "2008-06-01",
    area: 2587,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/ea7e0f39c8e26d163a4dfedfcb1ce5c41d650b5b/full/640%2C/0/default"
  },
  {
    nameBR: "Templo de Fortaleza",
    nameUS: "Fortaleza Brazil Temple",
    locationBR: "Fortaleza, Ceará, Brasil",
    locationUS: "Fortaleza, Ceará, Brazil",
    dedicated: "2019-06-02",
    area: 3300,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/e2a28dbb2b14f5f71d79b359cf9f7b88dc480144/full/640%2C/0/default"
  },
  {
    nameBR: "Templo de Londrina",
    nameUS: "Londrina Brazil Temple",
    locationBR: "Londrina, Paraná, Brasil",
    locationUS: "Londrina, Paraná, Brazil",
    dedicated: "TBD",
    area: 0,
    imageUrl: "images/londrina-temple.jpeg"
  },
  {
    nameBR: "Templo de Manaus",
    nameUS: "Manaus Brazil Temple",
    locationBR: "Manaus, Amazonas, Brasil",
    locationUS: "Manaus, Amazonas, Brazil",
    dedicated: "2012-06-10",
    area: 2976,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/f758727dc0cd20dc24845be6e5810f81e400d603/full/640%2C/0/default"
  },
  {
    nameBR: "Templo de Porto Alegre",
    nameUS: "Porto Alegre Brazil Temple",
    locationBR: "Porto Alegre, Rio Grande do Sul, Brasil",
    locationUS: "Porto Alegre, Rio Grande do Sul, Brazil",
    dedicated: "2000-12-17",
    area: 2137,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/8b7f7031cc837345a3638255f73ad8df9b9ed693/full/640%2C/0/default"
  },
  {
    nameBR: "Templo de Recife",
    nameUS: "Recife Brazil Temple",
    locationBR: "Recife, Pernambuco, Brasil",
    locationUS: "Recife, Pernambuco, Brazil",
    dedicated: "2000-12-15",
    area: 3460,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/74d57cefebf31773df61b0b882067ee236de5279/full/640%2C/0/default"
  },
  {
    nameBR: "Templo do Rio de Janeiro",
    nameUS: "Rio de Janeiro Brazil Temple",
    locationBR: "Rio de Janeiro, Brasil",
    locationUS: "Rio de Janeiro, Brazil",
    dedicated: "2022-05-08",
    area: 2784,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/001db7326e638032470a02813c9e47191ef74b0e/full/640%2C/0/default"
  }
];

/* =========================================================
   ELEMENTOS
   ========================================================= */
const container = document.querySelector("#temple-cards");
const languageSelect = document.querySelector("#language-select");
const themeToggle = document.querySelector("#theme-toggle");

/* IDIOMA */
let currentLang = "pt-BR";

const translations = {
  "pt-BR": {
    title: "Templos do Brasil",
    lastUpdate: "Última atualização:",
    labels: { location: "Local", dedicated: "Dedicação", area: "Área" },
    filters: ["Todos", "Antigos", "Novos", "Pequenos", "Grandes"]
  },
  "en-US": {
    title: "Temples in Brazil",
    lastUpdate: "Last updated:",
    labels: { location: "Location", dedicated: "Dedicated", area: "Area" },
    filters: ["All", "Old", "New", "Small", "Large"]
  }
};

function updateLanguage() {
  const t = translations[currentLang];

  document.getElementById("page-title").textContent = t.title;
  document.getElementById("footer-label").textContent = t.lastUpdate;

  document.querySelectorAll(".filter-btn").forEach((btn, i) => {
    btn.textContent = t.filters[i];
  });

  displayTemples(temples);
}

languageSelect.addEventListener("change", () => {
  currentLang = languageSelect.value;
  updateLanguage();
});

/* =========================================================
   DISPLAY DOS CARDS
   ========================================================= */
function displayTemples(list) {
  container.innerHTML = "";

  list.forEach((temple) => {
    const t = translations[currentLang];

    const title = currentLang === "pt-BR" ? temple.nameBR : temple.nameUS;
    const location =
      currentLang === "pt-BR" ? temple.locationBR : temple.locationUS;

    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <h2>${title}</h2>
      <p><strong>${t.labels.location}:</strong> ${location}</p>
      <p><strong>${t.labels.dedicated}:</strong> ${temple.dedicated}</p>
      <p><strong>${t.labels.area}:</strong> ${temple.area} m²</p>

      <img data-src="${temple.imageUrl}" alt="${title}">
    `;

    container.appendChild(card);
  });

  lazyLoadImages();
}

/* =========================================================
   LAZY-LOADING
   ========================================================= */
function lazyLoadImages() {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector("img");
          img.src = img.dataset.src;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((c) => observer.observe(c));
}

/* =========================================================
   FILTROS
   ========================================================= */
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    let filtered = temples;

    if (filter === "old")
      filtered = temples.filter(
        (t) => new Date(t.dedicated).getFullYear() < 2000
      );

    if (filter === "new")
      filtered = temples.filter(
        (t) => new Date(t.dedicated).getFullYear() >= 2000
      );

    if (filter === "small")
      filtered = temples.filter((t) => t.area > 0 && t.area < 2500);

    if (filter === "large")
      filtered = temples.filter((t) => t.area >= 3000);

    displayTemples(filtered);
  });
});

/* =========================================================
   TEMA (DARK/LIGHT)
   ========================================================= */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ Light"
    : "🌙 Dark";
});

/* =========================================================
   FOOTER
   ========================================================= */
document.getElementById("currentyear").textContent =
  new Date().getFullYear();
document.getElementById("lastmodified").textContent =
  document.lastModified;

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */
displayTemples(temples);
updateLanguage();
