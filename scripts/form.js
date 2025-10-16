// scripts/form.js
import { products } from "./products.js"; // if using modules

const select = document.getElementById("productName");
function fillProducts(list) {
    list.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;     // requirement: option value is the product name
        opt.textContent = p.name;
        select.appendChild(opt);
    });
}
fillProducts(products);

// (optional) simple client-side guard for the placeholder
document.getElementById("reviewForm").addEventListener("submit", (e) => {
    if (!select.value) {
        e.preventDefault();
        select.focus();
    }
});
