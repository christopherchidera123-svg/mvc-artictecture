import { PRODUCT_IMAGE_BY_ID } from "../data/product-images.js";

const CATEGORY_DATA = [
    [
        "Phones & Tablets",
        [
            "Smartphone", "Android phone", "Tablet", "Mini tablet", "Phone case",
            "Screen protector", "Wireless charger", "Power bank", "USB-C cable",
            "Phone stand",
        ],
        55000,
        "📱",
    ],
    [
        "Computers & Laptops",
        [
            "Laptop", "Ultrabook", "Desktop monitor", "Wireless keyboard",
            "Gaming mouse", "Laptop stand", "USB hub", "Webcam", "Laptop sleeve",
            "Portable SSD",
        ],
        42000,
        "💻",
    ],
    [
        "Audio & Headphones",
        [
            "Wireless headphones", "Bluetooth earbuds", "Studio headset",
            "Portable speaker", "Sound bar", "USB microphone", "Vinyl turntable",
            "Audio adapter", "Speaker stand", "Travel earbuds",
        ],
        18000,
        "🎧",
    ],
    [
        "Fashion & Clothing",
        [
            "Everyday T-shirt", "Classic hoodie", "Denim jacket", "Cotton shirt",
            "Relaxed trousers", "Knit sweater", "Summer dress", "Linen shorts",
            "Rain jacket", "Everyday socks",
        ],
        8500,
        "👕",
    ],
    [
        "Shoes & Sneakers",
        [
            "Everyday sneakers", "Running shoes", "Canvas trainers",
            "Leather loafers", "Walking shoes", "Trail sneakers", "Court shoes",
            "Slip-on shoes", "Classic sandals", "Ankle boots",
        ],
        18000,
        "👟",
    ],
    [
        "Watches & Jewellery",
        [
            "Smart watch", "Classic wristwatch", "Fitness band",
            "Leather watch strap", "Silver necklace", "Everyday earrings",
            "Minimal bracelet", "Pendant necklace", "Ring set", "Watch box",
        ],
        14000,
        "⌚",
    ],
    [
        "Home Appliances",
        [
            "Air fryer", "Electric kettle", "Blender", "Rice cooker", "Toaster",
            "Microwave oven", "Steam iron", "Food processor", "Vacuum cleaner",
            "Coffee maker",
        ],
        24000,
        "🏠",
    ],
    [
        "Furniture & Living",
        [
            "Accent chair", "Reading lamp", "Coffee table", "Bookshelf",
            "Bedside table", "Floor cushion", "Wall mirror", "Desk lamp",
            "Storage basket", "Side table",
        ],
        22000,
        "🛋️",
    ],
    [
        "Kitchen & Dining",
        [
            "Dinner plate set", "Ceramic mug set", "Chef knife", "Cutting board",
            "Glass storage jars", "Cookware set", "Water bottle", "Serving bowl",
            "Kitchen scale", "Table runner",
        ],
        6500,
        "🍽️",
    ],
    [
        "Beauty & Personal Care",
        [
            "Skincare set", "Hair dryer", "Face cleanser", "Electric toothbrush",
            "Body lotion", "Hair brush", "Travel mirror", "Nail care kit",
            "Perfume mist", "Face towel set",
        ],
        5500,
        "✨",
    ],
    [
        "Sports & Fitness",
        [
            "Yoga mat", "Dumbbell set", "Resistance bands", "Skipping rope",
            "Fitness tracker", "Gym duffel bag", "Foam roller", "Training gloves",
            "Water flask", "Exercise ball",
        ],
        7000,
        "🏋️",
    ],
    [
        "Outdoor & Travel",
        [
            "Travel backpack", "Cabin suitcase", "Packing cubes", "Travel pillow",
            "Camping lantern", "Insulated flask", "Weekend duffel",
            "Passport wallet", "Travel adapter", "Compact umbrella",
        ],
        12000,
        "🎒",
    ],
    [
        "Toys & Games",
        [
            "Building blocks", "Board game", "Puzzle set", "Remote-control car",
            "Card game set", "Plush toy", "Strategy game", "Art activity kit",
            "Wooden train set", "Mini basketball hoop",
        ],
        4500,
        "🧸",
    ],
    [
        "Baby & Kids",
        [
            "Baby blanket", "Feeding bottle set", "Soft baby toy", "Kids backpack",
            "Cotton baby clothes", "Baby bath set", "Stroller organiser",
            "Kids lunch box", "Bedtime lamp", "Baby care kit",
        ],
        5000,
        "🍼",
    ],
    [
        "Books & Stationery",
        [
            "Daily planner", "Hardcover notebook", "Novel collection",
            "Desk organiser", "Colour pen set", "Sketchbook", "Reading journal",
            "Sticky note set", "Book stand", "Fountain pen",
        ],
        2500,
        "📚",
    ],
    [
        "Cameras & Photography",
        [
            "Instant camera", "Digital camera", "Camera tripod", "Camera strap",
            "Memory card", "Photo printer", "Lens cleaning kit", "Compact flash",
            "Camera pouch", "Portable light",
        ],
        10000,
        "📷",
    ],
    [
        "Gaming & Consoles",
        [
            "Wireless game controller", "Gaming headset", "Mechanical keyboard",
            "Game storage case", "Controller stand", "Gaming mouse pad",
            "Console charging dock", "Streaming microphone",
            "Gaming chair cushion", "Portable game case",
        ],
        12000,
        "🎮",
    ],
    [
        "Garden & Home Improvement",
        [
            "Plant pot set", "Garden tool kit", "Watering can",
            "Solar garden light", "Wall shelf kit", "Toolbox", "Indoor planter",
            "Garden gloves", "LED light strip", "Storage hooks",
        ],
        4000,
        "🪴",
    ],
    [
        "Pet Supplies",
        [
            "Pet bed", "Feeding bowl set", "Leash and collar", "Pet carrier bag",
            "Interactive pet toy", "Grooming brush", "Travel water bottle",
            "Pet blanket", "Treat container", "Scratch pad",
        ],
        3500,
        "🐾",
    ],
    [
        "Office & Work Essentials",
        [
            "Ergonomic desk chair", "Monitor stand", "Wireless mouse",
            "Desk organiser", "Notebook set", "USB-C dock", "Task light",
            "Laptop backpack", "Cable organiser", "Document tray",
        ],
        7500,
        "🖇️",
    ],
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
    ["iPhone 12", 64, 520000],
    ["iPhone 12", 128, 590000],
    ["iPhone 12 mini", 64, 390000],
    ["iPhone 12 Pro", 128, 570000],
    ["iPhone 12 Pro Max", 128, 650000],
    ["iPhone 13", 128, 560000],
    ["iPhone 13 mini", 128, 520000],
    ["iPhone 13 Pro", 128, 710000],
    ["iPhone 13 Pro Max", 128, 820000],
    ["iPhone 14", 128, 690000],
    ["iPhone 14 Plus", 128, 760000],
    ["iPhone 14 Pro", 128, 920000],
    ["iPhone 14 Pro Max", 128, 1050000],
    ["iPhone 15", 128, 850000],
    ["iPhone 15 Plus", 128, 950000],
    ["iPhone 15 Pro", 128, 1150000],
    ["iPhone 15 Pro Max", 256, 1390000],
    ["iPhone 16", 128, 1050000],
    ["iPhone 16 Plus", 128, 1190000],
    ["iPhone 16 Pro", 128, 1450000],
    ["iPhone 16 Pro Max", 256, 1690000],
    ["iPhone 17", 256, 1290000],
    ["iPhone 17e", 256, 1090000],
    ["iPhone Air", 256, 1490000],
    ["iPhone 17 Pro", 256, 1790000],
    ["iPhone 17 Pro Max", 256, 2050000],
    ["iPhone Duo", 256, 1590000],
    ["iPhone 18 Pro", 256, 2190000],
    ["iPhone 18 Pro Max", 256, 2980000],
    ["iPhone 18 Pro Max", 512, 3280000],
    ["iPhone 18 Pro Max", 2048, 5200000],
];

