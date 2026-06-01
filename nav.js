let trips = JSON.parse(localStorage.getItem("trips") || "[]");

function saveTrips(){
  localStorage.setItem("trips", JSON.stringify(trips));
}
