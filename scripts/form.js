/* Populate the Product <select> from an array of objects */

// Provided array (id used for value, name for display)
const products = [
    { id: "fc-1888", name: "Flux Capacitor", averagerating: 4.5 },
    { id: "ho-2020", name: "Hoverboard", averagerating: 4.7 },
    { id: "wd-2265", name: "Warp Drive", averagerating: 4.1 },
    { id: "hs-3000", name: "Hyper Spanner", averagerating: 3.9 },
    { id: "sp-2010", name: "Smart Pillow", averagerating: 3.5 }
];

document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector("#productName");
    products.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.id;        // value is the id
        opt.textContent = p.name; // visible text is the name
        select.appendChild(opt);
    });

    // Optional: client-side assistance for required fields
    const form = document.getElementById("reviewForm");
    form.addEventListener("submit", (e) => {
        if (!form.checkValidity()) {
            // Let the browser show its native messages
            return;
        }
        // proceed (GET to review.html)
    });
});
