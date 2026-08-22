/* ============================================
   Delicias de Denise — Script
   Edit BUSINESS_NAME and WHATSAPP_NUMBER below
   to update them everywhere on the site.
   ============================================ */

// ---- EASY-TO-EDIT SETTINGS ----
const BUSINESS_NAME = "Delicias de Denise";
// WhatsApp number in international format, digits only (no +, spaces or dashes)
// Example for Puerto Rico: "17871234567"
const WHATSAPP_NUMBER = "17871234567";
// Paste the URL you get after deploying the Apps Script as a Web App
// (Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxjd3pFQTXz1xdp89k4Q8YucODY965YWvn94ghH-GW6IiLsWiS94UCQ_hDV9DSulM/exec";
// How long to keep items cached in this browser tab before re-fetching, in ms
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// ============================================
// Translations
// ============================================
const TRANSLATIONS = {
  es: {
    nav_home: "Inicio",
    nav_candies: "Dulces",
    nav_comida: "Comida",
    nav_pasteles: "Pasteles",
    hero_eyebrow: "Hecho a mano, con amor",
    hero_title: "Sabores caseros que se sienten como en casa",
    hero_subtitle: "Dulces, comida y pasteles preparados a mano, con ingredientes frescos y mucho cariño.",
    section_heading: "Nuestras categorías",
    section_sub: "Escoge una categoría para ver el menú",
    card_candies_title: "Dulces",
    card_candies_desc: "Dulces tradicionales hechos a mano, perfectos para endulzar el día.",
    card_comida_title: "Comida",
    card_comida_desc: "Platos caseros preparados con las recetas de siempre.",
    card_pasteles_title: "Pasteles",
    card_pasteles_desc: "Pasteles envueltos a mano, la tradición navideña todo el año.",
    card_cta: "Ver menú",
    back_home: "Volver al inicio",
    page_candies_title: "Dulces",
    page_candies_sub: "Dulces caseros hechos con recetas de familia.",
    page_comida_title: "Comida",
    page_comida_sub: "Platos preparados frescos, al estilo de casa.",
    page_pasteles_title: "Pasteles",
    page_pasteles_sub: "Pasteles envueltos a mano, listos para calentar y disfrutar.",
    out_of_stock: "Agotado",  
    order_btn: "Ordenar",
    footer_tagline: "Comida casera hecha con amor.",
    footer_contact: "Ordenar por WhatsApp",
    whatsapp_msg: (item) => `¡Hola! Me gustaría ordenar: ${item}. ¿Está disponible?`,
  },
  en: {
    nav_home: "Home",
    nav_candies: "Candies",
    nav_comida: "Food",
    nav_pasteles: "Pasteles",
    hero_eyebrow: "Handmade, with love",
    hero_title: "Homemade flavors that feel like home",
    hero_subtitle: "Candies, food, and pasteles made by hand, with fresh ingredients and a lot of care.",
    section_heading: "Our categories",
    section_sub: "Pick a category to see the menu",
    card_candies_title: "Candies",
    card_candies_desc: "Traditional handmade candies, perfect for a sweet moment.",
    card_comida_title: "Food",
    card_comida_desc: "Homestyle dishes made with time-honored recipes.",
    card_pasteles_title: "Pasteles",
    card_pasteles_desc: "Hand-wrapped pasteles, holiday tradition all year round.",
    card_cta: "View menu",
    back_home: "Back to home",
    page_candies_title: "Candies",
    page_candies_sub: "Homemade candies made with family recipes.",
    page_comida_title: "Food",
    page_comida_sub: "Fresh, homestyle dishes made to order.",
    page_pasteles_title: "Pasteles",
    page_pasteles_sub: "Hand-wrapped pasteles, ready to heat and enjoy.",
    order_btn: "Order",
    out_of_stock: "Out of stock",
    footer_tagline: "Homemade food made with love.",
    footer_contact: "Order via WhatsApp",
    whatsapp_msg: (item) => `Hi! I'd like to order: ${item}. Is it available?`,
  },
};

// ============================================
// Menu items — fetched from the Google Sheet via Apps Script.
// Edit item names, descriptions, prices, and images in the sheet,
// not here. See google-apps-script/Code.gs for the API.
// ============================================
let itemsCache = null; // in-memory cache for this page load

