/* ============================================
   Delicias de Denise — Script
   ============================================ */

// ---- EASY-TO-EDIT SETTINGS ----
const BUSINESS_NAME = "Delicias de Denise";
// WhatsApp number in international format, digits only (no +, spaces or dashes)
// Example for Puerto Rico: "17871234567" — also used for the SMS/text option
const WHATSAPP_NUMBER = "18132608333";
// Your Facebook Page username, the part after facebook.com/ or m.me/
// Example: if your page is facebook.com/DeliciasDeDenise, use "DeliciasDeDenise"
const FACEBOOK_USERNAME = "PASTE_YOUR_FACEBOOK_USERNAME_HERE";
// Paste the URL you get after deploying the Apps Script as a Web App
// (Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxjd3pFQTXz1xdp89k4Q8YucODY965YWvn94ghH-GW6IiLsWiS94UCQ_hDV9DSulM/exec";
// How long to keep items cached in this browser tab before re-fetching, in ms
const CACHE_TTL_MS = 0 //5 * 60 * 1000; // 5 minutes
// Deposit rules: required if the order total OR item count crosses either value
const DEPOSIT_THRESHOLD_AMOUNT = 60;   // order total in dollars
const DEPOSIT_THRESHOLD_ITEMS = 12;    // total item count
const DEPOSIT_PERCENT = 0.25;          // 25% of the order total
// localStorage key the cart is saved under
const CART_KEY = "dd_cart";
// localStorage key the customer's name/phone is remembered under
const CUSTOMER_KEY = "dd_customer";

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
    hero_title: "Sabores Caseros",
    hero_subtitle: "Dulces, comida y pasteles preparados a mano, con ingredientes frescos y mucho cariño.",
    section_heading: "Categorías",
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
    page_comida_sub: "Platos preparados frescos, al estilo boricua.",
    page_pasteles_title: "Pasteles",
    page_pasteles_sub: "Pasteles envueltos a mano, grandesito y con carne de punta a punta.",
    footer_tagline: "Comida casera hecha con amor.",
    footer_contact: "Ordenar por WhatsApp",
    out_of_stock: "Agotado",
    cart_title: "Tu orden",
    cart_empty: "Tu carrito está vacío.",
    cart_total: "Total",
    cart_checkout: "Ordenar por WhatsApp",
    cart_clear: "Vaciar carrito",
    cart_remove: "Eliminar",
    whatsapp_cart_header: "¡Hola! Quiero ordenar:",
    whatsapp_cart_total_label: "Total:",
    cart_checkout_sms: "Ordenar por mensaje de texto",
    cart_checkout_messenger: "Ordenar por Messenger",
    deposit_notice: (amount) => `Este pedido requiere un depósito de ${amount} para confirmarse.`,
    deposit_instructions: "Solo Efectivo por ahora. ATH Móvil llega pronto.",
    deposit_label: "Depósito requerido:",
    form_name_placeholder: "Tu nombre",
    form_phone_placeholder: "Tu número de teléfono",
    form_error: "Por favor completa tu nombre y teléfono.",
    sending_label: "Enviando...",
    order_number_line: (num) => `Pedido #${num}`,
    pickup_banner_title: "Recogido en tienda solamente",
    pickup_banner_address: "Dirección: [pega tu dirección aquí]",
    pickup_notice_title: "📍 Solo Pickup",
    pickup_notice_address: "Dirección: [pega tu dirección aquí]",
  },
  en: {
    nav_home: "Home",
    nav_candies: "Candies",
    nav_comida: "Food",
    nav_pasteles: "Pasteles",
    hero_eyebrow: "Handmade, with love",
    hero_title: "Homemade flavors that feel like home",
    hero_subtitle: "Candies, food, and pasteles made by hand, with fresh ingredients and lots of love.",
    section_heading: "Categories",
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
    page_pasteles_sub: "Hand-wrapped pasteles, made large, stuffed with meat.",
    footer_tagline: "Homemade food made with love.",
    footer_contact: "Order via WhatsApp",
    out_of_stock: "Out of stock",
    cart_title: "Your order",
    cart_empty: "Your cart is empty.",
    cart_total: "Total",
    cart_checkout: "Order via WhatsApp",
    cart_clear: "Clear cart",
    cart_remove: "Remove",
    whatsapp_cart_header: "Hi! I'd like to order:",
    whatsapp_cart_total_label: "Total:",
    cart_checkout_sms: "Order via text message",
    cart_checkout_messenger: "Order via Messenger",
    deposit_notice: (amount) => `This order requires a ${amount} deposit to confirm.`,
    deposit_instructions: "Cash only, for now. ATH Móvil coming soon.",
    deposit_label: "Deposit required:",
    form_name_placeholder: "Your name",
    form_phone_placeholder: "Your phone number",
    form_error: "Please fill in your name and phone number.",
    sending_label: "Sending...",
    order_number_line: (num) => `Order #${num}`,
    pickup_banner_title: "Pickup only",
    pickup_banner_address: "Address: [paste your address here]",
    pickup_notice_title: "📍 Pickup Only",
    pickup_notice_address: "Address: [paste your address here]",
  },
};

