import { PRODUCT_IMAGE_BY_ID } from "../data/product-images.js";

const CATEGORY_DATA = [
    ["Phones & Tablets", ["Smartphone", "Android phone", "Tablet", "Mini tablet", "Phone case", "Screen protector", "Wireless charger", "Power bank", "USB-C cable", "Phone stand"], 55000, "📱"],
    ["Computers & Laptops", ["Laptop", "Ultrabook", "Desktop monitor", "Wireless keyboard", "Gaming mouse", "Laptop stand", "USB hub", "Webcam", "Laptop sleeve", "Portable SSD"], 42000, "💻"],
    ["Audio & Headphones", ["Wireless headphones", "Bluetooth earbuds", "Studio headset", "Portable speaker", "Sound bar", "USB microphone", "Vinyl turntable", "Audio adapter", "Speaker stand", "Travel earbuds"], 18000, "🎧"],
    ["Fashion & Clothing", ["Everyday T-shirt", "Classic hoodie", "Denim jacket", "Cotton shirt", "Relaxed trousers", "Knit sweater", "Summer dress", "Linen shorts", "Rain jacket", "Everyday socks"], 8500, "👕"],
    ["Shoes & Sneakers", ["Everyday sneakers", "Running shoes", "Canvas trainers", "Leather loafers", "Walking shoes", "Trail sneakers", "Court shoes", "Slip-on shoes", "Classic sandals", "Ankle boots"], 18000, "👟"],
    ["Watches & Jewellery", ["Smart watch", "Classic wristwatch", "Fitness band", "Leather watch strap", "Silver necklace", "Everyday earrings", "Minimal bracelet", "Pendant necklace", "Ring set", "Watch box"], 14000, "⌚"],
    ["Home Appliances", ["Air fryer", "Electric kettle", "Blender", "Rice cooker", "Toaster", "Microwave oven", "Steam iron", "Food processor", "Vacuum cleaner", "Coffee maker"], 24000, "🏠"],
    ["Furniture & Living", ["Accent chair", "Reading lamp", "Coffee table", "Bookshelf", "Bedside table", "Floor cushion", "Wall mirror", "Desk lamp", "Storage basket", "Side table"], 22000, "🛋️"],
    ["Kitchen & Dining", ["Dinner plate set", "Ceramic mug set", "Chef knife", "Cutting board", "Glass storage jars", "Cookware set", "Water bottle", "Serving bowl", "Kitchen scale", "Table runner"], 6500, "🍽️"],
    ["Beauty & Personal Care", ["Skincare set", "Hair dryer", "Face cleanser", "Electric toothbrush", "Body lotion", "Hair brush", "Travel mirror", "Nail care kit", "Perfume mist", "Face towel set"], 5500, "✨"],
    ["Sports & Fitness", ["Yoga mat", "Dumbbell set", "Resistance bands", "Skipping rope", "Fitness tracker", "Gym duffel bag", "Foam roller", "Training gloves", "Water flask", "Exercise ball"], 7000, "🏋️"],
    ["Outdoor & Travel", ["Travel backpack", "Cabin suitcase", "Packing cubes", "Travel pillow", "Camping lantern", "Insulated flask", "Weekend duffel", "Passport wallet", "Travel adapter", "Compact umbrella"], 12000, "🎒"],
    ["Toys & Games", ["Building blocks", "Board game", "Puzzle set", "Remote-control car", "Card game set", "Plush toy", "Strategy game", "Art activity kit", "Wooden train set", "Mini basketball hoop"], 4500, "🧸"],
    ["Baby & Kids", ["Baby blanket", "Feeding bottle set", "Soft baby toy", "Kids backpack", "Cotton baby clothes", "Baby bath set", "Stroller organiser", "Kids lunch box", "Bedtime lamp", "Baby care kit"], 5000, "🍼"],
    ["Books & Stationery", ["Daily planner", "Hardcover notebook", "Novel collection", "Desk organiser", "Colour pen set", "Sketchbook", "Reading journal", "Sticky note set", "Book stand", "Fountain pen"], 2500, "📚"],
    ["Cameras & Photography", ["Instant camera", "Digital camera", "Camera tripod", "Camera strap", "Memory card", "Photo printer", "Lens cleaning kit", "Compact flash", "Camera pouch", "Portable light"], 10000, "📷"],
    ["Gaming & Consoles", ["Wireless game controller", "Gaming headset", "Mechanical keyboard", "Game storage case", "Controller stand", "Gaming mouse pad", "Console charging dock", "Streaming microphone", "Gaming chair cushion", "Portable game case"], 12000, "🎮"],
    ["Garden & Home Improvement", ["Plant pot set", "Garden tool kit", "Watering can", "Solar garden light", "Wall shelf kit", "Toolbox", "Indoor planter", "Garden gloves", "LED light strip", "Storage hooks"], 4000, "🪴"],
    ["Pet Supplies", ["Pet bed", "Feeding bowl set", "Leash and collar", "Pet carrier bag", "Interactive pet toy", "Grooming brush", "Travel water bottle", "Pet blanket", "Treat container", "Scratch pad"], 3500, "🐾"],
    ["Office & Work Essentials", ["Ergonomic desk chair", "Monitor stand", "Wireless mouse", "Desk organiser", "Notebook set", "USB-C dock", "Task light", "Laptop backpack", "Cable organiser", "Document tray"], 7500, "🖇️"],
];