async function fetchItems() {
  if (itemsCache) return itemsCache;

  const sessionCached = sessionStorage.getItem("dd_items_cache");
  if (sessionCached) {
    try {
      const parsed = JSON.parse(sessionCached);
      if (Date.now() - parsed.ts < CACHE_TTL_MS) {
        itemsCache = parsed.data;
        return itemsCache;
      }
    } catch (e) {
      // ignore bad cache, fall through to fetch
    }
  }

  const res = await fetch(APPS_SCRIPT_URL);
  if (!res.ok) throw new Error("Failed to load menu items");
  const data = await res.json();

  itemsCache = data;
  sessionStorage.setItem("dd_items_cache", JSON.stringify({ ts: Date.now(), data }));
  return data;
}

// ============================================
// Language handling
// ============================================
function getLang() {
  return localStorage.getItem("dd_lang") || "es";
}

function setLang(lang) {
  localStorage.setItem("dd_lang", lang);
  applyLang(lang);
}

function applyLang(lang) {
  const t = TRANSLATIONS[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.documentElement.setAttribute("lang", lang);

  // Re-render item grid if present on this page
  const grid = document.querySelector("[data-item-grid]");
  if (grid) renderItems(grid.dataset.itemGrid, lang);
}

// ============================================
// WhatsApp helpers
// ============================================
function buildWhatsAppLink(itemName, lang) {
  const message = TRANSLATIONS[lang].whatsapp_msg(itemName);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ============================================
// Render item cards for a category page
// ============================================
async function renderItems(category, lang) {
  const grid = document.querySelector("[data-item-grid]");
  if (!grid) return;
  const t = TRANSLATIONS[lang];

  grid.innerHTML = `<p class="grid-msg">${lang === "es" ? "Cargando el menú..." : "Loading the menu..."}</p>`;

  let allItems;
  try {
    allItems = await fetchItems();
  } catch (err) {
    grid.innerHTML = `<p class="grid-msg grid-msg-error">${
      lang === "es"
        ? "No pudimos cargar el menú. Intenta de nuevo más tarde."
        : "We couldn't load the menu. Please try again later."
    }</p>`;
    return;
  }

  const items = allItems
    .filter((item) => item.category === category)
    .sort((a, b) => a.order - b.order);

  if (!items.length) {
    grid.innerHTML = `<p class="grid-msg">${
      lang === "es" ? "Pronto agregaremos productos aquí." : "Items coming soon."
    }</p>`;
    return;
  }

  grid.innerHTML = items
    .map((item) => {
      const name = item.name[lang];
      const desc = item.desc[lang];
      const link = buildWhatsAppLink(name, lang);
      const photo = item.image
        ? `<img src="${item.image}" alt="${name}" loading="lazy">`
        : `<span class="item-photo-fallback">🍽️</span>`;
            const outOfStock = item.outOfStock;
         
       const orderBtn = outOfStock
        ? `<span class="order-btn order-btn-disabled">${t.out_of_stock}</span>`
        : `<a class="order-btn" href="${link}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.87.5 3.62 1.38 5.12L2 22l4.99-1.31A9.96 9.96 0 0 0 12.01 22C17.53 22 22 17.52 22 12S17.53 2 12.01 2Zm5.71 14.2c-.24.68-1.4 1.3-1.93 1.35-.5.06-1.02.29-3.4-.7-2.87-1.2-4.7-4.1-4.85-4.3-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.08.99-2.37.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.9.87 2.03.07.14.11.3.02.48-.08.18-.13.3-.26.46-.13.16-.27.35-.39.47-.13.13-.27.27-.11.53.16.27.7 1.16 1.51 1.88 1.04.93 1.92 1.22 2.19 1.36.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.44.2.5.31.07.12.07.66-.17 1.34Z"/></svg>
            <span>${t.order_btn}</span>
          </a>`;

      return `
        <article class="item-card${outOfStock ? " item-card-out" : ""}">
          <div class="item-photo">
            ${photo}
            ${outOfStock ? `<span class="stock-badge">${t.out_of_stock}</span>` : ""}
          </div>
          <div class="item-body">
            <h3>${name}</h3>
            <p>${desc}</p>
            ${item.info?.[lang] ? `<p class="item-info">${item.info[lang]}</p>` : ""}
            <div class="item-footer">
              <span class="item-price">${item.price}</span>
              ${orderBtn}
            </div>
          </div>
        </article>`;
    })
    .join("");
}

// ============================================
// Mobile nav toggle
// ============================================
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");
  if (!toggle || !navbar) return;
  toggle.addEventListener("click", () => navbar.classList.toggle("open"));
}

// ============================================
// Init
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const lang = getLang();
  applyLang(lang);
  initMobileNav();

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  // Fill business name wherever marked
  document.querySelectorAll("[data-business-name]").forEach((el) => {
    el.textContent = BUSINESS_NAME;
  });
});
