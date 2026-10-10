import {
    APPLE_PRODUCTS,
    CURRENCIES,
    CATEGORIES,
    PRODUCTS,
} from "../models/transaction-model.js";
import { createQrMatrix } from "../utils/qr-code.js";

const PAYMENT_METHODS = [
    { id: "bank", name: "Bank transfer", icon: "↗" },
    { id: "card", name: "Card", icon: "▰" },
    { id: "paypal", name: "PayPal", logo: "https://cdn.simpleicons.org/paypal/003087" },
    { id: "apple", name: "Apple Pay", logo: "https://cdn.simpleicons.org/applepay/000000" },
];

const ICON_MARKUP = {
    search: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m16 16 4 4"></path>
        </svg>
    `,
    account: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
        </svg>
    `,
    settings: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12"></path>
            <path d="M16.95 16.95l2.12 2.12M2 12h3M19 12h3"></path>
            <path d="M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"></path>
        </svg>
    `,
    history: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8"></path>
            <path d="M3 3v5h5M12 7v5l3 2"></path>
        </svg>
    `,
    cart: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6"></path>
            <path d="m18 16.8 2-1.6L21 8H6"></path>
            <circle cx="10" cy="20" r="1"></circle>
            <circle cx="18" cy="20" r="1"></circle>
        </svg>
    `,
    add: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 5v14M5 12h14"></path>
        </svg>
    `,
};

export class TransactionView {
    constructor() {
        this.signInPage = document.querySelector("#signin-page");
        this.signInForm = document.querySelector("#signin-form");
        this.signInMessage = document.querySelector("#signin-message");
        this.marketApp = document.querySelector("#market-app");
        this.cookieNotice = document.querySelector("#cookie-notice");
        this.cookieAcceptButton = document.querySelector("#cookie-accept");
        this.cookieEssentialButton = document.querySelector("#cookie-essential");
        this.catalogSections = document.querySelector("#catalog-sections");
        this.categoryChips = document.querySelector("#category-chips");
        this.catalogSearch = document.querySelector("#catalog-search");
        this.clearSearchButton = document.querySelector("#clear-search");
        this.catalogMessage = document.querySelector("#catalog-message");
        this.cartButton = document.querySelector("#cart-button");
        this.cartCount = document.querySelector("#cart-count");
        this.cartPage = document.querySelector("#cart-page");
        this.cartItems = document.querySelector("#cart-items");
        this.cartHeading = document.querySelector("#cart-heading");
        this.cartSubtitle = document.querySelector("#cart-subtitle");
        this.cartItemTotal = document.querySelector("#cart-item-total");
        this.cartSavings = document.querySelector("#cart-savings");
        this.cartTotal = document.querySelector("#cart-total");
        this.cartMessage = document.querySelector("#cart-message");
        this.proceedPaymentButton = document.querySelector("#proceed-payment");
        this.paymentPage = document.querySelector("#payment-page");
        this.paymentOrderItems = document.querySelector("#payment-order-items");
        this.paymentOrderTotal = document.querySelector("#payment-order-total");
        this.accountButton = document.querySelector("#account-button");
        this.signOutButton = document.querySelector("#signout-button");
        this.settingsButton = document.querySelector("#settings-button");
        this.cookieSettingsButton = document.querySelector("#cookie-settings-button");
        this.profilePage = document.querySelector("#profile-page");
        this.profileForm = document.querySelector("#profile-form");
        this.profilePhone = document.querySelector("#profile-phone");
        this.profileEmail = document.querySelector("#profile-email");
        this.profileAvatarInput = document.querySelector("#profile-avatar-input");
        this.profileAvatar = document.querySelector("#profile-avatar");
        this.profileAvatarPlaceholder = document.querySelector("#profile-avatar-placeholder");
        this.profileBadge = document.querySelector("#profile-badge");
        this.profileMessage = document.querySelector("#profile-message");
        this.profileAddressForm = document.querySelector("#profile-address-form");
        this.profileAddressList = document.querySelector("#profile-address-list");
        this.profileAddAddressButton = document.querySelector("#profile-add-address");
        this.profileAddressMessage = document.querySelector("#profile-address-message");
        this.profileCardForm = document.querySelector("#profile-card-form");
        this.profileCardList = document.querySelector("#profile-card-list");
        this.profileAddCardButton = document.querySelector("#profile-add-card");
        this.profileCardMessage = document.querySelector("#profile-card-message");
        this.profileOrderList = document.querySelector("#profile-order-list");
        this.profileHistoryButton = document.querySelector("#profile-history-button");
        this.settingsPage = document.querySelector("#settings-page");
        this.currencySelect = document.querySelector("#currency-select");
        this.appearanceSelect = document.querySelector("#appearance-select");
        this.settingsMessage = document.querySelector("#settings-message");
        this.themeQuickToggle = document.querySelector("#theme-quick-toggle");
        this.deliveryAddressSelect = document.querySelector("#delivery-saved-address");
        this.deliverySaveAddress = document.querySelector("#delivery-save-address");
        this.trackingOverlay = document.querySelector("#tracking-overlay");
        this.trackingTitle = document.querySelector("#tracking-title");
        this.trackingReference = document.querySelector("#tracking-reference");
        this.trackingProgressFill = document.querySelector("#tracking-progress-fill");
        this.trackingStage = document.querySelector("#tracking-stage");
        this.trackingTimeline = document.querySelector("#tracking-timeline");
        this.trackingPrevious = document.querySelector("#tracking-previous");
        this.trackingNext = document.querySelector("#tracking-next");
        this.trackingTransaction = null;
        this.trackingStageIndex = 0;
        this.currentAddresses = [];
        this.currentCards = [];
        this.currentTransactions = [];
        this.currentProfile = null;
        this.currency = "NGN";
        this.appearance = "system";
        this.systemDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
        this.heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
        this.heroDots = document.querySelector("#hero-dots");
        this.heroCurrent = document.querySelector("#hero-current");
        this.activeHeroSlide = 0;
        this.heroTimer = null;
        this.paymentMethods = document.querySelector("#payment-methods");
        this.paymentDetails = document.querySelector("#payment-details");
        this.checkoutButton = document.querySelector("#checkout-button");
        this.checkoutTotal = document.querySelector("#checkout-total");
        this.checkoutPanel = document.querySelector("#checkout-panel");
        this.transactionList = document.querySelector("#transaction-list");
        this.historyPageCount = document.querySelector("#history-page-count");
        this.historyMessage = document.querySelector("#history-message");
        this.historyButton = document.querySelector("#history-button");
        this.shopPage = document.querySelector("#shop-page");
        this.authorizationPage = document.querySelector("#authorization-page");
        this.deliveryPage = document.querySelector("#delivery-page");
        this.deliveryForm = document.querySelector("#delivery-form");
        this.deliveryProduct = document.querySelector("#delivery-product");
        this.deliveryMethod = document.querySelector("#delivery-method");
        this.deliveryTotal = document.querySelector("#delivery-total");
        this.deliveryMessage = document.querySelector("#delivery-message");
        this.verificationPage = document.querySelector("#verification-page");
        this.historyPage = document.querySelector("#history-page");
        this.currentCart = [];
        this.confirmTransferButton = document.querySelector("#confirm-transfer-button");
        this.verificationSpinner = document.querySelector("#verification-spinner");
        this.verificationCheck = document.querySelector("#verification-check");
        this.verificationTitle = document.querySelector("#verification-title");
        this.verificationCopy = document.querySelector("#verification-copy");
        this.receiptOverlay = document.querySelector("#receipt-overlay");
        this.receiptStatus = document.querySelector("#receipt-status");
        this.receiptDetails = document.querySelector("#receipt-details");
        this.message = document.querySelector("#app-message");
        this.selectedMethod = "bank";
        this.renderIcons();
        this.renderCatalog();
        this.renderHeroDots();
        this.renderPaymentMethods();
        this.renderPaymentDetails();
        this.applyAppearance("system");
    }

