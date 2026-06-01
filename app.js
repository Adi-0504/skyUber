let weather = "Clear";

function sleep(ms){
  return new Promise(r=>setTimeout(r,ms));
}

function log(t){
  const el = document.createElement("div");
  el.textContent = t;
  document.getElementById("aiLog").appendChild(el);
}

function pickEagle(){
  const list = ["Swift","Wind","Root"];
  return list[Math.floor(Math.random()*list.length)];
}

async function callAI(island){

  document.getElementById("aiLog").innerHTML = "";

  log("Init");
  await sleep(400);

  log("Weather: " + weather);
  await sleep(400);

  log("Target: " + island);
  await sleep(400);

  const eagle = pickEagle();
  log("Eagle: " + eagle);
  await sleep(400);

  const price = Math.floor(Math.random()*50)+10;
  log("Price: " + price);

  document.getElementById("result").textContent = "Done";

  trips.push({
    island,
    eagle,
    price
  });

  localStorage.setItem("trips", JSON.stringify(trips));
}
