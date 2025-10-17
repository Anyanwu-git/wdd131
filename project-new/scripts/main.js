/* ====== Utilities ====== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* Year */
$("#year").textContent = new Date().getFullYear();

/* Mobile menu */
const menuBtn = $("#menuBtn");
const siteNav = $("#siteNav");
if (menuBtn && siteNav) {
    menuBtn.addEventListener("click", () => {
        const open = siteNav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open);
    });
}

/* Theme toggle (localStorage) */
const themeBtn = $("#themeBtn");
const THEME_KEY = "ms-hub.theme";
const applyTheme = (t) => {
    document.documentElement.classList.toggle("dark", t === "dark");
    if (themeBtn) themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
};
const savedTheme = localStorage.getItem(THEME_KEY) || "light";
applyTheme(savedTheme);
if (themeBtn) {
    themeBtn.setAttribute("aria-pressed", savedTheme === "dark");
    themeBtn.addEventListener("click", () => {
        const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        themeBtn.setAttribute("aria-pressed", next === "dark");
        applyTheme(next);
    });
}

/* ====== Home: Render Topics ====== */
const topics = [
    { id: 1, title: "Time Management", level: "beginner", blurb: "Plan effective study sessions.", color: "#ef4444" },
    { id: 2, title: "Note-Taking", level: "intermediate", blurb: "Cornell method, mapping & more.", color: "#22c55e" },
    { id: 3, title: "Exam Skills", level: "advanced", blurb: "Memory techniques and practice.", color: "#eab308" },
];
const topicGrid = $("#topicGrid");
if (topicGrid) {
    topicGrid.innerHTML = topics.map(t => `
    <article class="card">
      <h3>${t.title}</h3>
      <p>${t.blurb}</p>
      <span class="badge" style="background:${t.color}">${t.level}</span>
    </article>
  `).join("");
}

/* ====== Courses page ====== */
const courses = [
    { id: "C101", title: "Study Habits 101", level: "beginner", hours: 6 },
    { id: "C205", title: "Active Recall & Spaced Repetition", level: "intermediate", hours: 8 },
    { id: "C310", title: "Deep Work & Focus", level: "advanced", hours: 7 },
    { id: "C120", title: "Mind-maps & Visual Notes", level: "beginner", hours: 5 },
];

const courseList = $("#courseList");
const levelSelect = $("#levelSelect");
const searchBox = $("#searchBox");
const clearBtn = $("#clearBtn");

function renderCourses(list) {
    if (!courseList) return;
    courseList.innerHTML = list.map(c => `
    <article class="card">
      <h3>${c.title}</h3>
      <p><strong>Level:</strong> ${c.level}</p>
      <p><strong>Hours:</strong> ${c.hours}</p>
      <button class="btn add-btn" data-id="${c.id}">Add to Plan</button>
    </article>
  `).join("");

    // attach add-to-plan handlers (DOM interaction)
    $$(".add-btn", courseList).forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            addToPlan(id);
        });
    });
}

function filterCourses() {
    const level = levelSelect?.value ?? "all";
    const q = (searchBox?.value ?? "").toLowerCase();
    let list = courses;

    if (level !== "all") {
        list = list.filter(c => c.level === level);        // array method + conditional
    }
    if (q) {
        list = list.filter(c => c.title.toLowerCase().includes(q));
    }
    renderCourses(list);
}

if (courseList) {
    filterCourses();
    levelSelect?.addEventListener("change", filterCourses);
    searchBox?.addEventListener("input", filterCourses);
    clearBtn?.addEventListener("click", () => {
        if (levelSelect) levelSelect.value = "all";
        if (searchBox) searchBox.value = "";
        filterCourses();
    });
}

/* ====== Study Plan (localStorage + array/object) ====== */
const PLAN_KEY = "ms-hub.plan";
const getPlan = () => JSON.parse(localStorage.getItem(PLAN_KEY) || "[]");
const savePlan = (arr) => localStorage.setItem(PLAN_KEY, JSON.stringify(arr));

function addToPlan(id) {
    const plan = getPlan();
    if (!plan.includes(id)) {
        plan.push(id);
        savePlan(plan);
        alert("Added to plan!");
    } else {
        alert("Already in your plan.");
    }
}

/* ====== Contact “thank you” demo (GET + hash) ====== */
if (location.hash === "#thanks") {
    const box = $("#thanks");
    if (box) {
        const params = new URLSearchParams(location.search);
        const name = params.get("name") || "friend";
        box.hidden = false;
        box.textContent = `Thanks, ${name}! Your message was received.`;
    }
}
