// scripts/form.js
const select = document.querySelector("#productName");

if (select && Array.isArray(window.products)) {
    select.insertAdjacentHTML(
        "beforeend",
        window.products.map(p => `<option value="${p.name}">${p.name}</option>`).join("")
    );
}