export const CATEGORIES = CATEGORY_DATA.map(([name, , , icon], categoryIndex) => ({
    id: `category-${categoryIndex + 1}`,
    name,
    icon,
}));

export const PRODUCTS = CATEGORY_DATA.flatMap(([category, names, basePrice], categoryIndex) =>
    names.map((name, itemIndex) => {
        const price = basePrice + itemIndex * Math.max(1000, Math.round(basePrice * 0.13));
        return {
            id: `product-${categoryIndex + 1}-${itemIndex + 1}`,
            categoryId: `category-${categoryIndex + 1}`,
            category,
            name,
            description: `Popular pick · ${category}`,
            price,
            originalPrice: Math.round(price * 1.25 / 100) * 100,
            image: PRODUCT_IMAGE_BY_ID[`product-${categoryIndex + 1}-${itemIndex + 1}`],
        };
    })
);

const APPLE_PHONE_MODELS = [
    ["iPhone 12", 64, 520000], ["iPhone 12", 128, 590000], ["iPhone 12 mini", 64, 390000], ["iPhone 12 Pro", 128, 570000], ["iPhone 12 Pro Max", 128, 650000], ["iPhone 13", 128, 560000], ["iPhone 13 mini", 128, 520000], ["iPhone 13 Pro", 128, 710000], ["iPhone 13 Pro Max", 128, 820000], ["iPhone 14", 128, 690000], ["iPhone 14 Plus", 128, 760000], ["iPhone 14 Pro", 128, 920000], ["iPhone 14 Pro Max", 128, 1050000], ["iPhone 15", 128, 850000], ["iPhone 15 Plus", 128, 950000], ["iPhone 15 Pro", 128, 1150000], ["iPhone 15 Pro Max", 256, 1390000], ["iPhone 16", 128, 1050000], ["iPhone 16 Plus", 128, 1190000], ["iPhone 16 Pro", 128, 1450000], ["iPhone 16 Pro Max", 256, 1690000], ["iPhone 17", 256, 1290000], ["iPhone 17e", 256, 1090000], ["iPhone Air", 256, 1490000], ["iPhone 17 Pro", 256, 1790000], ["iPhone 17 Pro Max", 256, 2050000], ["iPhone Duo", 256, 1590000], ["iPhone 18 Pro", 256, 2190000], ["iPhone 18 Pro Max", 256, 2980000], ["iPhone 18 Pro Max", 512, 3280000], ["iPhone 18 Pro Max", 2048, 5200000],
];