const APPLE_OTHER_PRODUCTS = [
    ["iPad (A16)", "Tablet", 720000],
    ["iPad mini", "Tablet", 980000],
    ["iPad Air 11-inch", "Tablet", 1350000],
    ["iPad Air 13-inch", "Tablet", 1750000],
    ["iPad Pro 11-inch", "Tablet", 2250000],
    ["iPad Pro 13-inch", "Tablet", 2850000],
    ["MacBook Neo", "Laptop", 1350000],
    ["MacBook Air 13-inch", "Laptop", 2450000],
    ["MacBook Air 15-inch", "Laptop", 2990000],
    ["MacBook Pro 14-inch", "Laptop", 3850000],
    ["MacBook Pro 16-inch", "Laptop", 4950000],
    ["iMac 24-inch", "Desktop", 3450000],
    ["Mac mini", "Desktop", 1250000],
    ["Mac Studio", "Desktop", 4250000],
    ["Apple Watch SE 3", "Smartwatch", 490000],
    ["Apple Watch Series 12", "Smartwatch", 820000],
    ["Apple Watch Ultra 4", "Smartwatch", 1590000],
    ["AirPods 5", "Earbuds", 260000],
    ["AirPods 5 with wireless charging", "Earbuds", 360000],
    ["AirPods Pro 3", "Earbuds", 490000],
    ["AirPods Max 2", "Headphones", 1050000],
    ["Apple TV 4K", "Streaming", 320000],
    ["HomePod mini", "Smart speaker", 290000],
    ["Apple Pencil Pro", "Accessory", 210000],
    ["Magic Keyboard", "Accessory", 520000],
];

