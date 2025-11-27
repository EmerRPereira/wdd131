// Contador de avaliações via localStorage
let count = Number(localStorage.getItem("reviewCount")) || 0;
count++;
localStorage.setItem("reviewCount", count);


// Exibe no HTML
document.getElementById("counter").textContent = count;