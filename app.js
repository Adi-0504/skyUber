let weather = "Clear";

function sleep(ms){
  return new Promise(r => setTimeout(r, ms));
}

function log(t){
  const box = document.getElementById("aiLog");
  if(!box) return;

  const el = document.createElement("div");
  el.textContent = t;
  box.appendChild(el);
}

function pickEagle(){
  const list = ["Swift","Wind","Root"];
  return list[Math.floor(Math.random()*list.length)];
}

async function callAI(island){

  const box = document.getElementById("aiLog");
  if(box) box.innerHTML = "";

  log("Init");
  await sleep(300);

  log("Weather: " + weather);
  await sleep(300);

  log("Target: " + island);
  await sleep(300);

  const eagle = pickEagle();
  log("Eagle: " + eagle);
  await sleep(300);

  const price = Math.floor(Math.random()*50)+10;
  log("Price: " + price);

  document.getElementById("result").textContent = "Done";

  // ✔ 修正：統一用 nav.js
  const trips = loadTrips();
  trips.push({
    island,
    eagle,
    price,
    time: new Date().toISOString()
  });

  saveTrips(trips);
}