const WHATSAPP_ICON_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.87.5 3.62 1.38 5.12L2 22l4.99-1.31A9.96 9.96 0 0 0 12.01 22C17.53 22 22 17.52 22 12S17.53 2 12.01 2Zm5.71 14.2c-.24.68-1.4 1.3-1.93 1.35-.5.06-1.02.29-3.4-.7-2.87-1.2-4.7-4.1-4.85-4.3-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.08.99-2.37.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.9.87 2.03.07.14.11.3.02.48-.08.18-.13.3-.26.46-.13.16-.27.35-.39.47-.13.13-.27.27-.11.53.16.27.7 1.16 1.51 1.88 1.04.93 1.92 1.22 2.19 1.36.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.44.2.5.31.07.12.07.66-.17 1.34Z"/></svg>`;

const SMS_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;

const MESSENGER_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>`;

// ============================================
// Menu items — fetched from the Google Sheet via Apps Script.
// Edit item names, descriptions, prices, and images in the sheet,
// not here. See google-apps-script/Code.gs for the API.
// ============================================
let itemsCache = null; // in-memory cache for this page load
let itemsById = {};    // lookup used by the cart, keyed by "category::nameEs"

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

function itemId(item) {
  return `${item.category}::${item.name.es}`;
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

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.documentElement.setAttribute("lang", lang);

  // Re-render item grid if present on this page
  const grid = document.querySelector("[data-item-grid]");
  if (grid) renderItems(grid.dataset.itemGrid, lang);

  // Re-render the cart panel if it's currently open
  const overlay = document.querySelector(".cart-overlay");
  if (overlay && overlay.classList.contains("open")) renderCartPanel(lang);

  updateCartBadge();
}

// ============================================
// Cart helpers
// ============================================
function parsePrice(display) {
  if (!display) return 0;
  const match = String(display).match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function formatMoney(n) {
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getQtyForId(id) {
  const found = getCart().find((c) => c.id === id);
  return found ? found.qty : 0;
}

function changeQty(item, delta) {
  const cart = getCart();
  const id = itemId(item);
  const existing = cart.find((c) => c.id === id);

  if (existing) {
    existing.qty += delta;
    if (existing.qty <= 0) cart.splice(cart.indexOf(existing), 1);
  } else if (delta > 0) {
    cart.push({
      id,
      category: item.category,
      name: item.name,
      price: parsePrice(item.price),
      qty: delta,
    });
  }

  saveCart(cart);
  return cart;
}

function cartCount(cart = getCart()) {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}

function cartTotal(cart = getCart()) {
  return cart.reduce((sum, c) => sum + c.qty * c.price, 0);
}

function depositRequired(cart) {
  return (
    cartTotal(cart) > DEPOSIT_THRESHOLD_AMOUNT ||
    cartCount(cart) >= DEPOSIT_THRESHOLD_ITEMS
  );
}

function depositAmount(cart) {
  return cartTotal(cart) * DEPOSIT_PERCENT;
}

// ============================================
// Customer info (name + phone), remembered locally
// so returning customers don't retype every time
// ============================================
function getCustomer() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_KEY)) || { name: "", phone: "" };
  } catch (e) {
    return { name: "", phone: "" };
  }
}

function saveCustomer(name, phone) {
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify({ name, phone }));
}

// orderNumber is optional: when present (normal path) it's included as the
// first line of the message. When the sheet write fails, the message still
// sends but without the order number.
function buildCartMessage(cart, lang, orderNumber) {
  const t = TRANSLATIONS[lang];
  const lines = cart.map((entry) => {
    const name = entry.name[lang];
    const subtotal = formatMoney(entry.price * entry.qty);
    return `${entry.qty}x ${name} - ${subtotal}`;
  });
  const total = formatMoney(cartTotal(cart));

  let message = `${t.whatsapp_cart_header}\n\n`;
  if (orderNumber) {
    message += `${t.order_number_line(orderNumber)}\n\n`;
  }
  message += `${lines.join("\n")}\n\n${t.whatsapp_cart_total_label} ${total}`;

  if (depositRequired(cart)) {
    const deposit = formatMoney(depositAmount(cart));
    message += `\n\n${t.deposit_label} ${deposit}\n${t.deposit_instructions}`;
  }

  return message;
}

function buildCartWhatsAppLink(cart, lang, orderNumber) {
  if (!cart.length) return `https://wa.me/${WHATSAPP_NUMBER}`;
  const message = buildCartMessage(cart, lang, orderNumber);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildCartSmsLink(cart, lang, orderNumber) {
  if (!cart.length) return `sms:+${WHATSAPP_NUMBER}`;
  const message = buildCartMessage(cart, lang, orderNumber);
  // Works on both iOS and Android; some older iOS versions expect
  // "&body=" instead of "?body=", most modern devices accept either.
  return `sms:+${WHATSAPP_NUMBER}?body=${encodeURIComponent(message)}`;
}

