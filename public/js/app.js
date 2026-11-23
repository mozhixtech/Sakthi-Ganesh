/**
 * Sakthi Ganesh Textiles - Main Interactive Application Logic
 * Featuring: E-Commerce Catalog, WhatsApp Commerce, Showroom Tour, Bilingual Support (Tamil/English)
 */

// Global State
const state = {
  cart: JSON.parse(localStorage.getItem('sgt_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('sgt_wishlist')) || [],
  category: 'all',
  occasion: 'all',
  searchQuery: '',
  sortBy: 'featured',
  lang: localStorage.getItem('sgt_lang') || 'en',
  activeShowroomIndex: 0,
  activeQuickViewProduct: null,
  storePhone: '+91 94431 27794',
  whatsappRaw: '919443127794'
};

// Language Dictionary for Dynamic Elements
const I18N = {
  en: {
    heroBadge: "✨ Thoothukudi's Pride • Since Sivan Kovil Street Heritage",
    heroTitle: "The Splendor of Pure Silk & Grand Traditions",
    heroSubtitle: "Explore Tamil Nadu's authentic handwoven bridal Kanchipuram pattu, royal menswear, traditional dhotis, and festive readymades at direct weaver prices.",
    exploreCatalog: "Explore Collections",
    bookVideoCall: "Book WhatsApp Video Call",
    allProducts: "All Collections",
    womenswear: "Women's Silks & Sarees",
    menswear: "Menswear & Dhotis",
    kids: "Kids Corner",
    wedding: "Wedding Trousseau",
    searchPlaceholder: "Search silk sarees, dhotis, shirts, kids frocks...",
    sortBy: "Sort By",
    sortFeatured: "Featured Collections",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    sortRating: "Highest Rated",
    orderWhatsApp: "Order on WhatsApp",
    quickView: "Quick View",
    addToBag: "Add to Bag",
    inBag: "Added to Bag",
    addedToWishlist: "Saved to Wishlist",
    removedFromWishlist: "Removed from Wishlist",
    cartTitle: "Your Shopping Bag & WhatsApp Inquiry",
    emptyCartText: "Your shopping bag is empty. Explore our bridal silks and menswear!",
    startShopping: "Discover Collections",
    totalEstimated: "Total Estimated Value:",
    sendCartWhatsApp: "Send Order via WhatsApp (+91 94431 27794)",
    copyOrderText: "Copy Order Details",
    showroomHeading: "Experience Our Multi-Floor Showroom",
    showroomSub: "Visit us at Sivan Kovil Street near Sivan Temple, Thoothukudi, or take a virtual tour of our silk counters and readymade floors.",
    reviewsHeading: "Loved by Over 50,000+ Happy Families",
    storeOpenBadge: "Showroom is Open Today • 9:30 AM - 9:30 PM",
    storeAddressLine1: "16, Sivan Kovil Street, Near Sivan Temple,",
    storeAddressLine2: "Thoothukudi, Tamil Nadu 628002",
    directionsBtn: "Open in Google Maps",
    callStoreBtn: "Call Store Directly",
    whatsappUsBtn: "Chat on WhatsApp",
    videoCallModalTitle: "Book a 1-on-1 WhatsApp Video Shopping Tour",
    videoCallModalSub: "Live from our Thoothukudi Showroom. Our experts drape sarees and show fabrics on high-definition video call before you buy.",
    nameLabel: "Your Full Name",
    whatsappLabel: "WhatsApp Mobile Number",
    categoryLabel: "Interested Category",
    dateLabel: "Preferred Date",
    timeLabel: "Preferred Time Slot",
    confirmVideoCall: "Confirm & Schedule via WhatsApp",
    freeDeliveryBadge: "Free Delivery Across Tamil Nadu on orders above ₹1,999"
  },
  ta: {
    heroBadge: "✨ தூத்துக்குடியின் பாரம்பரியம் • சிவன் கோவில் தெருவின் பெருமை",
    heroTitle: "தூய பட்டு மற்றும் குடும்ப ஆடைகளின் கம்பீர சங்கமம்",
    heroSubtitle: "திருமண முகூர்த்த காஞ்சிபுரம் பட்டு சேலைகள், ஆண்கள் பட்டு வேஷ்டி & சட்டைகள், சிறுவர் ஆடைகள் - தறி விலையில் நேரடி விற்பனை.",
    exploreCatalog: "ஆடைகளை பார்க்க",
    bookVideoCall: "வாட்ஸ்அப் வீடியோ ஷாப்பிங்",
    allProducts: "அனைத்து ஆடைகள்",
    womenswear: "பட்டு சேலைகள்",
    menswear: "ஆண்கள் ஆடை & வேஷ்டி",
    kids: "சிறுவர் ஆடை உலகம்",
    wedding: "திருமண முகூர்த்த தொகுப்பு",
    searchPlaceholder: "பட்டு சேலை, வேஷ்டி, சட்டை, பாவாடை தேடவும்...",
    sortBy: "வரிசைப்படுத்து",
    sortFeatured: "சிறப்பு தேர்வுகள்",
    sortPriceLow: "விலை: குறைவு முதல் அதிகம்",
    sortPriceHigh: "விலை: அதிகம் முதல் குறைவு",
    sortRating: "வாடிக்கையாளர் மதிப்பீடு",
    orderWhatsApp: "வாட்ஸ்அப்பில் வாங்க",
    quickView: "விரைவு பார்வை",
    addToBag: "பையில் சேர்க்க",
    inBag: "பையில் சேர்க்கப்பட்டது",
    addedToWishlist: "விருப்பப்பட்டியலில் சேமிக்கப்பட்டது",
    removedFromWishlist: "நீக்கப்பட்டது",
    cartTitle: "உங்கள் ஷாப்பிங் பை & வாட்ஸ்அப் ஆர்டர்",
    emptyCartText: "ஷாப்பிங் பை காலியாக உள்ளது. எங்கள் பட்டு சேலைகளை பார்க்கவும்!",
    startShopping: "ஷாப்பிங் செய்ய",
    totalEstimated: "மொத்த உத்தேச மதிப்பு:",
    sendCartWhatsApp: "வாட்ஸ்அப் மூலம் ஆர்டர் அனுப்ப (+91 94431 27794)",
    copyOrderText: "ஆர்டர் விவரங்களை நகலெடு",
    showroomHeading: "எங்கள் பிரம்மாண்ட ஷோரூம் நேரடி பார்வை",
    showroomSub: "தூத்துக்குடி சிவன் கோவில் அருகே உள்ள வி.எஸ்.பி காம்ப்ளக்ஸ் ஷோரூமிற்கு வாருங்கள் அல்லது ஆன்லைனில் சுற்றிப் பாருங்கள்.",
    reviewsHeading: "50,000+ வாடிக்கையாளர்களின் நம்பகமான ஆதரவு",
    storeOpenBadge: "இன்று காலை 9:30 முதல் இரவு 9:30 வரை திறந்துள்ளது",
    storeAddressLine1: "16, சிவன் கோவில் தெரு, சிவன் கோவில் அருகில்,",
    storeAddressLine2: "தூத்துக்குடி, தமிழ்நாடு 628002",
    directionsBtn: "கூகுள் மேப் வழிகாட்டல்",
    callStoreBtn: "நேரடியாக அழைக்க",
    whatsappUsBtn: "வாட்ஸ்அப்பில் பேச",
    videoCallModalTitle: "நேரடி வாட்ஸ்அப் வீடியோ ஷாப்பிங் பதிவு செய்க",
    videoCallModalSub: "எங்கள் தூத்துக்குடி கடையில் இருந்து நேரடியாக புடவைகளை வீடியோ காலில் பார்த்து தேர்வு செய்யலாம்.",
    nameLabel: "உங்கள் பெயர்",
    whatsappLabel: "வாட்ஸ்அப் செல்போன் எண்",
    categoryLabel: "பார்க்க விரும்பும் ஆடை வகை",
    dateLabel: "விருப்பமான தேதி",
    timeLabel: "விருப்பமான நேரம்",
    confirmVideoCall: "வாட்ஸ்அப் மூலம் வீடியோ கால் உறுதி செய்க",
    freeDeliveryBadge: "தமிழ்நாடு முழுவதும் ₹1,999க்கு மேல் இலவச டோர் டெலிவரி"
  }
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  applyLanguage(state.lang);
  renderProducts();
  renderShowroomGallery();
  renderReviews();
  updateCartCounters();
  updateWishlistCounters();
  setupEventListeners();
  setupSearch();
  initHeroSlider();
});

// Render Lucide Icons safely
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Category tabs
  const filterTabs = document.querySelectorAll('.category-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-category');
      setCategory(cat);
    });
  });

  // Occasion pills
  const occasionPills = document.querySelectorAll('.occasion-pill');
  occasionPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      occasionPills.forEach(p => p.classList.remove('bg-amber-100', 'text-amber-900', 'font-bold'));
      e.currentTarget.classList.add('bg-amber-100', 'text-amber-900', 'font-bold');
      state.occasion = e.currentTarget.getAttribute('data-occasion');
      renderProducts();
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Language switchers
  const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleLanguage();
    });
  });
}

