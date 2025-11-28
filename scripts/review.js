// Rating counter via localStorage
let count = Number(localStorage.getItem("reviewCount")) || 0;
count++;
localStorage.setItem("reviewCount", count);


// Display in HTML
document.getElementById("counter").textContent = count;