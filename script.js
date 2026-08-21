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
    footer_tagline: "Homemade food made with love.",
    footer_contact: "Order via WhatsApp",
    whatsapp_msg: (item) => `Hi! I'd like to order: ${item}. Is it available?`,
  },
};

// ============================================
// Menu items — edit names, descriptions, prices here
// ============================================
const ITEMS = {
  candies: [
    { icon: "🍬", es: { name: "Dulce de coco", desc: "Dulce tradicional de coco fresco rallado." }, en: { name: "Coconut candy", desc: "Traditional candy made with fresh grated coconut." }, price: "$5" },
    { icon: "🥥", es: { name: "Besitos de coco", desc: "Pequeños bocados dulces de coco tostado." }, en: { name: "Coconut kisses", desc: "Small sweet bites of toasted coconut." }, price: "$6" },
    { icon: "🍫", es: { name: "Dulce de leche", desc: "Suave y cremoso, hecho lentamente en casa." }, en: { name: "Dulce de leche", desc: "Soft and creamy, slow-cooked at home." }, price: "$5" },
    { icon: "🍮", es: { name: "Tembleque", desc: "Postre de coco suave, espolvoreado con canela." }, en: { name: "Tembleque", desc: "Soft coconut pudding, dusted with cinnamon." }, price: "$6" },
  ],
  comida: [
    { icon: "🍗", es: { name: "Arroz con pollo", desc: "Arroz sazonado con pollo guisado a la antigua." }, en: { name: "Rice with chicken", desc: "Seasoned rice with old-style stewed chicken." }, price: "$12" },
    { icon: "🫘", es: { name: "Habichuelas guisadas", desc: "Habichuelas rojas guisadas con sofrito casero." }, en: { name: "Stewed beans", desc: "Red beans stewed with homemade sofrito." }, price: "$8" },
    { icon: "🍖", es: { name: "Pernil", desc: "Pernil horneado lento, jugoso y bien sazonado." }, en: { name: "Roast pork", desc: "Slow-roasted pork, juicy and well seasoned." }, price: "$14" },
    { icon: "🍌", es: { name: "Tostones", desc: "Plátanos verdes fritos y aplastados, crujientes." }, en: { name: "Tostones", desc: "Crispy fried and flattened green plantains." }, price: "$6" },
  ],
  pasteles: [
    { icon: "🎁", es: { name: "Pasteles de cerdo", desc: "Pasteles tradicionales rellenos de cerdo guisado." }, en: { name: "Pork pasteles", desc: "Traditional pasteles filled with stewed pork." }, price: "$3 c/u" },
    { icon: "🌿", es: { name: "Pasteles de pollo", desc: "Masa de guineo y yautía rellena de pollo." }, en: { name: "Chicken pasteles", desc: "Plantain and yautía dough filled with chicken." }, price: "$3 c/u" },
    { icon: "🧀", es: { name: "Pasteles de queso", desc: "Versión dulce y suave con queso, ideal de postre." }, en: { name: "Cheese pasteles", desc: "Soft, sweet version with cheese, great as dessert." }, price: "$3 c/u" },
    { icon: "📦", es: { name: "Docena de pasteles", desc: "Una docena mixta, perfecta para compartir." }, en: { name: "Dozen pasteles", desc: "A mixed dozen, perfect for sharing." }, price: "$32" },
  ],
};

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
function renderItems(category, lang) {
  const grid = document.querySelector("[data-item-grid]");
  if (!grid || !ITEMS[category]) return;
  const t = TRANSLATIONS[lang];

  grid.innerHTML = ITEMS[category]
    .map((item) => {
      const name = item[lang].name;
      const desc = item[lang].desc;
      const link = buildWhatsAppLink(name, lang);
      return `
        <article class="item-card">
          <div class="item-photo">${item.icon}</div>
          <div class="item-body">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="item-footer">
              <span class="item-price">${item.price}</span>
              <a class="order-btn" href="${link}" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.87.5 3.62 1.38 5.12L2 22l4.99-1.31A9.96 9.96 0 0 0 12.01 22C17.53 22 22 17.52 22 12S17.53 2 12.01 2Zm5.71 14.2c-.24.68-1.4 1.3-1.93 1.35-.5.06-1.02.29-3.4-.7-2.87-1.2-4.7-4.1-4.85-4.3-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.08.99-2.37.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.9.87 2.03.07.14.11.3.02.48-.08.18-.13.3-.26.46-.13.16-.27.35-.39.47-.13.13-.27.27-.11.53.16.27.7 1.16 1.51 1.88 1.04.93 1.92 1.22 2.19 1.36.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.44.2.5.31.07.12.07.66-.17 1.34Z"/></svg>
              <span>${t.order_btn}</span>
            </a>
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