const APPLE_OTHER_PRODUCTS = [
    ["iPad (A16)", "Tablet", 720000], ["iPad mini", "Tablet", 980000], ["iPad Air 11-inch", "Tablet", 1350000], ["iPad Air 13-inch", "Tablet", 1750000], ["iPad Pro 11-inch", "Tablet", 2250000], ["iPad Pro 13-inch", "Tablet", 2850000], ["MacBook Neo", "Laptop", 1350000], ["MacBook Air 13-inch", "Laptop", 2450000], ["MacBook Air 15-inch", "Laptop", 2990000], ["MacBook Pro 14-inch", "Laptop", 3850000], ["MacBook Pro 16-inch", "Laptop", 4950000], ["iMac 24-inch", "Desktop", 3450000], ["Mac mini", "Desktop", 1250000], ["Mac Studio", "Desktop", 4250000], ["Apple Watch SE 3", "Smartwatch", 490000], ["Apple Watch Series 12", "Smartwatch", 820000], ["Apple Watch Ultra 4", "Smartwatch", 1590000], ["AirPods 5", "Earbuds", 260000], ["AirPods 5 with wireless charging", "Earbuds", 360000], ["AirPods Pro 3", "Earbuds", 490000], ["AirPods Max 2", "Headphones", 1050000], ["Apple TV 4K", "Streaming", 320000], ["HomePod mini", "Smart speaker", 290000], ["Apple Pencil Pro", "Accessory", 210000], ["Magic Keyboard", "Accessory", 520000],
];

export const APPLE_PRODUCTS = [
    ...APPLE_PHONE_MODELS.map(([name, storage, price], index) => {
        const productName = `${name} ${storage >= 1024 ? `${storage / 1024}TB` : `${storage}GB`}`;
        const productId = `apple-${name.toLowerCase().replaceAll(" ", "-")}-${storage}-${index}`;
        const observedPrice = (name === "iPhone 12" && storage === 64) || (name === "iPhone 18 Pro Max" && [256, 512, 2048].includes(storage));
        return {
            id: productId,
            categoryId: "apple-products",
            category: "Apple products",
            name: productName,
            description: observedPrice ? "Jumia listing observed 9 Oct 2026 · verify seller and stock" : "Indicative market estimate · verify current seller price",
            price,
            originalPrice: price,
            image: PRODUCT_IMAGE_BY_ID[productId],
            priceEstimate: !observedPrice,
            priceSourceLabel: observedPrice ? "See Jumia listing" : "Estimate · check Jumia listings",
            priceSourceUrl: `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(productName)}`,
        };
    }),
    ...APPLE_OTHER_PRODUCTS.map(([name, type, price], index) => ({
        id: `apple-other-${index + 1}`,
        categoryId: "apple-products",
        category: "Apple products",
        name,
        description: `Apple ${type.toLowerCase()} · illustrative demo estimate`,
        price,
        originalPrice: price,
        image: PRODUCT_IMAGE_BY_ID[`apple-other-${index + 1}`],
        priceEstimate: true,
        priceSourceLabel: "Estimate · check Jumia listings",
        priceSourceUrl: `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(name)}`,
    })),
];

export const ALL_PRODUCTS = [...PRODUCTS, ...APPLE_PRODUCTS];

export const CURRENCIES = {
    NGN: { name: "Nigerian naira", rate: 1, locale: "en-NG", digits: 0 },
    EUR: { name: "Euro", rate: 0.00058, locale: "en-IE", digits: 2 },
    GBP: { name: "British pound", rate: 0.0005, locale: "en-GB", digits: 2 },
    USD: { name: "US dollar", rate: 0.00065, locale: "en-US", digits: 2 },
};

