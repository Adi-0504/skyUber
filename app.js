let trips = [];

/* System Data */
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
    { name: "Root Tawa", cost: 1.1 },
    { name: "Gran Tawa", cost: 2 }
  ],
  weather: ["Clear", "Windy", "Storm", "Fog"]
};

let currentWeather = randomWeather();

/* Utils */
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function log(text, type = "") {
  const el = document.createElement("div");
  el.className = "log " + type;
  el.textContent = text;
  document.getElementById("aiLog").appendChild(el);
}

/* Weather */
function randomWeather() {
  return world.weather[Math.floor(Math.random() * world.weather.length)];
}

/* AI Engine */
function pickEagle() {
  return world.eagles[Math.floor(Math.random() * world.eagles.length)];
}

function calculateCost(island, eagle) {
  let base = 10;
  let islandMult = world.islands[island] || 1;

  let weatherMult = 1;
  if (currentWeather === "Storm") weatherMult = 1.2;
  if (currentWeather === "Fog") weatherMult = 1.4;

  return Math.round(base * islandMult * eagle.cost * weatherMult);
}

/* Typing AI log */
async function typeLog(text, type = "") {
  const el = document.createElement("div");
  el.className = "log " + type;
  document.getElementById("aiLog").appendChild(el);

  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await sleep(18);
  }
}

/* Payment simulation */
async function payment(cost) {
  const result = document.getElementById("result");

  result.textContent = "Processing payment";
  await sleep(700);

  result.textContent = "Verifying currency (mato damu)";
  await sleep(700);

  result.textContent = "Payment completed: " + cost;
  await sleep(500);
}

/* Main AI flow */
async function callAI(island) {

  document.getElementById("aiLog").innerHTML = "";
  document.getElementById("result").textContent = "Initializing";

  await typeLog("System request received");
  await sleep(300);

  await typeLog("Weather condition: " + currentWeather, "ai");
  await sleep(300);

  await typeLog("Analyzing destination: " + island, "ai");
  await sleep(400);

  await typeLog("Searching available Sky Eagles");
  await sleep(500);

  const eagle = pickEagle();
  await typeLog("Eagle selected: " + eagle.name, "ai");
  await sleep(400);

  await typeLog("Calculating route cost");
  await sleep(500);

  const cost = calculateCost(island, eagle);
  await typeLog("Estimated cost: " + cost, "ai");
  await sleep(400);

  await typeLog("Starting payment process");
  await payment(cost);

  await typeLog("Dispatch confirmed", "final");

  trips.push({
    eagle: eagle.name,
    to: island,
    cost,
    weather: currentWeather,
    time: new Date().toLocaleTimeString()
  });

  renderHistory();
  currentWeather = randomWeather();
}

/* History */
function renderHistory() {
  let html = "";

  for (let i = trips.length - 1; i >= 0; i--) {
    const t = trips[i];

    html += `
      <div class="card">
        <div>Sky Eagle: ${t.eagle}</div>
        <div>Route: ${t.to}</div>
        <div>Weather: ${t.weather}</div>
        <div>Cost: ${t.cost}</div>
        <div>Time: ${t.time}</div>
      </div>
    `;
  }

  document.getElementById("history").innerHTML = html;
}
