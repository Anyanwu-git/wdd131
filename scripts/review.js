// scripts/review.js
const params = new URLSearchParams(location.search);
const details = document.querySelector("#details");

function get(k) { return params.get(k) ?? ""; }
function add(label, value) {
    if (value) details.insertAdjacentHTML("beforeend", `<li><strong>${label}:</strong> ${value}</li>`);
}

// Map query params (keep names in sync with form.html)
add("Product", get("product"));
add("Overall Rating", get("rating"));
add("Date of Installation", get("installDate"));
const features = params.getAll("features");
if (features.length) add("Useful Features", features.join(", "));
add("Written Review", get("review"));
add("About You", get("about"));
add("Your Name", get("user"));

// Increment and show counter
const KEY = "reviewCount";
const count = Number(localStorage.getItem(KEY) || 0) + 1;
localStorage.setItem(KEY, String(count));
document.querySelector("#counter").textContent = count;
