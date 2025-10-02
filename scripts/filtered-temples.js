// filtered-temples.js (ASCII-only version)

console.log('filtered-temples.js loaded');

const temples = [
    {
        templeName: 'Aba Nigeria',
        location: 'Aba, Nigeria',
        dedicated: '2005, August, 7',
        area: 11500,
        imageUrl: './images/aba-temple.jpg'
    },
    {
        templeName: 'Manti Utah',
        location: 'Manti, Utah, United States',
        dedicated: '1888, May, 21',
        area: 74792,
        imageUrl: './images/manti-temple.jpg'
    },
    {
        templeName: 'Payson Utah',
        location: 'Payson, Utah, United States',
        dedicated: '2015, June, 7',
        area: 96630,
        imageUrl: './images/payson-utah.jpg'
    },
    {
        templeName: 'Yigo Guam',
        location: 'Yigo, Guam',
        dedicated: '2020, May, 2',
        area: 6861,
        imageUrl: './images/yigo_guam_temple.jpg'
    },
    {
        templeName: 'Washington D.C.',
        location: 'Kensington, Maryland, United States',
        dedicated: '1974, November, 19',
        area: 156558,
        imageUrl: './images/washinton_dc.jpeg'
    },
    {
        templeName: 'Lima Peru',
        location: 'Lima, Peru',
        dedicated: '1986, January, 10',
        area: 9600,
        imageUrl: './images/lima-peru.jpg'
    },
    {
        templeName: 'Mexico City Mexico',
        location: 'Mexico City, Mexico',
        dedicated: '1983, December, 2',
        area: 116642,
        imageUrl: './images/mexico-city-temple.jpg'
    },
    {
        templeName: 'Rome Italy',
        location: 'Rome, Italy',
        dedicated: '2019, March, 10',
        area: 41010,
        imageUrl: "./images/rome-italy.jpg"
    },
    {
        templeName: 'St. George Utah',
        location: 'St. George, Utah, United States',
        dedicated: '1877, April, 6',
        area: 142000,
        imageUrl: "./images/provo-temple.jpg"
    },
    {
        templeName: 'Accra Ghana',
        location: 'Accra, Ghana',
        dedicated: '2004, January, 11',
        area: 17500,
        imageUrl: "./images/ghana-Temple.jpg"
    }        
];

const gallery = document.getElementById('gallery');
const numberFmt = new Intl.NumberFormat();

function yearFrom(d) {
    const m = /\b(18|19|20)\d{2}\b/.exec(String(d));
    return m ? parseInt(m[0], 10) : NaN;
}

function buildCard(t) {
    const article = document.createElement('article');
    article.className = 'card';

    const img = document.createElement('img');
    img.src = t.imageUrl;
    img.alt = t.templeName + ' - exterior view';
    img.loading = 'lazy';
    img.decoding = 'async';
    let w = 400, h = 250;
    const m = t.imageUrl.match(/\/(\d+)x(\d+)\//i) || t.imageUrl.match(/(\d+)x(\d+)/i);
    if (m) { w = Number(m[1]); h = Number(m[2]); }
    img.width = w;
    img.height = h;

    const body = document.createElement('div');
    body.className = 'body';

    const h3 = document.createElement('h3');
    h3.textContent = t.templeName;

    const loc = document.createElement('p');
    loc.textContent = t.location;

    const meta = document.createElement('div');
    meta.className = 'meta';

    const ded = document.createElement('p');
    ded.textContent = 'Dedicated: ' + t.dedicated;

    const area = document.createElement('p');
    area.textContent = 'Area: ' + numberFmt.format(Number(t.area)) + ' sq ft';

    meta.append(ded, area);
    body.append(h3, loc, meta);
    article.append(img, body);
    return article;
}

function render(list) {
    if (!gallery) return;
    gallery.innerHTML = '';
    const frag = document.createDocumentFragment();
    list.forEach(function (t) { frag.appendChild(buildCard(t)); });
    gallery.appendChild(frag);
}

function applyFilter(type) {
    var list = temples.slice();
    if (type === 'old') {
        list = list.filter(function (t) { return yearFrom(t.dedicated) < 1900; });
    } else if (type === 'new') {
        list = list.filter(function (t) { return yearFrom(t.dedicated) > 2000; });
    } else if (type === 'large') {
        list = list.filter(function (t) { return Number(t.area) > 90000; });
    } else if (type === 'small') {
        list = list.filter(function (t) { return Number(t.area) < 10000; });
    }
    render(list);
}

// Filter links (anchors)
var filterControls = document.querySelectorAll('a[data-filter]');
filterControls.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // stay on page

        filterControls.forEach(function (x) {
            x.classList.remove('active');
            x.removeAttribute('aria-current');
        });
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');

        applyFilter(link.dataset.filter);
    });
});


// Footer
(function () {
    var y = document.getElementById('year');
    var m = document.getElementById('last-modified');
    if (y) y.textContent = new Date().getFullYear();
    if (m) m.textContent = document.lastModified;
})();

// initial render
applyFilter('all');
