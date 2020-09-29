let userCoord = localStorage.getItem("userCoord") ? JSON.parse(localStorage.getItem("userCoord")) : [];

if (userCoord.length > 0) {
    fetch("http://localhost:3000/api/teddies/")
    document.getElementById("error").style.display = "none";
    document.getElementById("order")
}