const PROFILE_STORAGE_KEY = "marketpay-demo.profile";
const COOKIE_STORAGE_KEY = "marketpay-demo.cookie-consent";
const SETTINGS_STORAGE_KEY = "marketpay-demo.settings";
const ADDRESS_STORAGE_KEY = "marketpay-demo.addresses";
const CARD_STORAGE_KEY = "marketpay-demo.cards";
const CART_STORAGE_KEY = "marketpay-demo.cart.v1";
const TRANSACTION_STORAGE_KEY = "marketpay-demo.transactions.ngn-v2";
const CUSTOMER_COUNT_STORAGE_KEY = "marketpay-demo.customer-count";

export class TransactionModel {
    constructor(storage = globalThis.localStorage) {
        this.storage = storage;
        this.transactions = this.loadTransactions();
        this.cart = this.loadCart();
    }

    getProfile() {
        const saved = this.storage.getItem(PROFILE_STORAGE_KEY);
        if (saved === null) return null;
        const profile = JSON.parse(saved);
        if (!profile || typeof profile.email !== "string" || typeof profile.phone !== "string") {
            throw new Error("Saved sign-in details have an invalid format.");
        }
        return {
            email: profile.email,
            phone: profile.phone,
            avatar: typeof profile.avatar === "string" ? profile.avatar : "",
            customerNumber: Number.isInteger(profile.customerNumber) ? profile.customerNumber : null,
            joinedAt: typeof profile.joinedAt === "string" ? profile.joinedAt : null,
        };
    }

    saveProfile(email, phone) {
        const normalizedEmail = (email || "").trim().toLowerCase();
        const normalizedPhone = (phone || "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            throw new Error("Enter a valid email address.");
        }
        if (!/^[+()\d\s-]{7,30}$/.test(normalizedPhone) || normalizedPhone.replace(/\D/g, "").length < 7) {
            throw new Error("Enter a valid phone number.");
        }

        const previous = this.getProfile();
        const customerNumber = previous?.customerNumber || this.nextCustomerNumber();
        const profile = {
            ...previous,
            email: normalizedEmail,
            phone: normalizedPhone,
            customerNumber,
            joinedAt: previous?.joinedAt || new Date().toISOString(),
        };
        this.storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
        return this.getProfile();
    }

    updateProfile({ phone, avatar }) {
        const profile = this.getProfile();
        if (!profile) throw new Error("Sign in before editing your profile.");
        const updated = {
            ...profile,
            phone: typeof phone === "string" ? phone.trim() : profile.phone,
            avatar: typeof avatar === "string" ? avatar : profile.avatar,
        };
        this.storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
        return this.getProfile();
    }

    nextCustomerNumber() {
        const saved = Number(this.storage.getItem(CUSTOMER_COUNT_STORAGE_KEY) || "0");
        const nextCount = Number.isFinite(saved) ? saved + 1 : 1;
        this.storage.setItem(CUSTOMER_COUNT_STORAGE_KEY, String(nextCount));
        return nextCount;
    }

    clearProfile() {
        this.storage.removeItem(PROFILE_STORAGE_KEY);
    }

    getCookieConsent() {
        const saved = this.storage.getItem(COOKIE_STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    }

    saveCookieConsent(choice) {
        if (!["all", "essential"].includes(choice)) {
            throw new Error("Choose a valid cookie preference.");
        }
        this.storage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(choice));
    }

    getSettings() {
        const saved = this.storage.getItem(SETTINGS_STORAGE_KEY);
        const defaultSettings = { currency: "NGN", appearance: "system" };
        if (!saved) return defaultSettings;
        try {
            return { ...defaultSettings, ...JSON.parse(saved) };
        } catch {
            return defaultSettings;
        }
    }

    saveSettings(currency, appearance) {
        const validCurrency = ["NGN", "EUR", "GBP", "USD"].includes(currency) ? currency : "NGN";
        const validAppearance = ["system", "light", "dark"].includes(appearance) ? appearance : "system";
        const settings = { currency: validCurrency, appearance: validAppearance };
        this.storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
        return settings;
    }

