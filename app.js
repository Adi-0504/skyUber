let lang = "en";
let trips = [];

/* 🌍 世界 */
const world = {
  islands: {
    "平原島": 1,
    "森林島": 1.2,
    "礦山島": 2,
    "沙灘島": 1.5
  },
  eagles: [
    { name: "Swift Tawa", cost: 1 },
    { name: "Wind Tawa", cost: 1.2 },
    { name: "Root Tawa", cost: 1.1 }
  ],
  weather: ["Clear", "Windy", "Fog", "Storm"]
};

let weather = randomWeather();

/* 🌐 i18n */
const i18n = {
  zh: {
    choose: "選擇目的地",
    log: "系統紀錄",
    history: "行程紀錄",
    idle: "待命中",
    done: "完成派遣"
  },
  en: {
    choose: "Choose Destination",
    log: "System Log",
    history: "History",
    idle: "Idle",
    done: "Dispatch Complete"
  },
  sky: {
    choose: "গओয ςς",
    log: "ςγς λσg",
    history: "τςιρ",
    idle: "ιdλε",
    done: "ςσμρλτε"
  }
};

function t(k) {
  return i18n[lang][k] || k;
}

/* ⏳ 工具 */
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function log(text, type="") {
  const el = document.createElement("div");
  el.className = "log " + type;
  el.textContent = text;
  document.getElementById("aiLog").appendChild(el);
}

/* 🌫️ 天氣 */
function randomWeather() {
  return world.weather[Math.floor(Math.random() * world.weather.length)];
}

/* 🦅 AI */
function pickEagle() {
  return world.eagles[Math.floor(Math.random() * world.eagles.length)];
}

function cost(island, eagle) {
  return Math.round(10 * world.islands[island] * eagle.cost);
}

/* 🧠 typing log */
async function typeLog(text, type="") {
  const el = document.createElement("div");
  el.className = "log " + type;
  document.getElementById("aiLog").appendChild(el);

  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await sleep(15);
  }
}

/* 💳 payment */
async function pay(amount) {
  document.getElementById("result").textContent = "Processing";

  await sleep(600);
  document.getElementById("result").textContent = "Verifying";

  await sleep(600);
  document.getElementById("result").textContent = "Paid: " + amount;
}

/* 🚀 main */
async function callAI(island) {

  document.getElementById("aiLog").innerHTML = "";

  await typeLog("Init system");
  await typeLog("Weather: " + weather);

  await typeLog("Analyze: " + island);

  const eagle = pickEagle();
  await typeLog("Eagle: " + eagle.name);

  const price = cost(island, eagle);
  await typeLog("Cost: " + price);

  await pay(price);

  await typeLog("Complete", "final");

  trips.push({
    island,
    eagle: eagle.name,
    price,
    weather
  });

  render();

  weather = randomWeather();
}

/* 📜 history */
function render() {
  let html = "";

  for (let i = trips.length - 1; i >= 0; i--) {
    const t = trips[i];

    html += `
      <div class="card">
        ${t.island}<br>
        ${t.eagle}<br>
        ${t.weather}<br>
        ${t.price}
      </div>
    `;
  }

  document.getElementById("history").innerHTML = html;

  document.getElementById("choose").textContent = t("choose");
  document.getElementById("logTitle").textContent = t("log");
  document.getElementById("historyTitle").textContent = t("history");
  document.getElementById("result").textContent = t("idle");
}

/* 🌍 language */
function setLang(l) {
  lang = l;
  render();
}