export const APPLE_PRODUCTS = [
    ...APPLE_PHONE_MODELS.map(([name, storage, price], index) => {
        const productName = `${name} ${storage >= 1024 ? `${storage / 1024}TB` : `${storage}GB`}`;
        const productId = `apple-${name.toLowerCase().replaceAll(" ", "-")}-${storage}-${index}`;
        const observedPrice =
            (name === "iPhone 12" && storage === 64) ||
            (name === "iPhone 18 Pro Max" && [256, 512, 2048].includes(storage));

        return {
            id: productId,
            categoryId: "apple-products",
            category: "Apple products",
            name: productName,
            description: observedPrice
                ? "Jumia listing observed 9 Oct 2026 · verify seller and stock"
                : "Indicative market estimate · verify current seller price",
            price,
            originalPrice: price,
            image: PRODUCT_IMAGE_BY_ID[productId],
            priceEstimate: !observedPrice,
            priceSourceLabel: observedPrice
                ? "See Jumia listing"
                : "Estimate · check Jumia listings",
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

const STORAGE_KEY = "marketpay-demo.transactions.ngn-v2";
const CART_STORAGE_KEY = "marketpay-demo.cart.v1";
const PROFILE_STORAGE_KEY = "marketpay-demo.profile";
const COOKIE_CONSENT_STORAGE_KEY = "marketpay-demo.cookie-consent";
const SETTINGS_STORAGE_KEY = "marketpay-demo.settings";
const ADDRESS_STORAGE_KEY = "marketpay-demo.addresses";
const CARD_STORAGE_KEY = "marketpay-demo.cards";
const CUSTOMER_COUNT_STORAGE_KEY = "marketpay-demo.customer-count";

export const CURRENCIES = {
    NGN: { name: "Nigerian naira", rate: 1, locale: "en-NG", digits: 0 },
    EUR: { name: "Euro", rate: 0.00058, locale: "en-IE", digits: 2 },
    GBP: { name: "British pound", rate: 0.0005, locale: "en-GB", digits: 2 },
    USD: { name: "US dollar", rate: 0.00065, locale: "en-US", digits: 2 },
};

const TRACKING_STAGES = [
    ["Order confirmed", "We received your order and are preparing it for dispatch.", 0],
    ["Packed at our warehouse", "Your items have been checked and packed for shipment.", 3],
    ["Dispatched from warehouse", "Your parcel is on its way to the export airport.", 8],
    ["Arrived at airport", "Your parcel has arrived at the airport for its outbound journey.", 20],
    ["Cleared for delivery", "The parcel has completed transit checks and is moving to your local hub.", 48],
    ["Out for delivery", "A delivery partner is bringing your parcel to the address provided.", 72],
    ["Delivered", "Your parcel has been delivered. Thank you for shopping with us.", 96],
];

function createTracking(createdAt) {
    const orderTime = new Date(createdAt).getTime();
    return {
        events: TRACKING_STAGES.map(([title, description, hoursAfterOrder]) => ({
            title,
            description,
            scheduledAt: new Date(orderTime + hoursAfterOrder * 60 * 60 * 1000).toISOString(),
        })),
    };
}

const DEMO_TRANSACTIONS = [
    { id: "demo-1001", product: "Everyday sneakers", amount: 64500, method: "Card", status: "successful", createdAt: "2026-10-07T14:20:00.000Z" },
    { id: "demo-1002", product: "Smart watch", amount: 119000, method: "PayPal", status: "failed", createdAt: "2026-10-06T10:15:00.000Z" },
    { id: "demo-1003", product: "Studio wireless headphones", amount: 89990, method: "Bank transfer", status: "successful", createdAt: "2026-10-04T16:40:00.000Z" },
].map((transaction) => transaction.status === "successful"
    ? { ...transaction, tracking: createTracking(transaction.createdAt) }
    : transaction);

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
        if (
            profile === null ||
            typeof profile !== "object" ||
            typeof profile.email !== "string" ||
            typeof profile.phone !== "string"
        ) {
            throw new Error("Saved sign-in details have an invalid format.");
        }
        return {
            email: profile.email,
            phone: profile.phone,
            avatar: typeof profile.avatar === "string" ? profile.avatar : "",
            customerNumber: Number.isInteger(profile.customerNumber)
                ? profile.customerNumber
                : null,
            joinedAt: typeof profile.joinedAt === "string" ? profile.joinedAt : null,
        };
    }

    saveProfile(email, phone) {
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();
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

    nextCustomerNumber() {
        const savedCount = Number(this.storage.getItem(CUSTOMER_COUNT_STORAGE_KEY) || "0");
        const nextCount = Number.isInteger(savedCount) && savedCount >= 0
            ? savedCount + 1
            : 1;
        this.storage.setItem(CUSTOMER_COUNT_STORAGE_KEY, String(nextCount));
        return nextCount;
    }

    updateProfile({ phone, avatar }) {
        const profile = this.getProfile();
        if (!profile) throw new Error("Sign in before editing your profile.");
        if (typeof phone === "string") {
            const normalizedPhone = phone.trim();
            if (!/^[+()\d\s-]{7,30}$/.test(normalizedPhone) ||
                normalizedPhone.replace(/\D/g, "").length < 7) {
                throw new Error("Enter a valid phone number.");
            }
            profile.phone = normalizedPhone;
        }
        if (typeof avatar === "string") profile.avatar = avatar;
        this.storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
        return profile;
    }

    getSettings() {
        const saved = this.storage.getItem(SETTINGS_STORAGE_KEY);
        if (saved === null) return { currency: "NGN", appearance: "system" };
        const settings = JSON.parse(saved);
        if (
            settings === null ||
            typeof settings !== "object" ||
            !Object.hasOwn(CURRENCIES, settings.currency) ||
            !["system", "light", "dark"].includes(settings.appearance)
        ) {
            throw new Error("Saved settings have an invalid format.");
        }
        return { currency: settings.currency, appearance: settings.appearance };
    }

    saveSettings(settings) {
        if (
            !settings ||
            !Object.hasOwn(CURRENCIES, settings.currency) ||
            !["system", "light", "dark"].includes(settings.appearance)
        ) {
            throw new Error("Choose a valid currency and appearance setting.");
        }
        const updated = { currency: settings.currency, appearance: settings.appearance };
        this.storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
        return updated;
    }

    getAddresses() {
        const saved = this.storage.getItem(ADDRESS_STORAGE_KEY);
        if (saved === null) return [];
        const addresses = JSON.parse(saved);
        if (
            !Array.isArray(addresses) ||
            !addresses.every((address) =>
                address &&
                typeof address.id === "string" &&
                ["recipient", "phone", "country", "state", "city", "address"]
                    .every((field) => typeof address[field] === "string")
            )
        ) {
            throw new Error("Saved delivery addresses have an invalid format.");
        }
        return addresses.map((address) => ({ ...address }));
    }

    saveAddress(address) {
        if (
            !address ||
            !["recipient", "phone", "country", "state", "city", "address"]
                .every((field) => typeof address[field] === "string" && address[field].trim())
        ) {
            throw new Error("Complete all required delivery address fields.");
        }
        const addresses = this.getAddresses();
        const savedAddress = {
            ...address,
            id: address.id || this.createId(),
            postalCode: typeof address.postalCode === "string" ? address.postalCode : "",
        };
        const updated = [
            savedAddress,
            ...addresses.filter((item) => item.id !== savedAddress.id),
        ];
        this.storage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(updated));
        return updated.map((item) => ({ ...item }));
    }

    removeAddress(addressId) {
        const updated = this.getAddresses().filter((address) => address.id !== addressId);
        this.storage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(updated));
        return updated;
    }

    getSavedCards() {
        const saved = this.storage.getItem(CARD_STORAGE_KEY);
        if (saved === null) return [];
        const cards = JSON.parse(saved);
        if (
            !Array.isArray(cards) ||
            !cards.every((card) =>
                card &&
                typeof card.id === "string" &&
                typeof card.brand === "string" &&
                /^\d{4}$/.test(card.last4)
            )
        ) {
            throw new Error("Saved card labels have an invalid format.");
        }
        return cards.map((card) => ({ ...card }));
    }

    saveCardLabel(cardNumber) {
        if (typeof cardNumber !== "string") {
            throw new Error("Enter a valid demo card number.");
        }
        const digits = cardNumber.replace(/\D/g, "");
        if (digits.length < 12 || digits.length > 19) {
            throw new Error("Enter a valid demo card number.");
        }
        const brand = digits.startsWith("4")
            ? "Visa"
            : /^5[1-5]/.test(digits)
                ? "Mastercard"
                : /^3[47]/.test(digits)
                    ? "American Express"
                    : "Card";
        const cards = this.getSavedCards();
        const card = { id: this.createId(), brand, last4: digits.slice(-4) };
        this.storage.setItem(CARD_STORAGE_KEY, JSON.stringify([card, ...cards]));
        return { ...card };
    }

    clearProfile() {
        this.storage.removeItem(PROFILE_STORAGE_KEY);
    }

    getCookieConsent() {
        const consent = this.storage.getItem(COOKIE_CONSENT_STORAGE_KEY);
        return consent === "all" || consent === "essential" ? consent : null;
    }

    saveCookieConsent(consent) {
        if (consent !== "all" && consent !== "essential") {
            throw new Error("Choose a valid cookie preference.");
        }
        this.storage.setItem(COOKIE_CONSENT_STORAGE_KEY, consent);
    }

    getCart() {
        return this.cart.map((item) => ({
            ...ALL_PRODUCTS.find((product) => product.id === item.productId),
            quantity: item.quantity,
        }));
    }

    addToCart(productId) {
        if (!ALL_PRODUCTS.some((product) => product.id === productId)) {
            throw new Error("That product could not be found.");
        }
        const item = this.cart.find((entry) => entry.productId === productId);
        const updated = item
            ? this.cart.map((entry) => entry.productId === productId
                ? { ...entry, quantity: entry.quantity + 1 }
                : entry)
            : [...this.cart, { productId, quantity: 1 }];
        this.saveCart(updated);
        return this.getCart();
    }

    setCartQuantity(productId, quantity) {
        if (!Number.isInteger(quantity) || quantity < 0) {
            throw new Error("Cart quantity must be a whole number.");
        }
        if (quantity === 0) {
            this.removeFromCart(productId);
            return this.getCart();
        }
        if (!this.cart.some((entry) => entry.productId === productId)) {
            throw new Error("That product is not in your cart.");
        }
        this.saveCart(this.cart.map((entry) =>
            entry.productId === productId ? { ...entry, quantity } : entry
        ));
        return this.getCart();
    }

    removeFromCart(productId) {
        this.saveCart(this.cart.filter((entry) => entry.productId !== productId));
        return this.getCart();
    }

    clearCart() {
        this.saveCart([]);
    }

    loadCart() {
        const saved = this.storage.getItem(CART_STORAGE_KEY);
        if (saved === null) return [];
        const cart = JSON.parse(saved);
        if (
            !Array.isArray(cart) ||
            !cart.every((item) =>
                item !== null &&
                typeof item.productId === "string" &&
                ALL_PRODUCTS.some((product) => product.id === item.productId) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0
            )
        ) {
            throw new Error("Saved cart has an invalid format.");
        }
        return cart;
    }

    saveCart(cart) {
        this.storage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        this.cart = cart;
    }

    async getTransactions() {
        return this.transactions.map((transaction) => ({
            ...transaction,
            items: transaction.items?.map((item) => ({ ...item })),
            deliveryAddress: transaction.deliveryAddress
                ? { ...transaction.deliveryAddress }
                : undefined,
            tracking: transaction.tracking
                ? { events: transaction.tracking.events.map((event) => ({ ...event })) }
                : undefined,
        }));
    }

    async addTransaction(product, method, status, deliveryAddress, reference) {
        if (!product || !method || !["successful", "failed"].includes(status)) {
            throw new Error("Choose a product and payment method before checking out.");
        }
        if (
            !deliveryAddress ||
            !["recipient", "phone", "country", "state", "city", "address"].every(
                (field) =>
                    typeof deliveryAddress[field] === "string" &&
                    deliveryAddress[field].trim()
            )
        ) {
            throw new Error("Complete the delivery details before saving this transaction.");
        }

        const transaction = {
            id: this.createId(),
            reference: reference || `MP-${Date.now().toString().slice(-8)}`,
            product: product.name,
            amount: product.price,
            items: Array.isArray(product.items)
                ? product.items.map((item) => ({ ...item }))
                : undefined,
            method,
            status,
            createdAt: new Date().toISOString(),
            deliveryAddress: { ...deliveryAddress },
            tracking: status === "successful" ? createTracking(new Date().toISOString()) : undefined,
        };
        this.saveTransactions([transaction, ...this.transactions]);
        return {
            ...transaction,
            items: transaction.items?.map((item) => ({ ...item })),
            deliveryAddress: { ...transaction.deliveryAddress },
            tracking: transaction.tracking
                ? { events: transaction.tracking.events.map((event) => ({ ...event })) }
                : undefined,
        };
    }

    loadTransactions() {
        const saved = this.storage.getItem(STORAGE_KEY);
        if (saved === null) {
            const transactions = DEMO_TRANSACTIONS.map((transaction) => ({ ...transaction }));
            this.storage.setItem(STORAGE_KEY, JSON.stringify(transactions));
            return transactions;
        }

        const transactions = JSON.parse(saved);
        if (
            !Array.isArray(transactions) ||
            !transactions.every(
                (transaction) =>
                    transaction !== null &&
                    typeof transaction.id === "string" &&
                    typeof transaction.product === "string" &&
                    typeof transaction.amount === "number" &&
                    typeof transaction.method === "string" &&
                    ["successful", "failed"].includes(transaction.status) &&
                    typeof transaction.createdAt === "string" &&
                    (transaction.items === undefined ||
                        (Array.isArray(transaction.items) &&
                            transaction.items.every((item) =>
                                item !== null &&
                                typeof item.id === "string" &&
                                typeof item.name === "string" &&
                                typeof item.price === "number" &&
                                Number.isInteger(item.quantity) &&
                                item.quantity > 0
                            ))) &&
                    (transaction.deliveryAddress === undefined ||
                        (transaction.deliveryAddress !== null &&
                            typeof transaction.deliveryAddress === "object" &&
                            !Array.isArray(transaction.deliveryAddress))) &&
                    (transaction.tracking === undefined ||
                        (transaction.tracking &&
                            Array.isArray(transaction.tracking.events) &&
                            transaction.tracking.events.every((event) =>
                                event &&
                                typeof event.title === "string" &&
                                typeof event.description === "string" &&
                                typeof event.scheduledAt === "string"
                            )))
            )
        ) {
            throw new Error("Saved transaction history has an invalid format.");
        }
        const migrated = transactions.map((transaction) =>
            transaction.status === "successful" && transaction.tracking === undefined
                ? { ...transaction, tracking: createTracking(transaction.createdAt) }
                : transaction
        );
        if (migrated.some((transaction, index) => transaction !== transactions[index])) {
            this.storage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        }
        return migrated;
    }

    saveTransactions(transactions) {
        this.storage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        this.transactions = transactions;
    }

    createId() {
        if (globalThis.crypto?.randomUUID) {
            return globalThis.crypto.randomUUID();
        }
        return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
}