function buildCartMessengerLink(cart, lang, orderNumber) {
  if (!cart.length) return `https://m.me/${FACEBOOK_USERNAME}`;
  const message = buildCartMessage(cart, lang, orderNumber);
  return `https://m.me/${FACEBOOK_USERNAME}?text=${encodeURIComponent(message)}`;
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

// Keeps the +/- steppers on the menu grid in sync with cart changes
// made from inside the cart panel itself.
function syncGridQuantities() {
  const grid = document.querySelector("[data-item-grid]");
  if (!grid) return;
  grid.querySelectorAll(".qty-stepper").forEach((stepper) => {
    const id = stepper.dataset.id;
    const valueEl = stepper.querySelector(".qty-value");
    if (valueEl) valueEl.textContent = getQtyForId(id);
  });
}

// ============================================
// Order submission — sends the cart to the Google Sheet first,
// gets back an order number, then the caller opens WhatsApp/SMS/
// Messenger with that number included in the message.
// ============================================
async function submitOrder(cart, lang, name, phone) {
  const payload = {
    name,
    phone,
    lang,
    items: cart.map((entry) => ({
      name: entry.name[lang],
      qty: entry.qty,
      price: entry.price,
    })),
    total: cartTotal(cart),
    depositRequired: depositRequired(cart),
    depositAmount: depositRequired(cart) ? depositAmount(cart) : 0,
  };

  // Content-Type text/plain avoids a CORS preflight against Apps Script
  // (which doesn't handle OPTIONS requests). The Apps Script side parses
  // this as JSON from e.postData.contents regardless of the header.
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Unknown error");
  return data.orderNumber;
}

// Runs the full checkout flow for one send method: validate -> submit to
// sheet -> open WhatsApp/SMS/Messenger with the order number -> clear cart.
// If the sheet write fails, the message still sends, just without a number.
async function handleCheckout(method, lang) {
  const overlay = document.querySelector(".cart-overlay");
  if (!overlay) return;
  const cart = getCart();
  if (!cart.length) return;

  const t = TRANSLATIONS[lang];
  const nameInput = overlay.querySelector(".cart-name-input");
  const phoneInput = overlay.querySelector(".cart-phone-input");
  const errorEl = overlay.querySelector(".cart-form-error");
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    errorEl.textContent = t.form_error;
    errorEl.style.display = "block";
    (name ? phoneInput : nameInput).focus();
    return;
  }
  errorEl.style.display = "none";

  const btns = overlay.querySelectorAll(".cart-checkout-btn");
  const activeBtn = overlay.querySelector(`.cart-checkout-btn[data-method="${method}"]`);
  const activeLabel = activeBtn ? activeBtn.querySelector("span") : null;
  const originalLabel = activeLabel ? activeLabel.textContent : "";

  btns.forEach((b) => b.classList.add("disabled"));
  if (activeLabel) activeLabel.textContent = t.sending_label;

  let orderNumber = null;
  try {
    orderNumber = await submitOrder(cart, lang, name, phone);
  } catch (err) {
    // Sheet write failed — still send the message, just without a number.
    orderNumber = null;
  }

  saveCustomer(name, phone);

  let url;
  if (method === "sms") url = buildCartSmsLink(cart, lang, orderNumber);
  else if (method === "messenger") url = buildCartMessengerLink(cart, lang, orderNumber);
  else url = buildCartWhatsAppLink(cart, lang, orderNumber);

  if (method === "sms") {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener");
  }

  saveCart([]);
  renderCartPanel(lang);
  updateCartBadge();
  syncGridQuantities();

  btns.forEach((b) => b.classList.remove("disabled"));
  if (activeLabel) activeLabel.textContent = originalLabel;
}