    getAddresses() {
        const saved = this.storage.getItem(ADDRESS_STORAGE_KEY);
        if (!saved) return [];
        try {
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    saveAddress(address) {
        const addresses = this.getAddresses();
        const cleaned = {
            id: address.id || `address-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,
            recipient: String(address.recipient || "").trim(),
            phone: String(address.phone || "").trim(),
            country: String(address.country || "").trim(),
            state: String(address.state || "").trim(),
            city: String(address.city || "").trim(),
            address: String(address.address || "").trim(),
            postalCode: String(address.postalCode || "").trim(),
        };
        if (!cleaned.recipient || !cleaned.phone || !cleaned.country || !cleaned.address) {
            throw new Error("Complete all required delivery address fields.");
        }
        const next = [...addresses.filter((entry) => entry.id !== cleaned.id), cleaned];
        this.storage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(next));
        return next;
    }

    removeAddress(addressId) {
        const next = this.getAddresses().filter((address) => address.id !== addressId);
        this.storage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(next));
        return next;
    }

    getSavedCards() {
        const saved = this.storage.getItem(CARD_STORAGE_KEY);
        if (!saved) return [];
        try {
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    saveCardLabel(cardNumber) {
        const sanitized = String(cardNumber || "").replace(/\D/g, "");
        if (sanitized.length < 4) {
            throw new Error("Enter a valid demo card number.");
        }
        const brand = sanitized.startsWith("4") ? "Visa" : sanitized.startsWith("5") ? "Mastercard" : "Card";
        const card = { id: `card-${Date.now()}`, brand, last4: sanitized.slice(-4) };
        const cards = this.getSavedCards();
        const next = [...cards, card];
        this.storage.setItem(CARD_STORAGE_KEY, JSON.stringify(next));
        return next;
    }

    loadCart() {
        const saved = this.storage.getItem(CART_STORAGE_KEY);
        if (!saved) return [];
        try {
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    persistCart() {
        this.storage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
    }

    getCart() {
        return this.cart;
    }

    addToCart(productId) {
        const product = ALL_PRODUCTS.find((entry) => entry.id === productId);
        if (!product) throw new Error("That product could not be found.");
        const existing = this.cart.find((entry) => entry.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.persistCart();
        return this.cart;
    }

    setCartQuantity(productId, quantity) {
        if (!Number.isInteger(quantity)) throw new Error("Cart quantity must be a whole number.");
        const item = this.cart.find((entry) => entry.id === productId);
        if (!item) throw new Error("That product is not in your cart.");
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) this.cart = this.cart.filter((entry) => entry.id !== productId);
        this.persistCart();
        return this.cart;
    }

    removeFromCart(productId) {
        const next = this.cart.filter((entry) => entry.id !== productId);
        this.cart = next;
        this.persistCart();
        return this.cart;
    }

    clearCart() {
        this.cart = [];
        this.persistCart();
        return this.cart;
    }

    loadTransactions() {
        const saved = this.storage.getItem(TRANSACTION_STORAGE_KEY);
        if (!saved) return [];
        try {
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    persistTransactions() {
        this.storage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(this.transactions));
    }

    getTransactions() {
        return this.transactions;
    }

    async addTransaction(product, method, status, deliveryAddress = null, reference = "") {
        const amountValue = typeof product === "object" ? product.price : 0;
        const productName = typeof product === "object" ? product.name : String(product);
        const transaction = {
            id: `tx-${Date.now()}`,
            product: productName,
            amount: Number(amountValue) || 0,
            method,
            status,
            createdAt: new Date().toISOString(),
            reference,
            deliveryAddress,
        };
        this.transactions = [transaction, ...this.transactions];
        this.persistTransactions();
        return transaction;
    }
}
