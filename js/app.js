// ============================================================
//  SK'LUXURY — Logique principale de l'application
// ============================================================

const App = {

  init() {
    this.renderNav();
    this.renderCartSidebar();
    this.renderFooter();
    this.updateCartBadge();
    this.initScrollBehavior();
    this.hideLoader();
  },

  // Détecte si on est dans un sous-dossier (pages/ ou admin/)
  _root() {
    const path = window.location.pathname;
    if (path.includes('/pages/') || path.includes('/admin/')) return '../';
    return '';
  },

  renderNav() {
    const nav = document.getElementById("main-nav");
    if (!nav) return;
    const page = window.location.pathname.split("/").pop() || "index.html";
    const r = this._root();
    nav.innerHTML = `
      <a href="${r}index.html" class="nav-logo">SK'<span>Luxury</span></a>
      <ul class="nav-links">
        <li><a href="${r}index.html" class="${page==='index.html'?'active':''}">Accueil</a></li>
        <li><a href="${r}pages/boutique.html" class="${page==='boutique.html'?'active':''}">Boutique</a></li>
        <li><a href="${r}pages/tissus.html" class="${page==='tissus.html'?'active':''}">Tissus</a></li>
        <li><a href="${r}pages/cosmetiques.html" class="${page==='cosmetiques.html'?'active':''}">Cosmétiques</a></li>
        <li><a href="${r}pages/a-propos.html" class="${page==='a-propos.html'?'active':''}">À propos</a></li>
      </ul>
      <div class="nav-actions">
        <button onclick="App.openSearch()">Recherche</button>
        <button onclick="App.openCart()" style="position:relative">
          Panier
          <span class="cart-badge" id="cart-badge" style="display:none">0</span>
        </button>
        <a href="${r}admin/index.html" style="color:var(--gold)">Admin ↗</a>
      </div>`;
  },

  renderFooter() {
    const footer = document.getElementById("main-footer");
    if (!footer) return;
    const cfg = SKLUXURY_DB.config;
    const r = this._root();
    footer.innerHTML = `
      <div class="footer-main">
        <div class="footer-grid">
          <div>
            <span class="footer-logo">SK'<span>Luxury</span></span>
            <p class="footer-desc">${cfg.tagline}.<br>Une maison parisienne dédiée à l'excellence textile et cosmétique.</p>
          </div>
          <div class="footer-col">
            <h4>Boutique</h4>
            <ul>
              <li><a href="${r}pages/boutique.html">Tous les produits</a></li>
              <li><a href="${r}pages/tissus.html">Tissus</a></li>
              <li><a href="${r}pages/cosmetiques.html">Cosmétiques</a></li>
              <li><a href="${r}pages/boutique.html?cat=coffrets">Coffrets</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Informations</h4>
            <ul>
              <li><a href="${r}pages/a-propos.html">À propos</a></li>
              <li><a href="#">Livraison</a></li>
              <li><a href="#">Retours</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:${cfg.email}">${cfg.email}</a></li>
              <li><a href="tel:${cfg.phone}">${cfg.phone}</a></li>
              <li><a href="#">${cfg.instagram}</a></li>
              <li>${cfg.address}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">© ${new Date().getFullYear()} SK'Luxury — Tous droits réservés</p>
          <div class="footer-legal-links">
            <a href="#">Mentions légales</a>
            <a href="#">Confidentialité</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </div>`;
  },

  initScrollBehavior() {
    const nav = document.querySelector(".nav-main");
    if (!nav) return;
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    });
  },

  hideLoader() {
    const loader = document.getElementById("page-loader");
    if (!loader) return;
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 500);
      }, 600);
    });
  },

  // ---- Panier ----
  getCart() { return SKLUXURY_DB.getCart(); },
  saveCart(cart) { SKLUXURY_DB.saveCart(cart); this.updateCartBadge(); },

  updateCartBadge() {
    const cart = this.getCart();
    const total = cart.reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById("cart-badge");
    if (!badge) return;
    if (total > 0) { badge.style.display = "flex"; badge.textContent = total; }
    else badge.style.display = "none";
  },

  addToCart(productId, qty = 1) {
    const product = SKLUXURY_DB.getProductById(productId);
    if (!product) return;
    let cart = this.getCart();
    const idx = cart.findIndex(i => i.id === productId);
    if (idx !== -1) cart[idx].qty += qty;
    else cart.push({ id: productId, qty, name: product.name, price: product.price, category: product.category, unit: product.unit });
    this.saveCart(cart);
    this.renderCartItems();
    this.toast(`${product.name} ajouté au panier`, "success");
    this.openCart();
  },

  removeFromCart(productId) {
    let cart = this.getCart().filter(i => i.id !== productId);
    this.saveCart(cart);
    this.renderCartItems();
  },

  updateQty(productId, delta) {
    let cart = this.getCart();
    const idx = cart.findIndex(i => i.id === productId);
    if (idx !== -1) {
      cart[idx].qty = Math.max(1, cart[idx].qty + delta);
      this.saveCart(cart);
      this.renderCartItems();
    }
  },

  openCart() {
    document.getElementById("cart-sidebar").classList.add("open");
    document.getElementById("cart-overlay").classList.add("visible");
    document.body.style.overflow = "hidden";
    this.renderCartItems();
  },

  closeCart() {
    document.getElementById("cart-sidebar").classList.remove("open");
    document.getElementById("cart-overlay").classList.remove("visible");
    document.body.style.overflow = "";
  },

  renderCartSidebar() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");
    if (!sidebar) return;
    overlay.addEventListener("click", () => this.closeCart());
    sidebar.innerHTML = `
      <div class="cart-header">
        <h3>Votre Panier</h3>
        <button class="cart-close" onclick="App.closeCart()">✕</button>
      </div>
      <div class="cart-items" id="cart-items-list"></div>
      <div class="cart-footer">
        <div class="cart-subtotal">
          <span>Sous-total</span>
          <span class="price" id="cart-total">0,00 €</span>
        </div>
        <p class="cart-shipping-note" id="cart-shipping-note"></p>
        <button class="btn btn-gold" onclick="App.checkout()" style="width:100%;margin-top:1rem">
          Commander →
        </button>
      </div>`;
    this.renderCartItems();
  },

  renderCartItems() {
    const container = document.getElementById("cart-items-list");
    if (!container) return;
    const cart = this.getCart();
    if (cart.length === 0) {
      container.innerHTML = `<p style="text-align:center;opacity:0.4;margin-top:3rem;font-size:0.8rem;letter-spacing:0.1em">Votre panier est vide</p>`;
      document.getElementById("cart-total").textContent = "0,00 €";
      document.getElementById("cart-shipping-note").textContent = "";
      return;
    }
    let total = 0;
    container.innerHTML = cart.map(item => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      const icon = item.category === 'tissus' ? '🧵' : '✨';
      return `
        <div class="cart-item">
          <div class="cart-item-img">
            <div class="img-placeholder"><span class="icon">${icon}</span></div>
          </div>
          <div class="cart-item-info">
            <p class="cart-item-cat">${item.category}</p>
            <p class="cart-item-name">${item.name}</p>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="App.updateQty('${item.id}',-1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="App.updateQty('${item.id}',1)">+</button>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem">
            <span class="cart-item-price">${SKLUXURY_DB.formatPrice(subtotal)}</span>
            <button class="cart-remove" onclick="App.removeFromCart('${item.id}')">✕</button>
          </div>
        </div>`;
    }).join("");
    document.getElementById("cart-total").textContent = SKLUXURY_DB.formatPrice(total);
    const remaining = SKLUXURY_DB.config.freeShippingThreshold - total;
    const noteEl = document.getElementById("cart-shipping-note");
    if (remaining > 0) noteEl.textContent = `Plus que ${SKLUXURY_DB.formatPrice(remaining)} pour la livraison offerte`;
    else noteEl.textContent = "✓ Livraison offerte";
  },

  checkout() {
    const cart = this.getCart();
    if (cart.length === 0) { this.toast("Votre panier est vide", "error"); return; }
    const order = {
      id: "CMD" + Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      status: "En attente"
    };
    SKLUXURY_DB.saveOrder(order);
    SKLUXURY_DB.saveCart([]);
    this.updateCartBadge();
    this.renderCartItems();
    this.closeCart();
    this.toast(`Commande ${order.id} confirmée ! Merci.`, "success");
  },

  // ---- Toast ----
  toast(msg, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const icons = { success: "✓", error: "✕", info: "ℹ" };
    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${icons[type]||"●"}</span><span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0"; t.style.transform = "translateX(100%)";
      t.style.transition = "all 0.3s";
      setTimeout(() => t.remove(), 300);
    }, 3500);
  },

  // ---- Recherche ----
  openSearch() {
    const q = prompt("Rechercher un produit :");
    if (!q) return;
    const r = this._root();
    window.location.href = `${r}pages/boutique.html?q=${encodeURIComponent(q)}`;
  },

  // ---- Rendu de grille de produits ----
  renderProductGrid(products, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (products.length === 0) {
      el.innerHTML = `<p style="grid-column:1/-1;text-align:center;opacity:0.4;padding:3rem 0;letter-spacing:0.1em;font-size:0.8rem">Aucun produit trouvé</p>`;
      return;
    }
    el.innerHTML = products.map(p => `
      <div class="product-card" onclick="App.goToProduct('${p.id}')">
        <div class="product-card-img">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
          <div class="img-placeholder">
            <span class="icon">${p.category==='tissus'?'🧵':'✨'}</span>
            <span class="label">${p.category}</span>
          </div>
          <div class="product-card-overlay">
            <button class="btn btn-gold btn-sm" onclick="event.stopPropagation();App.addToCart('${p.id}')">
              Ajouter au panier
            </button>
          </div>
        </div>
        <p class="product-card-cat">${p.category}</p>
        <h3 class="product-card-name">${p.name}</h3>
        <p class="product-card-price">${SKLUXURY_DB.formatPrice(p.price)}${p.unit!=='pièce'&&p.unit!=='coffret'?'/'+p.unit:''}</p>
      </div>`).join("");
  },

  goToProduct(id) {
    const r = this._root();
    window.location.href = `${r}pages/produit.html?id=${id}`;
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
