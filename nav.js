function loadTrips(){
  return JSON.parse(localStorage.getItem("trips") || "[]");
}

function saveTrips(trips){
  localStorage.setItem("trips", JSON.stringify(trips));
}
