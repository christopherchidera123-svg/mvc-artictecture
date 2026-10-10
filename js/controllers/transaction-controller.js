const TRANSFER_DURATION_SECONDS = 20 * 60;

export class TransactionController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.pendingCheckout = null;
        this.transferDeadline = null;
        this.timerInterval = null;
        this.verificationTimeout = null;
        this.returnTimeout = null;
        this.verifying = false;

        this.view.bindActions({
            onSignIn: (email, phone) => this.signIn(email, phone),
            onCookieConsent: (choice) => this.saveCookieConsent(choice),
            onCheckout: (selection) => this.startCheckout(selection),
            onComplete: (outcome) => this.completeCheckout(outcome),
            onConfirmTransfer: () => this.confirmTransfer(),
            onDeliveryComplete: (address) => this.completeDeliveryDetails(address),
            onHistory: () => this.openHistory(),
            onBack: () => this.returnToShop(),
            onReceipt: (id) => this.openReceipt(id),
            onAddToCart: (productId, button) => this.addToCart(productId, button),
            onCartQuantity: (productId, quantity) => this.setCartQuantity(productId, quantity),
            onRemoveFromCart: (productId) => this.removeFromCart(productId),
            onProceedPayment: () => this.view.showPayment(),
            onSignOut: () => this.signOut(),
            onCategory: (categoryId) => this.view.scrollToCategory(categoryId),
            onProfile: () => this.openProfile(),
            onSettings: () => this.openSettings(),
            onSaveProfile: (phone, avatar) => this.saveProfileChanges(phone, avatar),
            onSaveAddress: (address) => this.saveAddress(address),
            onRemoveAddress: (id) => this.removeAddress(id),
            onSaveCard: (cardNumber) => this.saveCardLabel(cardNumber),
            onSaveSettings: (currency, appearance) => this.saveSettings(currency, appearance),
        });
    }

    async start() {
        const profile = this.model.getProfile();
        const cookieConsent = profile ? this.model.getCookieConsent() : null;

        try {
            this.view.setPreferences(this.model.getSettings());
        } catch (error) {
            this.view.showMessage(
                error instanceof Error
                    ? `Could not load saved preferences: ${error.message}`
                    : "Could not load saved preferences."
            );
        }

        if (!profile) {
            this.view.showSignIn();
            return;
        }

        this.view.showMarket();
        this.view.showAccount(profile);
        this.view.renderCart(this.model.getCart());
        this.refreshCustomerData();

        if (!cookieConsent) {
            this.view.showCookieNotice();
        }

        try {
            await this.refreshHistory();
        } catch (error) {
            this.view.showMessage(
                error instanceof Error ? `Could not load saved transactions: ${error.message}` : "Could not load saved transactions."
            );
        }
    }

    async refreshHistory() {
        const transactions = this.model.getTransactions();
        this.view.renderCustomerData({
            addresses: this.model.getAddresses(),
            cards: this.model.getSavedCards(),
            transactions,
        });
        return transactions;
    }

    signIn(email, phone) {
        try {
            const profile = this.model.saveProfile(email, phone);
            this.view.showSignInMessage("");
            this.view.showMarket();
            this.view.showAccount(profile);
            this.view.renderCart(this.model.getCart());
            this.refreshCustomerData();
            if (!this.model.getCookieConsent()) {
                this.view.showCookieNotice();
            }
        } catch (error) {
            this.view.showSignInMessage(
                error instanceof Error ? error.message : "Could not save your sign-in details."
            );
        }
    }

    saveCookieConsent(choice) {
        try {
            this.model.saveCookieConsent(choice);
            this.view.hideCookieNotice();
        } catch (error) {
            this.view.showMessage(
                error instanceof Error ? error.message : "Could not save your cookie preference."
            );
        }
    }

    addToCart(productId, button) {
        try {
            this.model.addToCart(productId);
            this.view.renderCart(this.model.getCart());
            this.view.showCartMessage("");
            this.view.animateProductToCart(button);
        } catch (error) {
            this.view.showMessage(error instanceof Error ? error.message : "Could not add that product.");
        }
    }

    setCartQuantity(productId, quantity) {
        try {
            this.model.setCartQuantity(productId, quantity);
            this.view.renderCart(this.model.getCart());
        } catch (error) {
            this.view.showCartMessage(error instanceof Error ? error.message : "Could not update the cart.");
        }
    }

    removeFromCart(productId) {
        try {
            this.model.removeFromCart(productId);
            this.view.renderCart(this.model.getCart());
        } catch (error) {
            this.view.showCartMessage(error instanceof Error ? error.message : "Could not remove that product.");
        }
    }

    refreshCustomerData() {
        this.view.renderCustomerData({
            addresses: this.model.getAddresses(),
            cards: this.model.getSavedCards(),
            transactions: this.model.getTransactions(),
        });
    }

    openProfile() {
        const profile = this.model.getProfile();
        if (!profile) {
            this.view.showSignIn();
            return;
        }
        this.view.showProfile(
            profile,
            this.model.getAddresses(),
            this.model.getSavedCards(),
            this.model.getTransactions()
        );
    }

    openSettings() {
        this.view.showSettings(this.model.getSettings());
    }

    saveProfileChanges(phone, avatar) {
        try {
            const profile = this.model.updateProfile({ phone, avatar });
            this.view.showAccount(profile);
            this.view.profileMessage.textContent = "Profile saved in this browser.";
        } catch (error) {
            this.view.profileMessage.textContent = error instanceof Error ? error.message : "Could not save profile changes.";
        }
    }

    saveAddress(address) {
        try {
            const addresses = this.model.saveAddress(address);
            this.view.currentAddresses = addresses;
            this.view.renderAddressList(addresses);
            this.view.profileAddressForm.reset();
            this.view.profileAddressForm.hidden = true;
            this.view.profileAddressMessage.textContent = "Address saved in this browser.";
        } catch (error) {
            this.view.profileAddressMessage.textContent = error instanceof Error ? error.message : "Could not save address.";
        }
    }

    removeAddress(addressId) {
        try {
            const addresses = this.model.removeAddress(addressId);
            this.view.currentAddresses = addresses;
            this.view.renderAddressList(addresses);
        } catch (error) {
            this.view.profileAddressMessage.textContent = error instanceof Error ? error.message : "Could not remove address.";
        }
    }

    saveCardLabel(cardNumber) {
        try {
            const cards = this.model.saveCardLabel(cardNumber);
            this.view.currentCards = cards;
            this.view.renderSavedCardList(cards);
            this.view.profileCardForm.reset();
            this.view.profileCardForm.hidden = true;
            this.view.profileCardMessage.textContent = "Card label saved in this browser.";
        } catch (error) {
            this.view.profileCardMessage.textContent = error instanceof Error ? error.message : "Could not save card label.";
        }
    }

    saveSettings(currency, appearance) {
        try {
            const settings = this.model.saveSettings(currency, appearance);
            this.view.setPreferences(settings);
            this.view.settingsMessage.textContent = "Preferences saved in this browser.";
        } catch (error) {
            this.view.settingsMessage.textContent = error instanceof Error ? error.message : "Could not save preferences.";
        }
    }

    signOut() {
        this.model.clearProfile();
        this.model.clearCart();
        this.view.hideCookieNotice();
        this.view.showSignIn();
    }

    openHistory() {
        this.view.showHistory();
        this.view.renderTransactions(this.model.getTransactions());
    }

    openReceipt(id) {
        const receipt = this.model.getTransactions().find((item) => item.id === id);
        if (!receipt) return;
        this.view.showReceipt(receipt);
    }

    returnToShop() {
        this.view.showShop();
    }

    startCheckout(selection) {
        if (!selection.product || !selection.method) {
            this.view.showMessage("Choose a product and payment method to continue.");
            return;
        }

        this.pendingCheckout = {
            ...selection,
            reference: `MP-${this.createOrderReference()}`,
        };
        this.view.showMessage("");
        this.view.showDelivery(this.pendingCheckout);
    }

    completeDeliveryDetails(address) {
        if (!this.pendingCheckout) {
            this.view.showMessage("Choose a product before entering delivery details.");
            return;
        }

        const { saveAddress, ...addressDetails } = address;
        try {
            if (saveAddress) {
                this.model.saveAddress(addressDetails);
            }
            this.pendingCheckout.deliveryAddress = { ...addressDetails };
            this.view.currentAddresses = this.model.getAddresses();
        } catch (error) {
            this.view.showDeliveryMessage(error instanceof Error ? error.message : "Could not save delivery details.");
            return;
        }

        if (this.pendingCheckout.methodId === "bank") {
            this.startTransferTimer();
            this.view.showAuthorization(this.pendingCheckout);
            return;
        }

        this.view.showCheckout(this.pendingCheckout);
    }

    startTransferTimer() {
        this.stopTransferTimer();
        this.transferDeadline = Date.now() + TRANSFER_DURATION_SECONDS * 1000;
        this.updateTransferTimer();
        this.timerInterval = setInterval(() => this.updateTransferTimer(), 1000);
    }

    updateTransferTimer() {
        const secondsRemaining = Math.max(0, Math.ceil((this.transferDeadline - Date.now()) / 1000));
        this.view.updateTimer(secondsRemaining);
        if (secondsRemaining === 0) {
            this.stopTransferTimer();
            this.pendingCheckout = null;
            this.view.showAuthorizationExpired();
        }
    }

    stopTransferTimer() {
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.transferDeadline = null;
    }

    createOrderReference() {
        if (globalThis.crypto?.randomUUID) {
            return globalThis.crypto.randomUUID().slice(0, 8).toUpperCase();
        }
        return `${Date.now().toString().slice(-6)}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;
    }

    confirmTransfer() {
        if (!this.pendingCheckout || this.pendingCheckout.methodId !== "bank") {
            this.view.showMessage("Start a bank transfer checkout before confirming it.");
            return;
        }
        this.beginVerification("successful");
    }

    beginVerification(status) {
        const checkout = this.pendingCheckout;
        if (!checkout || this.verifying) return;

        this.verifying = true;
        this.stopTransferTimer();
        this.view.showVerificationPending(checkout.method);

        this.verificationTimeout = setTimeout(async () => {
            try {
                await this.model.addTransaction(
                    checkout.product,
                    checkout.method,
                    status,
                    checkout.deliveryAddress,
                    checkout.reference
                );
                if (status === "successful") {
                    this.model.clearCart();
                    this.view.renderCart(this.model.getCart());
                }
                this.pendingCheckout = null;
                this.view.showVerificationResult(status, checkout.method);
                this.returnTimeout = setTimeout(() => {
                    this.verifying = false;
                    this.view.showShop();
                    this.view.showMessage(
                        `${checkout.method} payment ${status === "successful" ? "confirmed" : "denied"}.`
                    );
                }, 1300);
            } catch (error) {
                this.pendingCheckout = null;
                this.verifying = false;
                this.view.showShop();
                this.view.showMessage(
                    error instanceof Error ? `Could not save the transaction: ${error.message}` : "Could not save the transaction."
                );
            }
        }, 1200);
    }

    completeCheckout(status) {
        if (!this.pendingCheckout) {
            this.view.showMessage("Start checkout before choosing a payment result.");
            return;
        }

        if (!this.pendingCheckout.methodId || !["successful", "failed"].includes(status)) {
            this.view.showMessage("Choose a valid demo payment outcome.");
            return;
        }

        this.view.hideCheckout();
        this.beginVerification(status);
    }
}