// Language Handler
function toggleLanguage() {
  const newLang = state.lang === 'en' ? 'ta' : 'en';
  state.lang = newLang;
  localStorage.setItem('sgt_lang', newLang);
  applyLanguage(newLang);
  renderProducts();
  renderShowroomGallery();
}

function applyLanguage(lang) {
  const t = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update input placeholders
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.placeholder = t.searchPlaceholder;
  });

  // Update active pill text
  const langPills = document.querySelectorAll('.lang-pill-indicator');
  langPills.forEach(pill => {
    pill.textContent = lang === 'en' ? 'தமிழ்' : 'English';
  });

  // Set font class if Tamil
  if (lang === 'ta') {
    document.body.classList.add('font-tamil');
  } else {
    document.body.classList.remove('font-tamil');
  }
}

// Category Switcher
function setCategory(category) {
  state.category = category;
  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => {
    const isCurrent = tab.getAttribute('data-category') === category;
    if (isCurrent) {
      tab.classList.add('active', 'border-amber-600', 'text-amber-900', 'bg-amber-50');
      tab.classList.remove('text-stone-600');
    } else {
      tab.classList.remove('active', 'border-amber-600', 'text-amber-900', 'bg-amber-50');
      tab.classList.add('text-stone-600');
    }
  });
  renderProducts();

  // Scroll to catalog section smoothly on mobile if clicked
  const catalogSection = document.getElementById('catalogSection');
  if (catalogSection && window.innerWidth < 768) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Search Handler
function setupSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  });
}

// Render Products Grid
function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countDisplay = document.getElementById('productsCount');
  if (!container) return;

  let filtered = PRODUCTS_DATA.filter(p => {
    const matchCategory = (state.category === 'all') || (p.category === state.category);
    const matchOccasion = (state.occasion === 'all') || (p.occasionEn.toLowerCase().includes(state.occasion.toLowerCase()));
    const matchSearch = !state.searchQuery || 
      p.nameEn.toLowerCase().includes(state.searchQuery) ||
      p.nameTa.toLowerCase().includes(state.searchQuery) ||
      p.fabricEn.toLowerCase().includes(state.searchQuery) ||
      p.subCategory.toLowerCase().includes(state.searchQuery);
    return matchCategory && matchOccasion && matchSearch;
  });

  // Sorting
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // Featured first
    filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  if (countDisplay) {
    const isTa = state.lang === 'ta';
    countDisplay.textContent = isTa 
      ? `${filtered.length} ஆடைகள் காட்டப்படுகின்றன` 
      : `Showing ${filtered.length} exquisite designs`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
        <div class="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <i data-lucide="package-search" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-bold text-stone-800 mb-2">${state.lang === 'ta' ? 'ஆடைகள் எதுவும் பொருந்தவில்லை' : 'No matching textile designs found'}</h3>
        <p class="text-stone-500 max-w-md mx-auto mb-6">${state.lang === 'ta' ? 'தயவுசெய்து வேறு வகை அல்லது தேடல் சொல்லை முயற்சிக்கவும், அல்லது வாட்ஸ்அப்பில் எங்களை தொடர்பு கொள்ளவும்.' : 'Try adjusting your search terms or filters. Or request a live photo on WhatsApp directly!'}</p>
        <button onclick="resetFilters()" class="btn-burgundy px-6 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
          <i data-lucide="rotate-ccw" class="w-4 h-4"></i> ${state.lang === 'ta' ? 'அனைத்து ஆடைகளையும் காட்டுக' : 'View All Collections'}
        </button>
      </div>
    `;
    initLucideIcons();
    return;
  }

  const isTa = state.lang === 'ta';

  container.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const isInBag = state.cart.some(item => item.id === product.id);
    const badgeText = isTa ? (product.badgeTa || product.badge) : product.badge;
    const titleText = isTa ? product.nameTa : product.nameEn;
    const taglineText = isTa ? product.taglineTa : product.taglineEn;
    const fabricText = isTa ? product.fabricTa : product.fabricEn;

    // Direct WhatsApp message formatting
    const encodedWaText = encodeURIComponent(
      `Vanakkam Sakthi Ganesh Textiles! I want to order/inquire about: ${product.nameEn} (Code: ${product.id}) at Rs.${product.price.toLocaleString('en-IN')}. Please confirm availability.`
    );
    const waLink = `https://wa.me/${state.whatsappRaw}?text=${encodedWaText}`;

    return `
      <div class="product-card group flex flex-col h-full border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative">
        <!-- Badges & Wishlist Button -->
        <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          <span class="px-2.5 py-1 text-xs font-semibold rounded-full silk-badge shadow-md flex items-center gap-1">
            <i data-lucide="sparkles" class="w-3 h-3 text-amber-300"></i> ${badgeText}
          </span>
          <span class="px-2 py-0.5 text-[11px] font-bold rounded-md bg-emerald-700 text-white shadow-sm">
            ${product.discount}
          </span>
        </div>

        <button onclick="toggleWishlist('${product.id}')" 
          aria-label="Add to Wishlist" 
          class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-rose-600 transition-all duration-200 shadow-md hover:scale-110">
          <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}"></i>
        </button>

        <!-- Product Image -->
        <div class="product-image-container aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer relative" onclick="openProductModal('${product.id}')">
          <img 
            src="${product.image}" 
            alt="${product.nameEn}"
            loading="lazy"
            onerror="this.onerror=null; this.src='img3.jpeg';"
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button class="w-full py-2 bg-white/95 text-stone-900 font-semibold text-xs rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-amber-50">
              <i data-lucide="eye" class="w-4 h-4 text-amber-600"></i> ${isTa ? 'விவரங்களை பார்க்க' : 'Quick View & Details'}
            </button>
          </div>
        </div>

        <!-- Product Info Body -->
        <div class="p-4 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span class="uppercase tracking-wider font-semibold text-amber-800">${product.subCategory}</span>
              <span class="flex items-center gap-1 font-bold text-stone-700">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${product.rating} (${product.reviewsCount})
              </span>
            </div>

            <h4 class="font-bold text-stone-900 text-base leading-snug line-clamp-1 group-hover:text-amber-900 transition-colors cursor-pointer" onclick="openProductModal('${product.id}')">
              ${titleText}
            </h4>

            <p class="text-xs text-stone-500 line-clamp-1 mt-1 mb-2 font-medium">
              ${taglineText}
            </p>

            <div class="text-[11px] text-stone-600 bg-stone-50 rounded px-2 py-1 mb-3 line-clamp-1 border border-stone-100">
              <span class="font-semibold text-stone-700">${isTa ? 'துணி வகை:' : 'Fabric:'}</span> ${fabricText}
            </div>
          </div>

          <!-- Price & Actions -->
          <div class="pt-2 border-t border-stone-100">
            <div class="flex items-baseline gap-2 mb-3">
              <span class="text-xl font-extrabold text-red-950 font-serif-luxury">₹${product.price.toLocaleString('en-IN')}</span>
              <span class="text-xs text-stone-400 line-through">₹${product.originalPrice.toLocaleString('en-IN')}</span>
              <span class="text-xs font-bold text-emerald-700 ml-auto">${isTa ? 'தறி விலை' : 'Weaver Price'}</span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" 
                class="btn-whatsapp py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm text-center">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> ${isTa ? 'வாட்ஸ்அப்' : 'WhatsApp'}
              </a>

              <button onclick="addToBag('${product.id}')" 
                class="${isInBag ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'btn-burgundy'} py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all">
                <i data-lucide="${isInBag ? 'check' : 'shopping-bag'}" class="w-3.5 h-3.5"></i> ${isInBag ? (isTa ? 'சேர்க்கப்பட்டது' : 'In Bag') : (isTa ? 'பையில் சேர்' : 'Add to Bag')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

function resetFilters() {
  state.category = 'all';
  state.occasion = 'all';
  state.searchQuery = '';
  state.sortBy = 'featured';
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(i => i.value = '');
  setCategory('all');
}

// Showroom Photo Highlights Section
function renderShowroomGallery() {
  const container = document.getElementById('showroomGalleryGrid');
  if (!container) return;

  const isTa = state.lang === 'ta';

  container.innerHTML = SHOWROOM_HIGHLIGHTS.map((item, idx) => {
    const title = isTa ? item.titleTa : item.titleEn;
    const desc = isTa ? item.descriptionTa : item.descriptionEn;

    return `
      <div class="group relative rounded-2xl overflow-hidden bg-stone-900 border border-amber-500/20 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" onclick="openShowroomModal(${idx})">
        <div class="aspect-[4/3] w-full overflow-hidden">
          <img 
            src="${item.image}" 
            alt="${item.titleEn}" 
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-5 flex flex-col justify-end text-white">
          <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-full bg-amber-500/90 text-stone-950 uppercase w-max mb-2">
            ${item.badge}
          </span>
          <h4 class="font-bold text-base text-amber-100 group-hover:text-amber-300 transition-colors">
            ${title}
          </h4>
          <p class="text-xs text-stone-300 line-clamp-2 mt-1 font-light">
            ${desc}
          </p>
          <div class="mt-3 flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold">
            <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i> ${isTa ? 'பெரிதாக்கி பார்க்க' : 'View Full Image'}
          </div>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

// Showroom Image Modal Viewer
function openShowroomModal(index) {
  state.activeShowroomIndex = index;
  const item = SHOWROOM_HIGHLIGHTS[index];
  const modal = document.getElementById('showroomModal');
  const modalImg = document.getElementById('showroomModalImg');
  const modalTitle = document.getElementById('showroomModalTitle');
  const modalDesc = document.getElementById('showroomModalDesc');
  const modalLoc = document.getElementById('showroomModalLoc');

  if (!modal || !item) return;

  const isTa = state.lang === 'ta';
  modalImg.src = item.image;
  modalTitle.textContent = isTa ? item.titleTa : item.titleEn;
  modalDesc.textContent = isTa ? item.descriptionTa : item.descriptionEn;
  modalLoc.textContent = item.location;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  initLucideIcons();
}

function closeShowroomModal() {
  const modal = document.getElementById('showroomModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function prevShowroomImage() {
  let nextIdx = state.activeShowroomIndex - 1;
  if (nextIdx < 0) nextIdx = SHOWROOM_HIGHLIGHTS.length - 1;
  openShowroomModal(nextIdx);
}

function nextShowroomImage() {
  let nextIdx = state.activeShowroomIndex + 1;
  if (nextIdx >= SHOWROOM_HIGHLIGHTS.length) nextIdx = 0;
  openShowroomModal(nextIdx);
}

// Google Reviews Rendering
function renderReviews() {
  const container = document.getElementById('customerReviewsGrid');
  if (!container) return;

  const isTa = state.lang === 'ta';

  container.innerHTML = CUSTOMER_REVIEWS.map(rev => {
    const comment = isTa ? rev.tamilComment : rev.comment;
    return `
      <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-all">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-1">
              ${Array(rev.rating).fill(0).map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i>`).join('')}
            </div>
            <span class="text-xs text-stone-400 font-medium">${rev.date}</span>
          </div>
          <p class="text-sm text-stone-700 leading-relaxed italic mb-4">
            "${comment}"
          </p>
        </div>
        <div class="flex items-center gap-3 pt-3 border-t border-stone-100">
          <div class="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm">
            ${rev.name.charAt(0)}
          </div>
          <div>
            <h5 class="text-xs font-bold text-stone-900">${rev.name}</h5>
            <span class="text-[11px] text-stone-500">${rev.location}</span>
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" class="h-3.5 ml-auto opacity-70" />
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

// Product Quick View Modal
function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  state.activeQuickViewProduct = product;

  const modal = document.getElementById('productQuickViewModal');
  const container = document.getElementById('quickViewContent');
  if (!modal || !container) return;

  const isTa = state.lang === 'ta';
  const isWishlisted = state.wishlist.includes(product.id);
  const isInBag = state.cart.some(item => item.id === product.id);

  const title = isTa ? product.nameTa : product.nameEn;
  const tagline = isTa ? product.taglineTa : product.taglineEn;
  const desc = isTa ? product.descriptionTa : product.descriptionEn;
  const fabric = isTa ? product.fabricTa : product.fabricEn;
  const occasion = isTa ? product.occasionTa : product.occasionEn;

  const encodedWaText = encodeURIComponent(
    `Vanakkam Sakthi Ganesh Textiles! I am inquiring about:\nProduct: ${product.nameEn} (${product.id})\nPrice: Rs.${product.price.toLocaleString('en-IN')}\nPlease send high-resolution video drape and delivery details to my location.`
  );
  const waLink = `https://wa.me/${state.whatsappRaw}?text=${encodedWaText}`;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Media Gallery Left -->
      <div class="flex flex-col gap-4">
        <div class="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative shadow-inner">
          <img 
            id="quickViewMainImg" 
            src="${product.image}" 
            alt="${product.nameEn}" 
            class="w-full h-full object-cover object-center transition-all duration-300"
          />
          <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold silk-badge">
            ${isTa ? (product.badgeTa || product.badge) : product.badge}
          </span>
        </div>

        <!-- Thumbnails -->
        <div class="flex gap-3 overflow-x-auto pb-1">
          ${product.thumbnails.map((t, idx) => `
            <button onclick="switchQuickViewImg('${t}')" class="w-16 h-20 rounded-lg overflow-hidden border-2 ${idx === 0 ? 'border-amber-600' : 'border-stone-200'} flex-shrink-0 hover:border-amber-600 transition-all">
              <img src="${t}" class="w-full h-full object-cover" alt="Thumb ${idx + 1}" />
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Product Specifications Right -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs uppercase font-bold text-amber-800 tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              ${product.subCategory} • Code: ${product.id}
            </span>
            <span class="flex items-center gap-1 text-sm font-bold text-stone-700">
              <i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i> ${product.rating} / 5.0
            </span>
          </div>

          <h2 class="text-2xl font-bold text-stone-900 leading-tight mb-1 font-serif-luxury">${title}</h2>
          <p class="text-sm font-medium text-amber-900/80 mb-4">${tagline}</p>

          <!-- Price Display -->
          <div class="flex items-baseline gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 mb-5">
            <span class="text-3xl font-extrabold text-red-950 font-serif-luxury">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="text-sm text-stone-400 line-through">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-md">
              ${product.discount} (${isTa ? 'சேமிப்பு' : 'Direct Weaver Price'})
            </span>
          </div>

          <!-- Description -->
          <p class="text-sm text-stone-600 leading-relaxed mb-5">${desc}</p>

          <!-- Spec Table -->
          <div class="space-y-2 text-xs border-y border-stone-200 py-4 mb-6">
            <div class="grid grid-cols-3 py-1">
              <span class="font-bold text-stone-500">${isTa ? 'துணி & நெசவு' : 'Fabric & Weave'}:</span>
              <span class="col-span-2 text-stone-800 font-medium">${fabric}</span>
            </div>
            <div class="grid grid-cols-3 py-1">
              <span class="font-bold text-stone-500">${isTa ? 'ஜரிகை விபரம்' : 'Zari Details'}:</span>
              <span class="col-span-2 text-stone-800 font-medium">${product.zariType}</span>
            </div>
            <div class="grid grid-cols-3 py-1">
              <span class="font-bold text-stone-500">${isTa ? 'பிளவுஸ் / அட்டாச்' : 'Blouse / Set'}:</span>
              <span class="col-span-2 text-stone-800 font-medium">${product.blousePiece}</span>
            </div>
            <div class="grid grid-cols-3 py-1">
              <span class="font-bold text-stone-500">${isTa ? 'பொருத்தமான நிகழ்வு' : 'Occasion'}:</span>
              <span class="col-span-2 text-stone-800 font-medium">${occasion}</span>
            </div>
            <div class="grid grid-cols-3 py-1">
              <span class="font-bold text-stone-500">${isTa ? 'பராமரிப்பு' : 'Care'}:</span>
              <span class="col-span-2 text-stone-800 font-medium">${product.careInstructions}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" 
              class="btn-whatsapp py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md text-center">
              <i data-lucide="message-circle" class="w-5 h-5"></i> ${isTa ? 'வாட்ஸ்அப்பில் ஆர்டர்' : 'Order on WhatsApp'}
            </a>

            <button onclick="addToBag('${product.id}')" 
              class="${isInBag ? 'bg-amber-100 text-amber-900 border border-amber-400' : 'btn-burgundy'} py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
              <i data-lucide="${isInBag ? 'check' : 'shopping-bag'}" class="w-5 h-5"></i> ${isInBag ? (isTa ? 'பையில் உள்ளது' : 'In Bag') : (isTa ? 'பையில் சேர்' : 'Add to Bag')}
            </button>
          </div>

          <div class="flex items-center justify-between text-xs text-stone-500 pt-1">
            <span class="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <i data-lucide="shield-check" class="w-4 h-4"></i> ${isTa ? '100% தூய தரம் உத்தரவாதம்' : '100% Quality Guaranteed'}
            </span>
            <button onclick="toggleWishlist('${product.id}'); openProductModal('${product.id}')" class="text-rose-700 font-semibold hover:underline flex items-center gap-1">
              <i data-lucide="heart" class="w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}"></i>
              ${isWishlisted ? (isTa ? 'விருப்பத்தில் உள்ளது' : 'In Wishlist') : (isTa ? 'விருப்பத்தில் சேர்' : 'Save to Wishlist')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  initLucideIcons();
}

function switchQuickViewImg(src) {
  const mainImg = document.getElementById('quickViewMainImg');
  if (mainImg) {
    mainImg.src = src;
  }
}

function closeProductModal() {
  const modal = document.getElementById('productQuickViewModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// Shopping Bag / Inquiry Drawer Logic
function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    renderCartItems();
    overlay.classList.remove('hidden');
    drawer.classList.remove('drawer-closed');
    drawer.classList.add('drawer-open');
    document.body.classList.add('overflow-hidden');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('drawer-open');
    drawer.classList.add('drawer-closed');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function addToBag(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem('sgt_cart', JSON.stringify(state.cart));
  updateCartCounters();
  renderProducts();

  const isTa = state.lang === 'ta';
  showToast(
    isTa ? 'பையில் சேர்க்கப்பட்டது!' : 'Added to Shopping Bag!',
    `${product.nameEn} (₹${product.price.toLocaleString('en-IN')})`,
    'shopping-bag'
  );
}

function updateCartQty(productId, delta) {
  const itemIndex = state.cart.findIndex(i => i.id === productId);
  if (itemIndex > -1) {
    state.cart[itemIndex].quantity += delta;
    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
    }
  }
  localStorage.setItem('sgt_cart', JSON.stringify(state.cart));
  updateCartCounters();
  renderCartItems();
  renderProducts();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  localStorage.setItem('sgt_cart', JSON.stringify(state.cart));
  updateCartCounters();
  renderCartItems();
  renderProducts();
}

function renderCartItems() {
  const container = document.getElementById('cartItemsContainer');
  const totalDisplay = document.getElementById('cartTotalDisplay');
  const savingsDisplay = document.getElementById('cartSavingsDisplay');
  const emptyView = document.getElementById('cartEmptyView');
  const footerView = document.getElementById('cartFooterView');
  if (!container) return;

  const isTa = state.lang === 'ta';

  if (state.cart.length === 0) {
    container.innerHTML = '';
    if (emptyView) emptyView.classList.remove('hidden');
    if (footerView) footerView.classList.add('hidden');
    return;
  }

  if (emptyView) emptyView.classList.add('hidden');
  if (footerView) footerView.classList.remove('hidden');

  let grandTotal = 0;
  let originalTotal = 0;

  container.innerHTML = state.cart.map(cartItem => {
    const product = PRODUCTS_DATA.find(p => p.id === cartItem.id);
    if (!product) return '';

    const itemTotal = product.price * cartItem.quantity;
    const itemOriginal = product.originalPrice * cartItem.quantity;
    grandTotal += itemTotal;
    originalTotal += itemOriginal;

    const title = isTa ? product.nameTa : product.nameEn;

    return `
      <div class="flex gap-3 py-3 border-b border-stone-100 items-center">
        <img src="${product.image}" alt="${product.nameEn}" class="w-16 h-20 object-cover rounded-lg border border-stone-200" />
        <div class="flex-1 min-w-0">
          <h5 class="text-xs font-bold text-stone-900 truncate">${title}</h5>
          <span class="text-[11px] text-stone-500 font-mono">${product.id}</span>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-sm font-extrabold text-red-950 font-serif-luxury">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="text-[11px] text-stone-400 line-through">₹${product.originalPrice.toLocaleString('en-IN')}</span>
          </div>

          <!-- Quantity Stepper -->
          <div class="flex items-center gap-2 mt-2">
            <button onclick="updateCartQty('${product.id}', -1)" class="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-xs">
              -
            </button>
            <span class="text-xs font-bold w-6 text-center">${cartItem.quantity}</span>
            <button onclick="updateCartQty('${product.id}', 1)" class="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-xs">
              +
            </button>
            <button onclick="removeFromCart('${product.id}')" class="ml-auto text-xs text-stone-400 hover:text-rose-600 transition-colors">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (totalDisplay) {
    totalDisplay.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  }
  if (savingsDisplay) {
    const savings = originalTotal - grandTotal;
    savingsDisplay.textContent = `${isTa ? 'நீங்கள் சேமிப்பது:' : 'Your Total Savings:'} ₹${savings.toLocaleString('en-IN')}`;
  }

  initLucideIcons();
}

function updateCartCounters() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

// Send Full Cart / Inquiry to WhatsApp
function sendCartWhatsApp() {
  if (state.cart.length === 0) return;

  const isTa = state.lang === 'ta';
  let messageLines = [
    isTa ? "வணக்கம் சக்தி கணேஷ் டெக்ஸ்டைல்ஸ்! நான் கீழ்காணும் ஆடைகளை வாங்க விரும்புகிறேன்:" : "Vanakkam Sakthi Ganesh Textiles! I would like to place an order/inquire for:",
    ""
  ];

  let totalAmount = 0;
  state.cart.forEach((item, idx) => {
    const product = PRODUCTS_DATA.find(p => p.id === item.id);
    if (product) {
      const lineCost = product.price * item.quantity;
      totalAmount += lineCost;
      messageLines.push(`${idx + 1}. ${product.nameEn} (Code: ${product.id})`);
      messageLines.push(`   Qty: ${item.quantity} | Rate: Rs.${product.price.toLocaleString('en-IN')} | Total: Rs.${lineCost.toLocaleString('en-IN')}`);
    }
  });

  messageLines.push("");
  messageLines.push(`Estimated Total: Rs.${totalAmount.toLocaleString('en-IN')}`);
  messageLines.push("Showroom: 16, Sivan Kovil St, Near Sivan Temple, Thoothukudi");
  messageLines.push(isTa ? "தயவுசெய்து இருப்பு மற்றும் கட்டண விவரங்களை உறுதி செய்யவும்." : "Please confirm stock availability, payment details, and shipping/pickup time.");

  const fullText = messageLines.join("\n");
  const waUrl = `https://wa.me/${state.whatsappRaw}?text=${encodeURIComponent(fullText)}`;
  window.open(waUrl, '_blank');
}

// Wishlist Functionality
function toggleWishlist(productId) {
  const isTa = state.lang === 'ta';
  const index = state.wishlist.indexOf(productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(isTa ? 'நீக்கப்பட்டது' : 'Removed from Wishlist', '', 'heart-crack');
  } else {
    state.wishlist.push(productId);
    showToast(isTa ? 'விருப்பத்தில் சேர்க்கப்பட்டது' : 'Saved to Wishlist', '', 'heart');
  }
  localStorage.setItem('sgt_wishlist', JSON.stringify(state.wishlist));
  updateWishlistCounters();
  renderProducts();
}

function updateWishlistCounters() {
  const count = state.wishlist.length;
  const badges = document.querySelectorAll('.wishlist-count-badge');
  badges.forEach(b => {
    b.textContent = count;
    if (count > 0) {
      b.classList.remove('hidden');
    } else {
      b.classList.add('hidden');
    }
  });
}

function openWishlistModal() {
  const modal = document.getElementById('wishlistModal');
  const container = document.getElementById('wishlistItemsContainer');
  if (!modal || !container) return;

  const isTa = state.lang === 'ta';

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <i data-lucide="heart" class="w-12 h-12 text-stone-300 mx-auto mb-3"></i>
        <h4 class="font-bold text-stone-700">${isTa ? 'விருப்பப்பட்டியல் காலியாக உள்ளது' : 'Your Wishlist is Empty'}</h4>
        <p class="text-xs text-stone-500 mt-1">${isTa ? 'சேலைகளின் இதய குறியீட்டை அழுத்தி சேமிக்கலாம்' : 'Tap the heart icon on any saree or dhoti to save here.'}</p>
      </div>
    `;
  } else {
    const wishlistedProducts = PRODUCTS_DATA.filter(p => state.wishlist.includes(p.id));
    container.innerHTML = wishlistedProducts.map(p => `
      <div class="flex items-center gap-3 p-3 border rounded-xl border-stone-200 bg-white">
        <img src="${p.image}" class="w-14 h-16 object-cover rounded-lg" alt="${p.nameEn}" />
        <div class="flex-1 min-w-0">
          <h5 class="text-xs font-bold text-stone-900 truncate">${isTa ? p.nameTa : p.nameEn}</h5>
          <span class="text-xs font-extrabold text-red-950">₹${p.price.toLocaleString('en-IN')}</span>
        </div>
        <button onclick="addToBag('${p.id}')" class="p-2 bg-amber-50 text-amber-900 rounded-lg hover:bg-amber-100 text-xs font-bold flex items-center gap-1">
          <i data-lucide="shopping-bag" class="w-4 h-4"></i>
        </button>
        <button onclick="toggleWishlist('${p.id}'); openWishlistModal()" class="p-2 text-stone-400 hover:text-rose-600">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    `).join('');
  }

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  initLucideIcons();
}

function closeWishlistModal() {
  const modal = document.getElementById('wishlistModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// Live Video Shopping Appointment Modal
function openVideoCallModal() {
  const modal = document.getElementById('videoCallModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

function closeVideoCallModal() {
  const modal = document.getElementById('videoCallModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function submitVideoCallBooking(e) {
  e.preventDefault();
  const name = document.getElementById('vName')?.value || 'Customer';
  const phone = document.getElementById('vPhone')?.value || '';
  const category = document.getElementById('vCategory')?.value || 'Bridal Sarees';
  const date = document.getElementById('vDate')?.value || 'Today';
  const time = document.getElementById('vTime')?.value || 'Convenient Time';

  const text = encodeURIComponent(
    `Vanakkam Sakthi Ganesh Textiles! I want to schedule a WhatsApp Video Shopping Call:\n- Name: ${name}\n- WhatsApp: ${phone}\n- Category of Interest: ${category}\n- Preferred Date: ${date}\n- Preferred Time Slot: ${time}\nPlease confirm appointment from your Thoothukudi showroom.`
  );

  const url = `https://wa.me/${state.whatsappRaw}?text=${text}`;
  window.open(url, '_blank');
  closeVideoCallModal();
}

// Toast Notification System
function showToast(title, message, icon = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-card p-3 flex items-start gap-3';
  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0">
      <i data-lucide="${icon}" class="w-4 h-4"></i>
    </div>
    <div class="flex-1 min-w-0">
      <h6 class="text-xs font-bold text-stone-900">${title}</h6>
      ${message ? `<p class="text-[11px] text-stone-500 truncate">${message}</p>` : ''}
    </div>
    <button onclick="this.parentElement.remove()" class="text-stone-400 hover:text-stone-600">
      <i data-lucide="x" class="w-3.5 h-3.5"></i>
    </button>
  `;

  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Hero Slide Controller
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('opacity-100', 'z-10');
    slides[current].classList.add('opacity-0', 'z-0');
    current = (current + 1) % slides.length;
    slides[current].classList.remove('opacity-0', 'z-0');
    slides[current].classList.add('opacity-100', 'z-10');
  }, 6000);
}
