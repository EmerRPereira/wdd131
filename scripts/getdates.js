// Get the current year and insert it into the span with id="currentyear"
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Displays the date the file was last modified HTML
document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;