// ============================================
// Cart UI (nav button + slide-out panel)
// ============================================
function initCartUI() {
  const navRight = document.querySelector(".nav-right");
  if (!navRight || document.querySelector(".cart-btn")) return;

  const cartBtn = document.createElement("button");
  cartBtn.type = "button";
  cartBtn.className = "cart-btn";
  cartBtn.setAttribute("aria-label", "Cart");
  cartBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
    <span class="cart-badge">0</span>
  `;
  navRight.insertBefore(cartBtn, navRight.firstChild);
  cartBtn.addEventListener("click", openCart);

  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  overlay.innerHTML = `
    <div class="cart-panel" role="dialog" aria-modal="true">
      <div class="cart-panel-header">
        <h2 class="cart-title" data-i18n="cart_title">Tu orden</h2>
        <button type="button" class="cart-close" aria-label="Close">&times;</button>
      </div>
      <div class="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total-row">
          <span data-i18n="cart_total">Total</span>
          <span class="cart-total-value">$0</span>
        </div>
        <div class="cart-deposit-notice"></div>
        <div class="cart-customer-form">
          <input type="text" class="cart-input cart-name-input" data-i18n-placeholder="form_name_placeholder" placeholder="Tu nombre" autocomplete="name">
          <input type="tel" class="cart-input cart-phone-input" data-i18n-placeholder="form_phone_placeholder" placeholder="Tu número de teléfono" autocomplete="tel">
          <p class="cart-form-error"></p>
        </div>
        <a class="cart-checkout-btn" href="#" data-method="whatsapp">
          ${WHATSAPP_ICON_SVG}
          <span data-i18n="cart_checkout">Ordenar por WhatsApp</span>
        </a>
        <a class="cart-checkout-btn cart-checkout-btn-secondary" href="#" data-method="sms">
          ${SMS_ICON_SVG}
          <span data-i18n="cart_checkout_sms">Enviar por mensaje de texto</span>
        </a>
        <a class="cart-checkout-btn cart-checkout-btn-secondary" href="#" data-method="messenger">
          ${MESSENGER_ICON_SVG}
          <span data-i18n="cart_checkout_messenger">Enviar por Messenger</span>
        </a>
        <button type="button" class="cart-clear-btn" data-i18n="cart_clear">Vaciar carrito</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeCart();
  });
  overlay.querySelector(".cart-close").addEventListener("click", closeCart);
  overlay.querySelector(".cart-clear-btn").addEventListener("click", () => {
    saveCart([]);
    renderCartPanel(getLang());
    updateCartBadge();
    syncGridQuantities();
  });

  overlay.querySelector(".cart-items").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cart-action]");
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.cartAction;
    const cart = getCart();
    const entry = cart.find((c) => c.id === id);
    if (!entry) return;

    if (action === "plus") entry.qty += 1;
    if (action === "minus") entry.qty -= 1;
    if (action === "remove" || entry.qty <= 0) cart.splice(cart.indexOf(entry), 1);

    saveCart(cart);
    renderCartPanel(getLang());
    updateCartBadge();
    syncGridQuantities();
  });

  overlay.querySelectorAll(".cart-checkout-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (btn.classList.contains("disabled")) return;
      handleCheckout(btn.dataset.method, getLang());
    });
  });

  // Hide the validation error as soon as the customer starts fixing it
  [".cart-name-input", ".cart-phone-input"].forEach((sel) => {
    overlay.querySelector(sel).addEventListener("input", () => {
      overlay.querySelector(".cart-form-error").style.display = "none";
    });
  });

  updateCartBadge();
}

function openCart() {
  const overlay = document.querySelector(".cart-overlay");
  if (!overlay) return;

  // Prefill remembered name/phone, without overwriting anything already typed
  const nameInput = overlay.querySelector(".cart-name-input");
  const phoneInput = overlay.querySelector(".cart-phone-input");
  const customer = getCustomer();
  if (nameInput && !nameInput.value) nameInput.value = customer.name;
  if (phoneInput && !phoneInput.value) phoneInput.value = customer.phone;

  renderCartPanel(getLang());
  overlay.classList.add("open");
  document.body.classList.add("cart-lock-scroll");
}

