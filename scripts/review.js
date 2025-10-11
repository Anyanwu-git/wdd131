// Read query string (GET) and display values; update localStorage counter
const params = new URLSearchParams(location.search);

// simple dictionary to expand the product id back to name on the confirmation page
const products = {
    "fc-1888": "Flux Capacitor",
    "ho-2020": "Hoverboard",
    "wd-2265": "Warp Drive",
    "hs-3000": "Hyper Spanner",
    "sp-2010": "Smart Pillow"
};

function listItem(dt, dd) {
    const $dl = document.getElementById("details");
    const term = document.createElement("dt");
    term.textContent = dt;
    const def = document.createElement("dd");
    def.textContent = dd || "—";
    $dl.append(term, def);
}

document.addEventListener("DOMContentLoaded", () => {
    const productId = params.get("product");
    const productName = products[productId] || productId || "Unknown";
    const rating = params.get("rating");
    const installed = params.get("installed");
    const features = params.getAll("features"); // multiple
    const review = params.get("review");
    const user = params.get("user");

    listItem("Product", productName);
    listItem("Rating", rating);
    listItem("Installed", installed);
    listItem("Features", features.length ? features.join(", ") : "None selected");
    listItem("Written Review", review);
    listItem("User Name", user);

    // localStorage counter
    const KEY = "reviewCount";
    const current = Number(localStorage.getItem(KEY) || 0);
    const next = current + 1;
    localStorage.setItem(KEY, String(next));
    document.getElementById("reviewCount").textContent = next;
});
