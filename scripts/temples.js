// Footer year + last modified
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Mobile hamburger
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.textContent = isOpen ? '✕' : '☰';
        menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
}

// (Optional) simple filter hook for later weeks
document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // placeholder for future filtering logic
        console.log('Filter clicked:', link.dataset.filter);
    });
});
