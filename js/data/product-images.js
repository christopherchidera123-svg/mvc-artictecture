const UNSPLASH_IMAGES = [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
];

export const PRODUCT_IMAGE_BY_ID = {};

for (let categoryIndex = 1; categoryIndex <= 20; categoryIndex += 1) {
    for (let itemIndex = 1; itemIndex <= 10; itemIndex += 1) {
        const productId = `product-${categoryIndex}-${itemIndex}`;
        PRODUCT_IMAGE_BY_ID[productId] = UNSPLASH_IMAGES[(categoryIndex * itemIndex + itemIndex) % UNSPLASH_IMAGES.length];
    }
}

for (let index = 1; index <= 25; index += 1) {
    PRODUCT_IMAGE_BY_ID[`apple-other-${index}`] = UNSPLASH_IMAGES[(index * 3 + 5) % UNSPLASH_IMAGES.length];
}

const applePhoneModels = [
    ["iPhone 12", 64], ["iPhone 12", 128], ["iPhone 12 mini", 64], ["iPhone 12 Pro", 128], ["iPhone 12 Pro Max", 128], ["iPhone 13", 128], ["iPhone 13 mini", 128], ["iPhone 13 Pro", 128], ["iPhone 13 Pro Max", 128], ["iPhone 14", 128], ["iPhone 14 Plus", 128], ["iPhone 14 Pro", 128], ["iPhone 14 Pro Max", 128], ["iPhone 15", 128], ["iPhone 15 Plus", 128], ["iPhone 15 Pro", 128], ["iPhone 15 Pro Max", 256], ["iPhone 16", 128], ["iPhone 16 Plus", 128], ["iPhone 16 Pro", 128], ["iPhone 16 Pro Max", 256], ["iPhone 17", 256], ["iPhone 17e", 256], ["iPhone Air", 256], ["iPhone 17 Pro", 256], ["iPhone 17 Pro Max", 256], ["iPhone Duo", 256], ["iPhone 18 Pro", 256], ["iPhone 18 Pro Max", 256], ["iPhone 18 Pro Max", 512], ["iPhone 18 Pro Max", 2048],
];

applePhoneModels.forEach(([name, storage], index) => {
    const productId = `apple-${name.toLowerCase().replaceAll(" ", "-")}-${storage}-${index}`;
    PRODUCT_IMAGE_BY_ID[productId] = UNSPLASH_IMAGES[(index + storage) % UNSPLASH_IMAGES.length];
});
