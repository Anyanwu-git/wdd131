// Nigeria page JS (metric units)
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  const modEl = document.getElementById('last-modified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = document.lastModified;

  // ----- Weather (static values) -----
  const UNITS = 'metric';

  // Demo values chosen so windchill will compute (Jos can be cool)
  let temperature = 9;   // °C
  let windSpeed = 12;    // km/h

  // Reflect values into DOM
  const tempEl = document.getElementById('wx-temp');
  const windEl = document.getElementById('wx-wind');
  const chillEl = document.getElementById('wx-chill');
  const tempUnitEls = document.querySelectorAll('.temp-unit');
  const windUnitEls = document.querySelectorAll('.wind-unit');

  if (tempEl) tempEl.textContent = temperature;
  if (windEl) windEl.textContent = windSpeed;

  tempUnitEls.forEach(el => el.textContent = '°C');
  windUnitEls.forEach(el => el.textContent = 'km/h');

  // One-line wind chill function (metric)
  const calculateWindChill = (t, v) => 13.12 + 0.6215*t - 11.37*Math.pow(v, 0.16) + 0.3965*t*Math.pow(v, 0.16);

  // Viability: <= 10 °C and > 4.8 km/h
  const canCalc = (temperature <= 10 && windSpeed > 4.8);

  if (chillEl) {
    if (canCalc) {
      const wc = calculateWindChill(temperature, windSpeed);
      chillEl.textContent = Math.round(wc * 10) / 10;
    } else {
      chillEl.textContent = 'N/A';
    }
  }
});
