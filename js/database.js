// ============================================================
//  SK'LUXURY — Base de données produits
//  Modifiez ce fichier pour gérer votre catalogue
// ============================================================

const SKLUXURY_DB = {

  // --- CONFIGURATION GÉNÉRALE ---
  config: {
    name: "SK'Luxury",
    tagline: "Tissus & Cosmétiques d'Exception",
    currency: "EUR",
    currencySymbol: "€",
    email: "contact@skluxury.fr",
    phone: "+33 1 23 45 67 89",
    address: "12 Rue du Faubourg Saint-Honoré, 75008 Paris",
    instagram: "@skluxury",
    freeShippingThreshold: 120,
    taxRate: 0.20
  },

  // --- CATÉGORIES ---
  categories: [
    { id: "tissus",       label: "Tissus",       icon: "🧵", description: "Étoffes sélectionnées aux quatre coins du monde" },
    { id: "cosmetiques",  label: "Cosmétiques",  icon: "✨", description: "Soins formulés avec les plus rares des ingrédients" },
    { id: "accessoires",  label: "Accessoires",  icon: "💎", description: "Accessoires pour sublimer vos créations" },
    { id: "coffrets",     label: "Coffrets",     icon: "🎁", description: "Coffrets cadeaux et collections exclusives" }
  ],

  // --- PRODUITS ---
  products: [
    {
      id: "TIS001",
      category: "tissus",
      name: "Velours Aubergine de Lyon",
      shortDesc: "Velours de soie tissé à la main",
      description: "Un velours d'une finesse exceptionnelle, tissé dans les ateliers lyonnais selon des techniques séculaires. Sa teinte aubergine profonde apporte élégance et caractère à toutes vos créations.",
      price: 78.00,
      unit: "m",
      stock: 45,
      images: [],
      badge: "Nouveau",
      featured: true,
      tags: ["velours", "soie", "lyon", "premium"],
      specs: { composition: "100% soie", largeur: "140 cm", poids: "280 g/m²", entretien: "Nettoyage à sec" },
      createdAt: "2025-01-15"
    },
    {
      id: "TIS002",
      category: "tissus",
      name: "Soie Ivoire Brodée",
      shortDesc: "Soie de Lyon brodée fil d'or",
      description: "Une soie précieuse brodée à la main de fils dorés. Idéale pour les créations haute couture, robes de cérémonie ou décoration intérieure luxueuse.",
      price: 145.00,
      unit: "m",
      stock: 18,
      images: [],
      badge: "Exclusif",
      featured: true,
      tags: ["soie", "broderie", "or", "haute couture"],
      specs: { composition: "100% soie naturelle", largeur: "120 cm", poids: "180 g/m²", entretien: "Nettoyage à sec uniquement" },
      createdAt: "2025-01-10"
    },
    {
      id: "TIS003",
      category: "tissus",
      name: "Linen Naturel Belge",
      shortDesc: "Lin certifié Masters of Linen",
      description: "Le meilleur lin belge, certifié Masters of Linen, dans sa teinte naturelle non traitée. Respirant, durable et d'un toucher incomparable.",
      price: 42.00,
      unit: "m",
      stock: 120,
      images: [],
      badge: null,
      featured: false,
      tags: ["lin", "naturel", "belgique", "certifié"],
      specs: { composition: "100% lin", largeur: "150 cm", poids: "210 g/m²", entretien: "Lavable à 40°C" },
      createdAt: "2025-01-05"
    },
    {
      id: "TIS004",
      category: "tissus",
      name: "Brocart Oriental Or & Noir",
      shortDesc: "Brocart tissé fils métalliques",
      description: "Somptueux brocart aux motifs géométriques orientaux, tissé avec des fils métalliques or sur fond noir. Un tissu d'apparat pour les créations les plus majestueuses.",
      price: 195.00,
      unit: "m",
      stock: 8,
      images: [],
      badge: "Stock limité",
      featured: true,
      tags: ["brocart", "or", "oriental", "luxe"],
      specs: { composition: "60% soie, 40% fils métalliques", largeur: "110 cm", poids: "380 g/m²", entretien: "Nettoyage à sec" },
      createdAt: "2024-12-20"
    },
    {
      id: "COS001",
      category: "cosmetiques",
      name: "Sérum Éclat Doré",
      shortDesc: "Sérum visage à l'huile d'argan & or",
      description: "Notre sérum signature enrichi en huile d'argan bio et pépites d'or 24 carats. Illumine, repulpe et unifie le teint en une seule application. Le secret d'un éclat naturel et lumineux.",
      price: 64.00,
      unit: "pièce",
      stock: 35,
      images: [],
      badge: "Best-seller",
      featured: true,
      tags: ["sérum", "or", "argan", "visage", "éclat"],
      specs: { volume: "30 ml", type: "Sérum visage", actifs: "Or 24K, Argan bio, Vitamine C", certif: "Cosmos Organic" },
      createdAt: "2025-01-20"
    },
    {
      id: "COS002",
      category: "cosmetiques",
      name: "Crème Royale Nuit",
      shortDesc: "Crème nuit régénérante à la rose",
      description: "Une crème de nuit ultra-riche formulée à l'huile de rose de Damas et au beurre de karité. Elle régénère, nourrit et répare la peau pendant le sommeil pour un réveil radieux.",
      price: 92.00,
      unit: "pièce",
      stock: 22,
      images: [],
      badge: "Nouveau",
      featured: true,
      tags: ["crème", "nuit", "rose", "régénérante"],
      specs: { volume: "50 ml", type: "Crème nuit", actifs: "Rose de Damas, Karité, Rétinol naturel", certif: "Cosmos Natural" },
      createdAt: "2025-01-18"
    },
    {
      id: "COS003",
      category: "cosmetiques",
      name: "Huile Précieuse Corps",
      shortDesc: "Huile sèche corps multi-usage",
      description: "Un mélange exclusif d'huiles précieuses — figue de barbarie, rose musquée et jasmin — pour une peau veloutée et sublimement parfumée. S'absorbe instantanément sans laisser de film gras.",
      price: 48.00,
      unit: "pièce",
      stock: 50,
      images: [],
      badge: null,
      featured: false,
      tags: ["huile", "corps", "sèche", "figue de barbarie"],
      specs: { volume: "100 ml", type: "Huile corps", actifs: "Figue de Barbarie, Rose Musquée, Jasmin", certif: "Cosmos Organic" },
      createdAt: "2024-12-15"
    },
    {
      id: "COS004",
      category: "cosmetiques",
      name: "Masque Lumière Kaolin",
      shortDesc: "Masque purifiant à l'argile blanche",
      description: "Un masque à l'argile kaolin et à l'extrait de fleur d'oranger. Il resserre les pores, unifie le teint et apporte une luminosité immédiate. Pour un soin hebdomadaire rituel.",
      price: 38.00,
      unit: "pièce",
      stock: 40,
      images: [],
      badge: null,
      featured: false,
      tags: ["masque", "argile", "kaolin", "purifiant"],
      specs: { volume: "75 ml", type: "Masque visage", actifs: "Kaolin, Fleur d'Oranger, Aloe Vera", certif: "Cosmos Natural" },
      createdAt: "2024-12-10"
    },
    {
      id: "ACC001",
      category: "accessoires",
      name: "Ciseaux Japonais Dorés",
      shortDesc: "Ciseaux de couture Kai Japan",
      description: "Les incontournables ciseaux de couture de la marque japonaise Kai, finition dorée. Lames en acier inoxydable de haute qualité pour des coupes nettes et précises sur tous types de tissus.",
      price: 89.00,
      unit: "pièce",
      stock: 15,
      images: [],
      badge: null,
      featured: false,
      tags: ["ciseaux", "japon", "couture", "or"],
      specs: { taille: "21 cm", matière: "Acier inox", finition: "Dorée 24K", marque: "Kai Japan" },
      createdAt: "2024-11-20"
    },
    {
      id: "COF001",
      category: "coffrets",
      name: "Coffret Beauté Prestige",
      shortDesc: "Sérum + Crème Royale + Huile Corps",
      description: "Notre coffret beauté le plus complet : le Sérum Éclat Doré, la Crème Royale Nuit et l'Huile Précieuse Corps, présentés dans un écrin noir et or. Le cadeau parfait pour les connaisseurs.",
      price: 185.00,
      unit: "coffret",
      stock: 12,
      images: [],
      badge: "Idée cadeau",
      featured: true,
      tags: ["coffret", "cadeau", "beauté", "prestige"],
      specs: { contenu: "Sérum 30ml + Crème 50ml + Huile 100ml", emballage: "Écrin noir & or", ruban: "Inclus", carte: "Message personnalisable" },
      createdAt: "2025-01-01"
    }
  ],

  // --- COMMANDES (simulées en local storage) ---
  getOrders() {
    return JSON.parse(localStorage.getItem("skluxury_orders") || "[]");
  },

  saveOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem("skluxury_orders", JSON.stringify(orders));
  },

  // --- PANIER ---
  getCart() {
    return JSON.parse(localStorage.getItem("skluxury_cart") || "[]");
  },

  saveCart(cart) {
    localStorage.setItem("skluxury_cart", JSON.stringify(cart));
  },

  // --- UTILITAIRES ---
  getProductById(id) {
    return this.products.find(p => p.id === id);
  },

  getProductsByCategory(cat) {
    if (!cat || cat === "all") return this.products;
    return this.products.filter(p => p.category === cat);
  },

  getFeaturedProducts() {
    return this.products.filter(p => p.featured);
  },

  formatPrice(price) {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
  },

  // ADMIN: ajouter un produit
  addProduct(product) {
    product.id = product.category.substring(0,3).toUpperCase() + Date.now();
    product.createdAt = new Date().toISOString().split("T")[0];
    this.products.push(product);
    this._saveProducts();
    return product;
  },

  // ADMIN: modifier un produit
  updateProduct(id, data) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.products[idx] = { ...this.products[idx], ...data };
      this._saveProducts();
      return this.products[idx];
    }
    return null;
  },

  // ADMIN: supprimer un produit
  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    this._saveProducts();
  },

  _saveProducts() {
    localStorage.setItem("skluxury_products_override", JSON.stringify(this.products));
  },

  init() {
    // Charge les produits depuis localStorage si le gérant les a modifiés
    const override = localStorage.getItem("skluxury_products_override");
    if (override) this.products = JSON.parse(override);
  }
};

// Initialisation automatique
SKLUXURY_DB.init();