function closeCart() {
  const overlay = document.querySelector(".cart-overlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.classList.remove("cart-lock-scroll");
}

function renderCartPanel(lang) {
  const overlay = document.querySelector(".cart-overlay");
  if (!overlay) return;
  const t = TRANSLATIONS[lang];
  const cart = getCart();
  const itemsEl = overlay.querySelector(".cart-items");
  const totalEl = overlay.querySelector(".cart-total-value");
  const checkoutBtns = overlay.querySelectorAll(".cart-checkout-btn");

  if (!cart.length) {
    itemsEl.innerHTML = `<p class="cart-empty">${t.cart_empty}</p>`;
  } else {
    itemsEl.innerHTML = cart
      .map((entry) => {
        const name = entry.name[lang];
        const subtotal = formatMoney(entry.price * entry.qty);
        return `
          <div class="cart-row">
            <div class="cart-row-info">
              <span class="cart-row-name">${name}</span>
              <span class="cart-row-subtotal">${subtotal}</span>
            </div>
            <div class="cart-row-controls">
              <button type="button" class="qty-btn" data-cart-action="minus" data-id="${entry.id}" aria-label="-">−</button>
              <span class="qty-value">${entry.qty}</span>
              <button type="button" class="qty-btn" data-cart-action="plus" data-id="${entry.id}" aria-label="+">+</button>
              <button type="button" class="cart-remove-btn" data-cart-action="remove" data-id="${entry.id}" aria-label="${t.cart_remove}">🗑</button>
            </div>
          </div>`;
      })
      .join("");
  }

  const total = cartTotal(cart);
  totalEl.textContent = formatMoney(total);

  const depositEl = overlay.querySelector(".cart-deposit-notice");
  if (cart.length && depositRequired(cart)) {
    const deposit = formatMoney(depositAmount(cart));
    depositEl.innerHTML = `<strong>${t.deposit_notice(deposit)}</strong><br>${t.deposit_instructions}`;
    depositEl.style.display = "block";
  } else {
    depositEl.style.display = "none";
  }

  checkoutBtns.forEach((btn) => btn.classList.toggle("disabled", cart.length === 0));

  overlay.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  overlay.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });
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

  itemsById = {};
  items.forEach((item) => (itemsById[itemId(item)] = item));

  grid.innerHTML = items
    .map((item) => {
      const name = item.name[lang];
      const desc = item.desc[lang];
      const id = itemId(item);
      const qty = getQtyForId(id);
      const photo = item.image
        ? `<img src="${item.image}" alt="${name}" loading="lazy">`
        : `<span class="item-photo-fallback">🍽️</span>`;

      const controls = item.outOfStock
        ? `<span class="stock-pill">${t.out_of_stock}</span>`
        : `<div class="qty-stepper" data-id="${id}">
             <button type="button" class="qty-btn qty-minus" aria-label="-">−</button>
             <span class="qty-value">${qty}</span>
             <button type="button" class="qty-btn qty-plus" aria-label="+">+</button>
           </div>`;

      return `
        <article class="item-card${item.outOfStock ? " item-card-out" : ""}">
          <div class="item-photo">
            ${photo}
            ${item.outOfStock ? `<span class="stock-badge">${t.out_of_stock}</span>` : ""}
          </div>
          <div class="item-body">
            <h3>${name}</h3>
            <p>${desc}</p>
            ${item.info?.[lang] ? `<p class="item-info">${item.info[lang]}</p>` : ""}
            <div class="item-footer">
              <span class="item-price">${item.price}</span>
              ${controls}
            </div>
          </div>
        </article>`;
    })
    .join("");

  // Bind qty button clicks once per grid element (survives re-renders via innerHTML)
  if (!grid.dataset.bound) {
    grid.dataset.bound = "true";
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".qty-btn");
      if (!btn) return;
      const stepper = btn.closest(".qty-stepper");
      if (!stepper) return;
      const id = stepper.dataset.id;
      const item = itemsById[id];
      if (!item) return;

      const delta = btn.classList.contains("qty-plus") ? 1 : -1;
      changeQty(item, delta);
      stepper.querySelector(".qty-value").textContent = getQtyForId(id);
      updateCartBadge();
    });
  }
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
  initCartUI();

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
