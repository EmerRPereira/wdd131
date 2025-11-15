/* --------------- Full translation + UI script --------------- */

/*
 - Use data-i18n attributes in HTML and the STRINGS table below.
 - Clicking BR / US toggles all textual content on the page.
 - Wind chill calc uses static values (adjust constants below).
*/

// ------- Translation dictionary (complete page) -------
const STRINGS = {
  pt: {
    langCode: 'pt-BR',
    title: "Foz do Iguaçu – Cataratas do Iguaçu",
    dataHeading: "Dados",
    weatherHeading: "Clima ⛅",
    country_label: "País:",
    state_label: "Estado:",
    population_label: "População:",
    founded_label: "Fundação:",
    attraction_label: "Ponto turístico:",
    river_label: "Rio:",
    borders_label: "Fronteiras:",
    altitude_label: "Altitude média:",
    climate_label: "Clima:",
    hdi_label: "IDH:",
    density_label: "Densidade demográfica:",
    country: "Brasil",
    state: "Paraná",
    population: "258.532",
    founded: "10 de junho de 1914",
    attraction: "Cataratas do Iguaçu",
    river: "Rio Iguaçu",
    borders: "Paraguai e Argentina",
    altitude: "192 m",
    climate: "Subtropical úmido",
    hdi: "0.760 (exemplo)",
    density: "---",
    temp_label: "Temperatura:",
    cond_label: "Condição:",
    wind_label: "Vento:",
    wc_label: "Sensação térmica:",
    condition_text: "Parcialmente nublado",
    placeName: "Foz do Iguaçu - Brasil",
    lastModPrefix: "Última Modificação:",
    developedBy: "Desenvolvido por",
    author: "Emerson Ronald Pereira"
  },

  en: {
    langCode: 'en',
    title: "Foz do Iguaçu – Iguaçu Falls",
    dataHeading: "Data",
    weatherHeading: "Weather ⛅",
    country_label: "Country:",
    state_label: "State:",
    population_label: "Population:",
    founded_label: "Foundation:",
    attraction_label: "Tourist attraction:",
    river_label: "River:",
    borders_label: "Borders:",
    altitude_label: "Average altitude:",
    climate_label: "Climate:",
    hdi_label: "HDI:",
    density_label: "Population density:",
    country: "Brazil",
    state: "Paraná",
    population: "258,532",
    founded: "June 10, 1914",
    attraction: "Iguaçu Falls",
    river: "Iguaçu River",
    borders: "Paraguay and Argentina",
    altitude: "192 m",
    climate: "Humid subtropical",
    hdi: "0.760 (example)",
    density: "---",
    temp_label: "Temperature:",
    cond_label: "Condition:",
    wind_label: "Wind:",
    wc_label: "Wind Chill:",
    condition_text: "Partly cloudy",
    placeName: "Foz do Iguaçu - Brazil",
    lastModPrefix: "Last Modification:",
    developedBy: "Developed by",
    author: "Emerson Ronald Pereira"
  }
};

// ------- DOM references -------
const btnPT = document.getElementById('btn-pt');
const btnEN = document.getElementById('btn-en');

// year / last modified
const yearEl = document.getElementById('year');
const lastModifiedEl = document.getElementById('lastModified');

// set year and lastModified
yearEl.textContent = new Date().getFullYear();
lastModifiedEl.textContent = document.lastModified || '—';

// all translatable elements have [data-i18n="key"]
const i18nEls = document.querySelectorAll('[data-i18n]');

// initial language
let LANG = 'pt';
applyLanguage(LANG);

// ------- Event listeners for language buttons -------
btnPT.addEventListener('click', () => {
  LANG = 'pt';
  btnPT.setAttribute('aria-pressed','true');
  btnEN.setAttribute('aria-pressed','false');
  applyLanguage(LANG);
});
btnEN.addEventListener('click', () => {
  LANG = 'en';
  btnEN.setAttribute('aria-pressed','true');
  btnPT.setAttribute('aria-pressed','false');
  applyLanguage(LANG);
});

// ------- applyLanguage: writes text to all [data-i18n] elements -------
function applyLanguage(lang) {
  const s = STRINGS[lang];

  // update document language attribute
  if (s && s.langCode) document.documentElement.lang = s.langCode;

  // iterate through translatable nodes
  i18nEls.forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (!key) return;
    // If string exists in dictionary write it
    if (s[key] !== undefined) {
      node.textContent = s[key];
    }
  });

  // Update author field if present (a bit redundant but safe)
  const authorNode = document.getElementById('author');
  if (authorNode && s.author) authorNode.textContent = s.author;
}

// ------- WEATHER (static values as requested) -------
const STATIC_TEMP_C = 8;     // set your static temperature (°C)
const STATIC_WIND_KMH = 12;  // set your static wind speed (km/h)

const tempEl = document.getElementById('temp');
const speedEl = document.getElementById('speed') || createSpeedPlaceholder();
const conditionEl = document.getElementById('condition');
const windchillEl = document.getElementById('windchill') || createWindchillPlaceholder();

// Put static values into DOM
if (tempEl) tempEl.textContent = STATIC_TEMP_C;
if (speedEl) speedEl.textContent = STATIC_WIND_KMH;
if (conditionEl) conditionEl.textContent = STRINGS[LANG].condition_text;

// Wind chill calculation for °C
function calculateWindChill(t, s) {
  // returns numeric
  return 13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16);
}

// show wind chill only if applicable (temp <= 10C and wind > 4.8 km/h)
if (!isNaN(STATIC_TEMP_C) && !isNaN(STATIC_WIND_KMH) && STATIC_TEMP_C <= 10 && STATIC_WIND_KMH > 4.8) {
  if (windchillEl) windchillEl.textContent = calculateWindChill(STATIC_TEMP_C, STATIC_WIND_KMH).toFixed(1) + " °C";
} else {
  if (windchillEl) windchillEl.textContent = "N/A";
}

/* Utility to create speed and windchill placeholders in case they are missing */
function createSpeedPlaceholder() {
  const node = document.getElementById('speed');
  if (node) return node;
  // fallback: try to find .weather-list and append a node
  const list = document.querySelector('.weather-list');
  if (!list) return null;
  const li = document.createElement('li');
  li.innerHTML = `<span class="label">${STRINGS[LANG].wind_label}</span> <span class="value"><span id="speed">${STATIC_WIND_KMH}</span> km/h</span>`;
  list.appendChild(li);
  return document.getElementById('speed');
}
function createWindchillPlaceholder() {
  const node = document.getElementById('windchill');
  if (node) return node;
  const list = document.querySelector('.weather-list');
  if (!list) return null;
  const li = document.createElement('li');
  li.innerHTML = `<span class="label">${STRINGS[LANG].wc_label}</span> <span class="value" id="windchill">${ (STATIC_TEMP_C <=10 && STATIC_WIND_KMH>4.8) ? calculateWindChill(STATIC_TEMP_C, STATIC_WIND_KMH).toFixed(1)+" °C" : "N/A" }</span>`;
  list.appendChild(li);
  return document.getElementById('windchill');
}

// Ensure language is applied to weather condition string after initial setup
applyLanguage(LANG);
if (conditionEl) conditionEl.textContent = STRINGS[LANG].condition_text;