    renderIcons() {
        this.setIcon(this.catalogSearch.previousElementSibling, "search", "#586176", "search");
        this.setIcon(this.accountButton.querySelector(".icon"), "user-round", "#586176", "account");
        this.setIcon(this.settingsButton.querySelector(".icon"), "settings", "#586176", "settings");
        this.setIcon(this.historyButton.querySelector(".icon"), "history", "#586176", "history");
        this.setIcon(this.cartButton.querySelector(".icon"), "shopping-cart", "#11755d", "cart");
    }

    setIcon(container, name, color, fallbackName) {
        const image = document.createElement("img");
        image.src = `https://api.iconify.design/lucide/${name}.svg?color=%23${color.slice(1)}`;
        image.alt = "";
        image.addEventListener("error", () => {
            container.innerHTML = ICON_MARKUP[fallbackName];
        }, { once: true });
        container.replaceChildren(image);
    }

    bindActions({
        onSignIn,
        onCookieConsent,
        onCheckout,
        onComplete,
        onConfirmTransfer,
        onDeliveryComplete,
        onHistory,
        onBack,
        onReceipt,
        onAddToCart,
        onCartQuantity,
        onRemoveFromCart,
        onProceedPayment,
        onSignOut,
        onCategory,
        onProfile,
        onSettings,
        onSaveProfile,
        onSaveAddress,
        onRemoveAddress,
        onSaveCard,
        onSaveSettings,
    }) {
        this.signInForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(this.signInForm);
            onSignIn(
                String(formData.get("email") || ""),
                String(formData.get("phone") || "")
            );
        });
        this.cookieAcceptButton.addEventListener("click", () => onCookieConsent("all"));
        this.cookieEssentialButton.addEventListener("click", () => onCookieConsent("essential"));

        this.catalogSections.addEventListener("click", (event) => {
            const button = event.target.closest("[data-add-product]");
            if (button) onAddToCart(button.dataset.addProduct, button);
        });
        this.catalogSearch.addEventListener("input", () => {
            const query = this.catalogSearch.value.trim();
            this.clearSearchButton.hidden = !query;
            this.renderCatalog(query);
        });
        this.clearSearchButton.addEventListener("click", () => {
            this.catalogSearch.value = "";
            this.clearSearchButton.hidden = true;
            this.renderCatalog();
        });
        this.categoryChips.addEventListener("click", (event) => {
            const button = event.target.closest("[data-category-target]");
            if (!button) return;
            onCategory(button.dataset.categoryTarget);
        });
        this.heroDots.addEventListener("click", (event) => {
            const button = event.target.closest("[data-hero-target]");
            if (button) this.showHeroSlide(Number(button.dataset.heroTarget));
        });
        this.shopPage.addEventListener("click", (event) => {
            const button = event.target.closest("[data-shop-category]");
            if (button) onCategory(button.dataset.shopCategory);
        });

        this.cartButton.addEventListener("click", () => this.showCart());
        this.cartItems.addEventListener("click", (event) => {
            const change = event.target.closest("[data-cart-change]");
            if (change) {
                const item = this.currentCart.find((entry) => entry.id === change.dataset.productId);
                if (item) onCartQuantity(item.id, item.quantity + Number(change.dataset.cartChange));
                return;
            }
            const remove = event.target.closest("[data-cart-remove]");
            if (remove) onRemoveFromCart(remove.dataset.productId);
        });
        this.proceedPaymentButton.addEventListener("click", onProceedPayment);
        this.paymentPage.addEventListener("click", (event) => {
            if (event.target.closest("[data-back-to-cart]")) this.showCart();
        });
        this.cartPage.addEventListener("click", (event) => {
            if (event.target.closest("[data-back-to-shop]")) this.showShop();
        });
        this.signOutButton.addEventListener("click", onSignOut);
        this.cookieSettingsButton.addEventListener("click", () => this.showCookieNotice());

        this.paymentMethods.addEventListener("change", (event) => {
            const input = event.target.closest("[data-method-id]");
            if (!input) return;
            this.selectedMethod = input.dataset.methodId;
            this.renderPaymentMethods();
            this.renderPaymentDetails();
            this.hideCheckout();
            this.showMessage("");
        });
        this.paymentDetails.addEventListener("change", (event) => {
            if (event.target.matches("#saved-card-select")) {
                this.paymentDetails.querySelector(".card-fields-entry").hidden =
                    Boolean(event.target.value);
            }
        });

        this.checkoutButton.addEventListener("click", () => {
            if (!this.validatePaymentDetails()) return;
            onCheckout(this.getCheckoutSelection());
        });

        this.checkoutPanel.addEventListener("click", (event) => {
            const button = event.target.closest("[data-outcome]");
            if (button) onComplete(button.dataset.outcome);
        });

        this.authorizationPage.addEventListener("click", (event) => {
            if (event.target.closest("#confirm-transfer-button")) onConfirmTransfer();
            if (event.target.closest("[data-back-to-shop]")) onBack();
        });

        this.deliveryPage.addEventListener("click", (event) => {
            if (event.target.closest("[data-back-to-shop]")) onBack();
        });
        this.deliveryAddressSelect.addEventListener("change", () => {
            this.fillDeliveryAddress(this.deliveryAddressSelect.value);
        });
        this.deliveryForm.addEventListener("submit", (event) => {
            event.preventDefault();
            onDeliveryComplete(this.getDeliveryAddress());
        });

        this.historyButton.addEventListener("click", onHistory);
        this.accountButton.addEventListener("click", onProfile);
        this.settingsButton.addEventListener("click", onSettings);
        this.profileHistoryButton.addEventListener("click", onHistory);
        this.profileAddAddressButton.addEventListener("click", () => {
            this.profileAddressForm.hidden = !this.profileAddressForm.hidden;
            if (!this.profileAddressForm.hidden) {
                this.profileAddressForm.querySelector("input")?.focus();
            }
        });
        this.profileAddCardButton.addEventListener("click", () => {
            this.profileCardForm.hidden = !this.profileCardForm.hidden;
            if (!this.profileCardForm.hidden) {
                this.profileCardForm.querySelector("input")?.focus();
            }
        });
        this.profileForm.addEventListener("submit", (event) => {
            event.preventDefault();
            onSaveProfile(this.profilePhone.value);
        });
        this.profileAvatarInput.addEventListener("change", () => {
            const file = this.profileAvatarInput.files?.[0];
            if (!file) return;
            if (!file.type.startsWith("image/") || file.size > 1024 * 1024) {
                this.profileMessage.textContent = "Choose an image smaller than 1 MB.";
                this.profileAvatarInput.value = "";
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (typeof reader.result !== "string") {
                    this.profileMessage.textContent = "Could not read that profile image.";
                    return;
                }
                onSaveProfile(this.profilePhone.value, reader.result);
            });
            reader.addEventListener("error", () => {
                this.profileMessage.textContent = "Could not read that profile image.";
            }, { once: true });
            reader.readAsDataURL(file);
        });
        this.profileAddressForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = new FormData(this.profileAddressForm);
            onSaveAddress(Object.fromEntries(data.entries()));
        });
        this.profileAddressList.addEventListener("click", (event) => {
            const button = event.target.closest("[data-remove-address]");
            if (button) onRemoveAddress(button.dataset.removeAddress);
        });
        this.profileCardForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const cardNumber = new FormData(this.profileCardForm).get("cardNumber");
            onSaveCard(String(cardNumber || ""));
        });
        this.currencySelect.addEventListener("change", () => {
            onSaveSettings(this.currencySelect.value, this.appearanceSelect.value);
        });
        this.appearanceSelect.addEventListener("change", () => {
            onSaveSettings(this.currencySelect.value, this.appearanceSelect.value);
        });
        this.themeQuickToggle.addEventListener("click", () => {
            const isDark = this.appearance === "dark" ||
                (this.appearance === "system" && this.systemDarkQuery.matches);
            onSaveSettings(this.currency, isDark ? "light" : "dark");
        });
        this.historyPage.addEventListener("click", (event) => {
            if (event.target.closest("[data-back-to-shop]")) {
                onBack();
                return;
            }
            const button = event.target.closest("[data-receipt-id]");
            if (button) onReceipt(button.dataset.receiptId);
            const trackingButton = event.target.closest("[data-track-id]");
            if (trackingButton) {
                const transaction = this.currentTransactions.find(
                    (item) => item.id === trackingButton.dataset.trackId
                );
                if (transaction) this.showTracking(transaction);
            }
        });
        this.profileOrderList.addEventListener("click", (event) => {
            const button = event.target.closest("[data-track-id]");
            if (!button) return;
            const transaction = this.currentTransactions.find(
                (item) => item.id === button.dataset.trackId
            );
            if (transaction) this.showTracking(transaction);
        });
        this.trackingPrevious.addEventListener("click", () => this.moveTracking(-1));
        this.trackingNext.addEventListener("click", () => this.moveTracking(1));
        this.trackingTimeline.addEventListener("click", (event) => {
            const button = event.target.closest("[data-tracking-step]");
            if (!button) return;
            this.trackingStageIndex = Number(button.dataset.trackingStep);
            this.renderTrackingStage();
        });
        this.trackingOverlay.addEventListener("click", (event) => {
            if (
                event.target === this.trackingOverlay ||
                event.target.closest(".tracking-close")
            ) {
                this.trackingOverlay.hidden = true;
            }
        });
        document.addEventListener("click", (event) => {
            if (event.target.closest("[data-back-to-shop]") &&
                (this.profilePage.contains(event.target) || this.settingsPage.contains(event.target))) {
                onBack();
            }
        });

        this.receiptOverlay.addEventListener("click", (event) => {
            if (event.target === this.receiptOverlay || event.target.closest(".receipt-close")) {
                this.hideReceipt();
            }
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                this.hideReceipt();
                this.trackingOverlay.hidden = true;
            }
        });
        this.systemDarkQuery.addEventListener("change", () => {
            if (this.appearance === "system") this.applyAppearance("system");
        });
    }

    animateProductToCart(addButton) {
        if (
            !addButton ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const image = addButton
            .closest(".catalog-product-card")
            ?.querySelector(".catalog-product-image");
        if (!image || !this.cartButton || typeof image.animate !== "function") {
            return;
        }

        const imageBounds = image.getBoundingClientRect();
        const cartBounds = this.cartButton.getBoundingClientRect();
        const flyingImage = image.cloneNode();
        flyingImage.alt = "";
        flyingImage.setAttribute("aria-hidden", "true");
        Object.assign(flyingImage.style, {
            position: "fixed",
            zIndex: "1000",
            top: `${imageBounds.top}px`,
            left: `${imageBounds.left}px`,
            width: `${imageBounds.width}px`,
            height: `${imageBounds.height}px`,
            margin: "0",
            borderRadius: "8px",
            objectFit: "cover",
            pointerEvents: "none",
            transformOrigin: "center",
        });
        document.body.append(flyingImage);

        const offsetX =
            cartBounds.left + cartBounds.width / 2 -
            (imageBounds.left + imageBounds.width / 2);
        const offsetY =
            cartBounds.top + cartBounds.height / 2 -
            (imageBounds.top + imageBounds.height / 2);
        const scaleX = cartBounds.width / imageBounds.width;
        const scaleY = cartBounds.height / imageBounds.height;
        const flight = flyingImage.animate(
            [
                {
                    transform: "translate(0, 0) scale(1)",
                    opacity: 1,
                    offset: 0,
                },
                {
                    transform: "translate(0, -32px) scale(1.08)",
                    opacity: 1,
                    offset: 0.22,
                },
                {
                    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scaleX}, ${scaleY})`,
                    opacity: 0.25,
                    offset: 1,
                },
            ],
            {
                duration: 720,
                easing: "cubic-bezier(0.2, 0.8, 0.25, 1)",
                fill: "forwards",
            }
        );
        flight.onfinish = () => flyingImage.remove();

        if (typeof this.cartButton.animate === "function") {
            this.cartButton.animate(
                [
                    { transform: "scale(1)" },
                    { transform: "scale(1.14)" },
                    { transform: "scale(1)" },
                ],
                { duration: 320, easing: "ease-out" }
            );
        }
    }

    renderCatalog(query = "") {
        const normalizedQuery = query.toLowerCase();
        const matchingCategories = CATEGORIES.map((category) => ({
            ...category,
            products: PRODUCTS.filter((product) =>
                product.categoryId === category.id &&
                (!normalizedQuery ||
                    `${product.name} ${product.description} ${category.name}`.toLowerCase().includes(normalizedQuery))
            ),
        })).filter((category) => category.products.length > 0);

        if (normalizedQuery) {
            const appleProducts = APPLE_PRODUCTS.filter((product) =>
                `${product.name} ${product.description}`
                    .toLowerCase()
                    .includes(normalizedQuery)
            );
            if (appleProducts.length) {
                matchingCategories.push({
                    id: "apple-products",
                    name: "Apple products",
                    icon: "Apple",
                    products: appleProducts,
                });
            }
        }

        this.renderCategoryChips(matchingCategories);
        this.catalogSections.replaceChildren(
            ...matchingCategories.map((category) => this.createCategorySection(category))
        );
        this.catalogMessage.textContent = matchingCategories.length
            ? ""
            : `No products found for "${query}". Try another search.`;
    }

    renderCategoryChips(categories = CATEGORIES) {
        this.categoryChips.replaceChildren(
            ...categories.map((category) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "category-chip";
                button.dataset.categoryTarget = category.id;
                button.textContent = category.icon
                    ? `${category.icon} ${category.name}`
                    : category.name;
                return button;
            })
        );
    }

    createCategorySection(category) {
        const section = document.createElement("div");
        section.className = "category-section";
        section.id = category.id;

        const heading = document.createElement("div");
        heading.className = "category-heading";
        const title = document.createElement("div");
        const icon = document.createElement("span");
        icon.className = "category-title-icon";
        icon.textContent = category.icon || "Apple";
        const name = document.createElement("span");
        name.textContent = category.name;
        title.append(icon, name);
        const count = document.createElement("span");
        count.className = "category-product-count";
        count.textContent = `${category.products.length} FINDS`;
        heading.append(title, count);

        const rail = document.createElement("div");
        rail.className = "product-rail";
        rail.append(...category.products.map((product) => this.createProductCard(product)));
        section.append(heading, rail);
        return section;
    }

    createProductCard(product) {
        const card = document.createElement("div");
        card.className = "catalog-product-card";

        const imageWrap = document.createElement("div");
        imageWrap.className = "catalog-image-wrap";
        const image = document.createElement("img");
        image.className = "catalog-product-image";
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";
        imageWrap.append(image);

        if (product.price < product.originalPrice) {
            const discount = Math.round(
                (1 - product.price / product.originalPrice) * 100
            );
            const badge = document.createElement("span");
            badge.className = "sale-badge";
            badge.textContent = `${discount}% OFF`;
            imageWrap.append(badge);
        }

        const details = document.createElement("div");
        details.className = "catalog-product-details";
        const name = document.createElement("div");
        name.className = "catalog-product-name";
        name.textContent = product.name;
        const prices = document.createElement("div");
        prices.className = "catalog-prices";
        const oldPrice = document.createElement("span");
        oldPrice.className = "original-price";
        oldPrice.textContent = this.formatMoney(product.originalPrice);
        oldPrice.hidden = product.originalPrice === product.price;
        const price = document.createElement("strong");
        price.className = "catalog-price";
        price.textContent = this.formatMoney(product.price);
        prices.append(oldPrice, price);

        let sourceNote;
        if (product.priceSourceUrl) {
            sourceNote = document.createElement("a");
            sourceNote.className = "price-estimate-link";
            sourceNote.href = product.priceSourceUrl;
            sourceNote.target = "_blank";
            sourceNote.rel = "noopener noreferrer";
            sourceNote.title = product.priceEstimate
                ? "Indicative demo estimate only; check current seller price."
                : "Seller listing observed; verify price and availability before purchase.";
            sourceNote.textContent = product.priceSourceLabel;
        }

        const bottom = document.createElement("div");
        bottom.className = "catalog-product-bottom";
        const rating = document.createElement("span");
        rating.className = "product-rating";
        rating.textContent = "★ 4.8";
        const addButton = document.createElement("button");
        addButton.className = "add-cart-button";
        addButton.type = "button";
        addButton.dataset.addProduct = product.id;
        addButton.setAttribute("aria-label", `Add ${product.name} to cart`);
        addButton.title = "Add to cart";
        addButton.innerHTML = ICON_MARKUP.add;
        bottom.append(rating, addButton);
        details.append(name, prices);
        if (sourceNote) details.append(sourceNote);
        details.append(bottom);
        card.append(imageWrap, details);
        return card;
    }

    renderHeroDots() {
        this.heroDots.replaceChildren(
            ...this.heroSlides.map((slide, index) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = `hero-dot${index === this.activeHeroSlide ? " active" : ""}`;
                button.dataset.heroTarget = String(index);
                button.setAttribute("aria-label", `Show featured slide ${index + 1}`);
                return button;
            })
        );
        this.startHeroCarousel();
    }

    startHeroCarousel() {
        if (this.heroTimer !== null) clearInterval(this.heroTimer);
        this.heroTimer = setInterval(() => {
            this.showHeroSlide((this.activeHeroSlide + 1) % this.heroSlides.length);
        }, 5000);
    }

    showHeroSlide(index) {
        this.activeHeroSlide = index;
        this.heroSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === index);
        });
        this.heroDots.querySelectorAll(".hero-dot").forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === index);
            dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
        });
        this.heroCurrent.textContent = String(index + 1).padStart(2, "0");
    }

    scrollToCategory(categoryId) {
        document.getElementById(categoryId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    renderCart(cart) {
        this.currentCart = cart;
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const originalTotal = cart.reduce((total, item) => total + item.originalPrice * item.quantity, 0);
        this.cartCount.textContent = String(itemCount);
        this.cartCount.hidden = itemCount === 0;
        this.cartSubtitle.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"} in your cart. Review your picks before payment.`;
        this.cartHeading.textContent = `Cart items (${itemCount})`;
        this.cartItemTotal.textContent = this.formatMoney(originalTotal);
        this.cartSavings.textContent = `−${this.formatMoney(originalTotal - subtotal)}`;
        this.cartTotal.textContent = this.formatMoney(subtotal);
        this.proceedPaymentButton.disabled = itemCount === 0;

        if (cart.length === 0) {
            const empty = document.createElement("div");
            empty.className = "empty-cart";
            const icon = document.createElement("span");
            icon.innerHTML = ICON_MARKUP.cart;
            const title = document.createElement("strong");
            title.textContent = "Your cart is waiting for a good find.";
            const copy = document.createElement("span");
            copy.textContent = "Browse the collections and add something you love.";
            empty.append(icon, title, copy);
            this.cartItems.replaceChildren(empty);
        } else {
            this.cartItems.replaceChildren(...cart.map((item) => this.createCartItem(item)));
        }
        this.paymentOrderItems.replaceChildren(
            ...cart.map((item) => {
                const row = document.createElement("div");
                row.className = "payment-order-item";
                const label = document.createElement("span");
                label.textContent = `${item.name} × ${item.quantity}`;
                const value = document.createElement("strong");
                value.textContent = this.formatMoney(item.price * item.quantity);
                row.append(label, value);
                return row;
            })
        );
        this.paymentOrderTotal.textContent = this.formatMoney(subtotal);
        this.checkoutTotal.textContent = this.formatMoney(subtotal);
    }

    createCartItem(item) {
        const row = document.createElement("div");
        row.className = "cart-item";
        const image = document.createElement("img");
        image.className = "cart-item-image";
        image.src = item.image;
        image.alt = "";
        const details = document.createElement("div");
        details.className = "cart-item-details";
        const name = document.createElement("strong");
        name.textContent = item.name;
        const category = document.createElement("span");
        category.textContent = item.category;
        const price = document.createElement("span");
        price.className = "cart-item-price";
        price.textContent = this.formatMoney(item.price);
        const oldPrice = document.createElement("del");
        oldPrice.textContent = this.formatMoney(item.originalPrice);
        oldPrice.hidden = item.originalPrice === item.price;
        details.append(name, category, price, oldPrice);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";
        const decrease = document.createElement("button");
        decrease.type = "button";
        decrease.dataset.cartChange = "-1";
        decrease.dataset.productId = item.id;
        decrease.setAttribute("aria-label", `Decrease ${item.name} quantity`);
        decrease.textContent = "−";
        const quantity = document.createElement("span");
        quantity.textContent = String(item.quantity);
        const increase = document.createElement("button");
        increase.type = "button";
        increase.dataset.cartChange = "1";
        increase.dataset.productId = item.id;
        increase.setAttribute("aria-label", `Increase ${item.name} quantity`);
        increase.textContent = "+";
        controls.append(decrease, quantity, increase);
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "remove-cart-button";
        remove.dataset.cartRemove = "true";
        remove.dataset.productId = item.id;
        remove.textContent = "Remove";
        row.append(image, details, controls, remove);
        return row;
    }

    showCartMessage(message) {
        this.cartMessage.textContent = message;
    }

    showAccount(profile) {
        this.currentProfile = profile;
        this.profileEmail.textContent = profile.email;
        this.profilePhone.value = profile.phone;
        this.profileBadge.textContent = profile.customerNumber !== null &&
            profile.customerNumber <= 100
            ? `Founding customer #${profile.customerNumber} · local demo`
            : "MarketPay customer";
        this.profileAvatar.hidden = !profile.avatar;
        this.profileAvatar.src = profile.avatar || "";
        this.profileAvatarPlaceholder.hidden = Boolean(profile.avatar);
    }

    renderCustomerData({ addresses, cards, transactions }) {
        this.currentAddresses = addresses;
        this.currentCards = cards;
        this.currentTransactions = transactions;
        this.renderAddressList(addresses);
        this.renderSavedCardList(cards);
        this.renderProfileOrders(transactions);
        this.renderTransactions(transactions);
    }

    renderAddressList(addresses) {
        if (!addresses.length) {
            const empty = document.createElement("div");
            empty.className = "saved-detail-empty";
            empty.textContent = "No saved delivery addresses yet.";
            this.profileAddressList.replaceChildren(empty);
            return;
        }
        this.profileAddressList.replaceChildren(...addresses.map((address) => {
            const card = document.createElement("div");
            card.className = "saved-detail-row";
            const info = document.createElement("div");
            const name = document.createElement("strong");
            name.textContent = address.recipient;
            const addressLine = document.createElement("span");
            addressLine.textContent = [
                address.address, address.city, address.state, address.country,
            ].filter(Boolean).join(", ");
            const phone = document.createElement("span");
            phone.textContent = address.phone;
            info.append(name, addressLine, phone);
            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "text-button";
            remove.dataset.removeAddress = address.id;
            remove.textContent = "Remove";
            card.append(info, remove);
            return card;
        }));
    }

    renderSavedCardList(cards) {
        if (!cards.length) {
            const empty = document.createElement("div");
            empty.className = "saved-detail-empty";
            empty.textContent = "No saved card labels. Full payment details are never stored.";
            this.profileCardList.replaceChildren(empty);
            return;
        }
        this.profileCardList.replaceChildren(...cards.map((card) => {
            const row = document.createElement("div");
            row.className = "saved-detail-row";
            const label = document.createElement("strong");
            label.textContent = `${card.brand} ending in ${card.last4}`;
            const note = document.createElement("span");
            note.textContent = "Masked demo label";
            row.append(label, note);
            return row;
        }));
    }

    renderProfileOrders(transactions) {
        const trackable = transactions.filter(
            (transaction) => transaction.status === "successful" && transaction.tracking
        );
        if (!trackable.length) {
            const empty = document.createElement("div");
            empty.className = "saved-detail-empty";
            empty.textContent = "Successful orders with tracking will appear here.";
            this.profileOrderList.replaceChildren(empty);
            return;
        }
        this.profileOrderList.replaceChildren(...trackable.map((transaction) => {
            const row = document.createElement("div");
            row.className = "saved-detail-row";
            const info = document.createElement("div");
            const name = document.createElement("strong");
            name.textContent = transaction.product;
            const meta = document.createElement("span");
            meta.textContent = `${transaction.reference || transaction.id} · ${this.formatDate(transaction.createdAt)}`;
            info.append(name, meta);
            const button = document.createElement("button");
            button.type = "button";
            button.className = "secondary-button compact-button";
            button.dataset.trackId = transaction.id;
            button.textContent = "Track";
            row.append(info, button);
            return row;
        }));
    }

    showProfile(profile, addresses, cards, transactions) {
        this.showAccount(profile);
        this.renderCustomerData({ addresses, cards, transactions });
        this.profileMessage.textContent = "";
        this.profileAddressMessage.textContent = "";
        this.profileCardMessage.textContent = "";
        this.profileAddressForm.hidden = true;
        this.profileAddressForm.reset();
        this.profileCardForm.reset();
        this.profileCardForm.hidden = true;
        this.showPage("profile");
    }

    showSettings(settings) {
        this.currencySelect.value = settings.currency;
        this.appearanceSelect.value = settings.appearance;
        this.settingsMessage.textContent = "";
        this.showPage("settings");
    }

    setPreferences(settings) {
        this.currency = settings.currency;
        this.appearance = settings.appearance;
        this.applyAppearance(settings.appearance);
        this.currencySelect.value = settings.currency;
        this.appearanceSelect.value = settings.appearance;
        this.renderCatalog(this.catalogSearch.value.trim());
        this.renderCart(this.currentCart);
        this.renderTransactions(this.currentTransactions);
        this.renderProfileOrders(this.currentTransactions);
    }

    applyAppearance(appearance) {
        document.body.dataset.theme = appearance;
        const dark = appearance === "dark" ||
            (appearance === "system" && this.systemDarkQuery.matches);
        this.themeQuickToggle.innerHTML = dark
            ? '☀ <span>Light mode</span>'
            : '☾ <span>Dark mode</span>';
        this.themeQuickToggle.setAttribute(
            "aria-label",
            dark ? "Switch to light appearance" : "Switch to dark appearance"
        );
    }

    showTracking(transaction) {
        if (!transaction.tracking?.events?.length) {
            this.showMessage("Tracking details are not available for this transaction.");
            return;
        }
        this.trackingTransaction = transaction;
        this.trackingTitle.textContent = transaction.product;
        this.trackingReference.textContent =
            `Order ${transaction.reference || transaction.id}`;
        const now = Date.now();
        const activeIndex = transaction.tracking.events.reduce(
            (index, event, eventIndex) =>
                new Date(event.scheduledAt).getTime() <= now ? eventIndex : index,
            0
        );
        this.trackingStageIndex = activeIndex;
        this.renderTrackingStage();
        this.trackingOverlay.hidden = false;
    }

    moveTracking(direction) {
        if (!this.trackingTransaction) return;
        const count = this.trackingTransaction.tracking.events.length;
        this.trackingStageIndex = Math.max(
            0,
            Math.min(count - 1, this.trackingStageIndex + direction)
        );
        this.renderTrackingStage();
    }

    renderTrackingStage() {
        const events = this.trackingTransaction.tracking.events;
        const now = Date.now();
        const currentIndex = events.reduce(
            (index, item, itemIndex) =>
                new Date(item.scheduledAt).getTime() <= now ? itemIndex : index,
            0
        );
        this.trackingProgressFill.style.width =
            `${(currentIndex / Math.max(1, events.length - 1)) * 100}%`;
        const event = events[this.trackingStageIndex];
        const isDelivered = currentIndex === events.length - 1;
        const isCurrent = this.trackingStageIndex === currentIndex;
        const status = this.trackingStageIndex < currentIndex
            ? "Completed"
            : isCurrent && isDelivered
                ? "Delivered"
                : isCurrent
                    ? "Current status"
                    : "Estimated milestone";
        const heading = document.createElement("strong");
        heading.textContent = event.title;
        const description = document.createElement("p");
        description.textContent = event.description;
        const time = document.createElement("time");
        time.dateTime = event.scheduledAt;
        time.textContent = this.formatDateTime(event.scheduledAt);
        const label = document.createElement("span");
        label.className = `tracking-status-label${isCurrent ? " current" : ""}`;
        label.textContent = status;
        this.trackingStage.replaceChildren(label, heading, description, time);
        this.trackingPrevious.disabled = this.trackingStageIndex === 0;
        this.trackingNext.disabled = this.trackingStageIndex === events.length - 1;
        this.trackingTimeline.replaceChildren(...events.map((item, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "tracking-timeline-step";
            if (index < currentIndex) button.classList.add("complete");
            if (index === currentIndex) button.classList.add("active");
            if (index === this.trackingStageIndex) button.classList.add("selected");
            button.dataset.trackingStep = String(index);
            const title = document.createElement("strong");
            title.textContent = item.title;
            const date = document.createElement("span");
            date.textContent = this.formatDateTime(item.scheduledAt);
            button.append(title, date);
            return button;
        }));
    }

    formatDateTime(value) {
        return new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date(value));
    }

    renderPaymentMethods() {
        this.paymentMethods.replaceChildren(
            ...PAYMENT_METHODS.map((method) => {
                const label = document.createElement("label");
                label.className = `method-card${method.id === this.selectedMethod ? " is-selected" : ""}`;

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "payment-method";
                radio.value = method.id;
                radio.dataset.methodId = method.id;
                radio.checked = method.id === this.selectedMethod;
                radio.setAttribute("aria-label", method.name);

                const icon = document.createElement("span");
                icon.className = "method-icon";
                icon.setAttribute("aria-hidden", "true");
                if (method.logo) {
                    const logo = document.createElement("img");
                    logo.src = method.logo;
                    logo.alt = "";
                    logo.loading = "lazy";
                    logo.addEventListener("error", () => {
                        icon.textContent = method.id === "apple" ? "Apple Pay" : "PayPal";
                        icon.classList.add("method-logo-fallback");
                    }, { once: true });
                    icon.append(logo);
                } else {
                    icon.textContent = method.icon;
                }

                const name = document.createElement("span");
                name.textContent = method.name;
                label.append(radio, icon, name);
                return label;
            })
        );
    }

    renderPaymentDetails() {
        this.paymentDetails.replaceChildren();
        if (this.selectedMethod === "bank") {
            const heading = document.createElement("div");
            heading.className = "details-heading";
            heading.textContent = "Bank transfer";
            const copy = document.createElement("div");
            copy.className = "demo-hint";
            copy.textContent = "Your demo account number, scan authorization, and 20-minute transfer timer will appear on the next page.";
            this.paymentDetails.append(heading, copy);
        } else if (this.selectedMethod === "card") {
            this.paymentDetails.append(this.createCardFields());
        } else {
            const heading = document.createElement("div");
            heading.className = "details-heading";
            heading.textContent = this.selectedMethod === "paypal" ? "PayPal demo checkout" : "Apple Pay demo checkout";
            const copy = document.createElement("div");
            copy.className = "demo-hint";
            copy.textContent = `Continue to create a simulated ${this.selectedMethod === "paypal" ? "PayPal" : "Apple Pay"} payment. This demo does not connect to the provider.`;
            this.paymentDetails.append(heading, copy);
        }
    }

    createCardFields() {
        const wrapper = document.createElement("div");
        wrapper.className = "card-fields";
        if (this.currentCards.length) {
            const savedField = document.createElement("div");
            savedField.className = "field";
            const label = document.createElement("label");
            label.htmlFor = "saved-card-select";
            label.textContent = "Saved card";
            const select = document.createElement("select");
            select.id = "saved-card-select";
            select.innerHTML = '<option value="">Use a new demo card</option>';
            for (const card of this.currentCards) {
                const option = document.createElement("option");
                option.value = card.id;
                option.textContent = `${card.brand} ending in ${card.last4}`;
                select.append(option);
            }
            savedField.append(label, select);
            wrapper.append(savedField);
        }
        const entry = document.createElement("div");
        entry.className = "card-fields-entry";
        entry.append(
            this.createField("Cardholder name", "card-name", "text", "Demo User", "name"),
            this.createField("Demo card number", "card-number", "text", "4242 4242 4242 4242", "cc-number"),
            this.createField("Expiry", "card-expiry", "text", "MM / YY", "cc-exp", true),
            this.createField("Security code", "card-cvc", "text", "123", "off", true)
        );
        const saveField = document.createElement("label");
        saveField.className = "save-address-option";
        saveField.innerHTML = '<input id="checkout-save-card" type="checkbox"><span>Save only the card brand and last four digits</span>';
        entry.append(saveField);
        entry.hidden = Boolean(this.currentCards.length &&
            wrapper.querySelector("#saved-card-select").value);
        wrapper.append(entry);
        const hint = document.createElement("div");
        hint.className = "demo-hint";
        hint.textContent = "Use made-up details only. Full card number and security code are never saved.";
        wrapper.append(hint);
        return wrapper;
    }

    createField(labelText, id, type, placeholder, autocomplete, half = false) {
        const field = document.createElement("div");
        field.className = `field${half ? " half" : ""}`;
        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = labelText;
        const input = document.createElement("input");
        input.id = id;
        input.type = type;
        input.placeholder = placeholder;
        input.autocomplete = autocomplete;
        input.dataset.cardField = "true";
        field.append(label, input);
        return field;
    }

    validatePaymentDetails() {
        if (this.selectedMethod !== "card") return true;
        const savedCard = this.paymentDetails.querySelector("#saved-card-select")?.value;
        if (savedCard) return true;
        const fields = [...this.paymentDetails.querySelectorAll("[data-card-field]")];
        const isValid = fields.every((field) => field.value.trim());
        if (!isValid) {
            this.showMessage("Enter demo details in each card field to continue.");
            fields.find((field) => !field.value.trim())?.focus();
            return false;
        }
        return true;
    }

    getCheckoutSelection() {
        const cart = this.currentCart;
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const price = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        return {
            product: {
                id: "cart-order",
                name: `${count} ${count === 1 ? "item" : "items"} from MarketPay`,
                price,
                items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
            },
            method: PAYMENT_METHODS.find((method) => method.id === this.selectedMethod)?.name,
            methodId: this.selectedMethod,
            savedCardId: this.paymentDetails.querySelector("#saved-card-select")?.value || "",
            saveCardLabel: Boolean(this.paymentDetails.querySelector("#checkout-save-card")?.checked),
            cardNumber: this.paymentDetails.querySelector("#card-number")?.value || "",
        };
    }

    showDelivery(selection, addresses = this.currentAddresses) {
        this.currentAddresses = addresses;
        this.deliveryAddressSelect.replaceChildren(
            new Option("Enter a new address", ""),
            ...addresses.map((address) => new Option(
                `${address.recipient} · ${address.city}, ${address.country}`,
                address.id
            ))
        );
        if (addresses.length === 1) {
            this.deliveryAddressSelect.value = addresses[0].id;
            this.fillDeliveryAddress(addresses[0].id);
        } else {
            this.deliveryForm.reset();
            this.deliverySaveAddress.checked = true;
        }
        this.deliveryProduct.textContent = selection.product.items
            .map((item) => `${item.name} × ${item.quantity}`)
            .join(", ");
        this.deliveryMethod.textContent = `Payment: ${selection.method}`;
        this.deliveryTotal.textContent = this.formatMoney(selection.product.price);
        this.deliveryMessage.textContent = "";
        this.showPage("delivery");
        this.showAccountMenu(false);
    }

    getDeliveryAddress() {
        const formData = new FormData(this.deliveryForm);
        return {
            recipient: formData.get("recipient").trim(),
            phone: formData.get("phone").trim(),
            country: formData.get("country").trim(),
            state: formData.get("state").trim(),
            city: formData.get("city").trim(),
            address: formData.get("address").trim(),
            postalCode: formData.get("postalCode").trim(),
            saveAddress: this.deliverySaveAddress.checked,
        };
    }

    showDeliveryMessage(message) {
        this.deliveryMessage.textContent = message;
    }

    fillDeliveryAddress(addressId) {
        const address = this.currentAddresses.find((item) => item.id === addressId);
        if (!address) {
            this.deliveryForm.reset();
            this.deliveryAddressSelect.value = "";
            this.deliverySaveAddress.checked = true;
            return;
        }
        for (const field of [
            "recipient", "phone", "country", "state", "city", "address", "postalCode",
        ]) {
            const input = this.deliveryForm.elements.namedItem(field);
            if (input) input.value = address[field] || "";
        }
        this.deliverySaveAddress.checked = false;
    }

    showAuthorization(selection) {
        document.querySelector("#transfer-amount").textContent = this.formatMoney(selection.product.price);
        document.querySelector("#transfer-product").textContent = selection.product.name;
        document.querySelector("#transfer-timer").textContent = "20:00";
        document.querySelector("#authorization-expired").hidden = true;
        this.confirmTransferButton.disabled = false;
        this.renderOrderQrCode(selection);
        this.showPage("authorization");
    }

    renderOrderQrCode(selection) {
        const payload = [
            "MARKETPAY DEMO ORDER",
            `Reference: ${selection.reference}`,
            `Product: ${selection.product.id}`,
            `Amount: ${this.currency} ${this.formatMoney(selection.product.price)}`,
        ].join("\n");
        const matrix = createQrMatrix(payload);
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("viewBox", "-4 -4 45 45");
        svg.setAttribute("role", "img");
        svg.setAttribute(
            "aria-label",
            `Scannable demo order QR code for ${selection.product.name}, ${this.formatMoney(selection.product.price)}. It does not make a payment.`
        );

        const background = document.createElementNS(svgNamespace, "rect");
        background.setAttribute("x", "-4");
        background.setAttribute("y", "-4");
        background.setAttribute("width", "45");
        background.setAttribute("height", "45");
        background.setAttribute("fill", "#ffffff");

        let pathData = "";
        for (let row = 0; row < matrix.length; row += 1) {
            for (let column = 0; column < matrix[row].length; column += 1) {
                if (matrix[row][column]) {
                    pathData += `M${column} ${row}h1v1h-1z`;
                }
            }
        }
        const modules = document.createElementNS(svgNamespace, "path");
        modules.setAttribute("d", pathData);
        modules.setAttribute("fill", "#202b3c");
        svg.append(background, modules);

        const qrCode = this.authorizationPage.querySelector(".qr-code");
        qrCode.replaceChildren(svg);
    }

    updateTimer(secondsRemaining) {
        const minutes = Math.floor(secondsRemaining / 60);
        const seconds = secondsRemaining % 60;
        document.querySelector("#transfer-timer").textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    showAuthorizationExpired() {
        document.querySelector("#transfer-timer").textContent = "00:00";
        document.querySelector("#authorization-expired").hidden = false;
        this.confirmTransferButton.disabled = true;
    }

    showVerificationPending(method) {
        this.verificationSpinner.hidden = false;
        this.verificationCheck.hidden = true;
        this.verificationTitle.textContent = `Verifying your ${method} payment`;
        this.verificationCopy.textContent = "Please wait while we confirm this demo transaction.";
        this.showPage("verification");
    }

    showVerificationResult(status, method) {
        this.verificationSpinner.hidden = true;
        this.verificationCheck.hidden = false;
        this.verificationCheck.classList.toggle("denied", status === "failed");
        this.verificationCheck.textContent = status === "successful" ? "✓" : "×";
        this.verificationTitle.textContent = status === "successful"
            ? "Payment confirmed"
            : "Payment denied";
        this.verificationCopy.textContent = status === "successful"
            ? `Your ${method} demo payment is confirmed. Returning to the store...`
            : `Your ${method} demo payment was denied. Returning to the store...`;
    }

    showCheckout(selection) {
        this.checkoutPanel.replaceChildren();
        const title = document.createElement("div");
        title.className = "checkout-title";
        title.textContent = "Ready to simulate your payment?";
        const copy = document.createElement("div");
        copy.className = "checkout-copy";
        copy.textContent = `${selection.product.name} · ${selection.method}. Select an outcome below to finish this demo checkout.`;
        const actions = document.createElement("div");
        actions.className = "simulation-actions";
        actions.append(
            this.createOutcomeButton("successful", "✓ Simulate successful payment"),
            this.createOutcomeButton("failed", "× Simulate failed payment")
        );
        this.checkoutPanel.append(title, copy, actions);
        this.checkoutPanel.hidden = false;
    }

    createOutcomeButton(outcome, text) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `simulation-button ${outcome === "successful" ? "success" : "failure"}`;
        button.dataset.outcome = outcome;
        button.textContent = text;
        return button;
    }

    renderTransactions(transactions) {
        this.currentTransactions = transactions;
        this.historyPageCount.textContent = String(transactions.length);
        if (transactions.length === 0) {
            const empty = document.createElement("div");
            empty.className = "empty-history";
            empty.textContent = "No transactions yet. Your payment history will appear here.";
            this.transactionList.replaceChildren(empty);
            return;
        }

        this.transactionList.replaceChildren(
            ...transactions.map((transaction) => this.createTransactionCard(transaction))
        );
    }

    showHistoryMessage(message) {
        this.historyMessage.textContent = message;
    }

    createTransactionCard(transaction) {
        const card = document.createElement("div");
        card.className = "transaction-card";

        const icon = document.createElement("div");
        icon.className = `transaction-icon${transaction.status === "failed" ? " failed" : ""}`;
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = transaction.status === "successful" ? "✓" : "×";

        const info = document.createElement("div");
        info.className = "transaction-info";
        const product = document.createElement("div");
        product.className = "transaction-product";
        product.textContent = transaction.product;
        const meta = document.createElement("div");
        meta.className = "transaction-meta";
        meta.textContent = `${transaction.method} · ${this.formatDate(transaction.createdAt)}`;
        info.append(product, meta);

        const end = document.createElement("div");
        end.className = "transaction-end";
        const amount = document.createElement("div");
        amount.className = "transaction-amount";
        amount.textContent = this.formatMoney(transaction.amount);
        const status = document.createElement("div");
        status.className = `transaction-status${transaction.status === "failed" ? " failed" : ""}`;
        status.textContent = transaction.status;
        const receiptButton = document.createElement("button");
        receiptButton.type = "button";
        receiptButton.className = "receipt-button";
        receiptButton.dataset.receiptId = transaction.id;
        receiptButton.textContent = "View receipt";
        end.append(amount, status, receiptButton);
        if (transaction.status === "successful" && transaction.tracking) {
            const trackingButton = document.createElement("button");
            trackingButton.type = "button";
            trackingButton.className = "receipt-button";
            trackingButton.dataset.trackId = transaction.id;
            trackingButton.textContent = "Track order";
            end.append(trackingButton);
        }

        card.append(icon, info, end);
        return card;
    }

    showReceipt(transaction) {
        this.receiptStatus.className = `receipt-status ${transaction.status}`;
        this.receiptStatus.textContent = transaction.status === "successful"
            ? "Payment successful"
            : "Payment failed";
        this.receiptDetails.replaceChildren(
            this.createReceiptRow("Product", transaction.product),
            ...(transaction.items || []).map((item) =>
                this.createReceiptRow("Item", `${item.name} × ${item.quantity} — ${this.formatMoney(item.price * item.quantity)}`)
            ),
            this.createReceiptRow("Amount", this.formatMoney(transaction.amount)),
            this.createReceiptRow("Payment method", transaction.method),
            this.createReceiptRow("Status", transaction.status),
            this.createReceiptRow("Date", this.formatDate(transaction.createdAt)),
            this.createReceiptRow("Reference", transaction.reference || transaction.id)
        );
        if (transaction.deliveryAddress) {
            const address = transaction.deliveryAddress;
            const addressText = [
                address.recipient,
                address.address,
                address.city,
                address.state,
                address.country,
                address.postalCode,
            ].filter(Boolean).join(", ");
            this.receiptDetails.append(this.createReceiptRow("Deliver to", addressText));
        }
        this.receiptOverlay.hidden = false;
    }

    createReceiptRow(label, value) {
        const row = document.createElement("div");
        row.className = "receipt-row";
        const key = document.createElement("span");
        key.textContent = label;
        const detail = document.createElement("strong");
        detail.textContent = value;
        row.append(key, detail);
        return row;
    }

    hideReceipt() {
        this.receiptOverlay.hidden = true;
    }

    hideCheckout() {
        this.checkoutPanel.hidden = true;
        this.checkoutPanel.replaceChildren();
    }

    showPage(name) {
        this.shopPage.hidden = name !== "shop";
        this.cartPage.hidden = name !== "cart";
        this.paymentPage.hidden = name !== "payment";
        this.authorizationPage.hidden = name !== "authorization";
        this.deliveryPage.hidden = name !== "delivery";
        this.verificationPage.hidden = name !== "verification";
        this.historyPage.hidden = name !== "history";
        this.profilePage.hidden = name !== "profile";
        this.settingsPage.hidden = name !== "settings";
        window.scrollTo(0, 0);
    }

    showHistory() {
        this.showPage("history");
    }

    showCart() {
        this.renderCart(this.currentCart);
        this.showPage("cart");
        this.showAccountMenu(false);
    }

    showPayment() {
        if (!this.currentCart.length) {
            this.showCartMessage("Add at least one product before proceeding to payment.");
            this.showCart();
            return;
        }
        this.renderCart(this.currentCart);
        this.renderPaymentDetails();
        this.showPage("payment");
        this.showAccountMenu(false);
    }

    showShop() {
        this.hideReceipt();
        this.showPage("shop");
        this.showAccountMenu(false);
    }

    showMessage(message) {
        this.message.textContent = message;
    }

    showSignInMessage(message) {
        this.signInMessage.textContent = message;
    }

    showSignIn() {
        this.marketApp.hidden = true;
        this.signInPage.hidden = false;
    }

    showMarket() {
        this.signInPage.hidden = true;
        this.marketApp.hidden = false;
    }

    showCookieNotice() {
        this.cookieNotice.hidden = false;
    }

    hideCookieNotice() {
        this.cookieNotice.hidden = true;
    }

    showAccountMenu(open) {
        this.accountButton.setAttribute("aria-expanded", String(open));
        this.settingsButton.setAttribute("aria-expanded", String(open));
    }

    formatMoney(amount) {
        const currency = CURRENCIES[this.currency] || CURRENCIES.NGN;
        return new Intl.NumberFormat(currency.locale, {
            style: "currency",
            currency: this.currency,
            maximumFractionDigits: currency.digits,
        }).format(amount * currency.rate);
    }

    formatDate(value) {
        return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
    }
}
