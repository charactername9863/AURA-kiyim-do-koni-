const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const loginButton = document.querySelector('.login-button');

if (window.location.search.includes('logout=1')) {
	window.localStorage.removeItem('aura-auth');
}

if (window.location.pathname.endsWith('index.html') && window.localStorage.getItem('aura-auth') === 'true') {
	window.location.href = 'store.html';
}

if (loginForm && emailInput && passwordInput && loginButton) {
	const statusMessage = document.createElement('p');
	statusMessage.className = 'form-status';
	statusMessage.setAttribute('role', 'status');
	statusMessage.setAttribute('aria-live', 'polite');
	loginForm.append(statusMessage);

	const passwordToggle = document.createElement('button');
	passwordToggle.type = 'button';
	passwordToggle.textContent = 'Show password';
	passwordToggle.setAttribute('aria-controls', 'password');
	passwordToggle.setAttribute('aria-pressed', 'false');
	passwordToggle.style.cssText = 'border: 0; background: transparent; color: #4057d6; cursor: pointer; font-size: 0.8rem; justify-self: start;';
	passwordInput.insertAdjacentElement('afterend', passwordToggle);

	passwordToggle.addEventListener('click', () => {
		const isPasswordVisible = passwordInput.type === 'text';
		passwordInput.type = isPasswordVisible ? 'password' : 'text';
		passwordToggle.textContent = isPasswordVisible ? 'Show password' : 'Hide password';
		passwordToggle.setAttribute('aria-pressed', String(!isPasswordVisible));
	});

	const clearStatus = () => {
		statusMessage.textContent = '';
		statusMessage.removeAttribute('data-state');
	};

	emailInput.addEventListener('input', clearStatus);
	passwordInput.addEventListener('input', clearStatus);
	confirmPasswordInput?.addEventListener('input', clearStatus);

	loginForm.addEventListener('submit', (event) => {
		event.preventDefault();

		if (!loginForm.checkValidity()) {
			statusMessage.textContent = 'Please complete both fields correctly.';
			statusMessage.dataset.state = 'error';
			loginForm.reportValidity();
			return;
		}

		if (confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
			statusMessage.textContent = 'Passwords do not match.';
			statusMessage.dataset.state = 'error';
			confirmPasswordInput.focus();
			return;
		}

		loginButton.disabled = true;
		const isSignup = Boolean(confirmPasswordInput);
		loginButton.textContent = isSignup ? 'Creating account...' : 'Signing in...';
		statusMessage.textContent = 'Checking your details...';
		statusMessage.dataset.state = 'loading';

		window.setTimeout(() => {
			loginButton.disabled = false;
			loginButton.textContent = isSignup ? 'Create account' : 'Sign in';
			statusMessage.textContent = isSignup
				? 'Demo mode: your account form is ready to connect to a backend.'
				: 'Demo mode: your login form is ready to connect to a backend.';
			statusMessage.dataset.state = 'success';
			window.localStorage.setItem('aura-auth', 'true');
			window.location.href = 'store.html';
		}, 900);
	});
}

const productGrid = document.querySelector('.product-grid');
const settingsForm = document.querySelector('#settings-form');
const languageSelects = document.querySelectorAll('.language-select, select[name="language"]');
const avatarInputs = document.querySelectorAll('.avatar-input');
const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png';

const savedAvatar = window.localStorage.getItem('aura-avatar') || defaultAvatar;
document.querySelectorAll('.account-avatar').forEach((avatar) => {
	avatar.src = savedAvatar;
});

avatarInputs.forEach((input) => {
	input.addEventListener('change', () => {
		const selectedFile = input.files?.[0];
		if (!selectedFile || !selectedFile.type.startsWith('image/')) {
			return;
		}

		const reader = new FileReader();
		reader.addEventListener('load', () => {
			window.localStorage.setItem('aura-avatar', reader.result);
			document.querySelectorAll('.account-avatar').forEach((avatar) => {
				avatar.src = reader.result;
			});
		});
		reader.readAsDataURL(selectedFile);
	});
});

const languageText = {
	en: {
		account: 'Account',
		settings: 'Settings',
		backToStore: 'Back to store',
		cart: 'Cart',
		search: 'Search products...',
		checkout: 'Checkout',
		emptyCart: 'Your cart is empty.',
		total: 'Total',
		deliveryBanner: 'Free delivery across Uzbekistan on orders over $30', openBukhara: 'Open every day · Bukhara', deliverTo: 'Deliver to',
		allProducts: 'All products', clothing: 'Clothing', gaming: 'Gaming', electronics: 'Electronics', homeLifestyle: 'Home & lifestyle', sport: 'Sport', deals: 'Deals',
		auraWeek: 'AURA WEEK · 01', freshStyles: 'Fresh styles,<br><em>better prices.</em>', saleCopy: 'Save up to 40% on selected clothing and everyday essentials.', shopSale: 'Shop the sale <span>→</span>', playMore: 'PLAY MORE', gamingPicks: 'Gaming picks<br>from $9.99', exploreGaming: 'Explore gaming <span>→</span>', deliveryDay: 'DELIVERY DAY', freeDelivery: 'Free delivery<br>across Uzbekistan', orderOver: 'On every order over $30.', startShopping: 'Start shopping <span>→</span>',
		bukharaUzbekistan: 'Bukhara · Uzbekistan', heritagePieces: 'Heritage pieces.<br><em>Modern spirit.</em>', heroCopy: 'AURA is a Bukhara clothing house blending Uzbek craft, soft natural fabrics, and an effortless modern silhouette.', exploreCollection: 'Explore collection', justIn: 'Just in', newArrivals: 'New arrivals', viewAll: 'View all', accountSettings: 'AURA account settings', manageYour: 'Manage your', shoppingExperience: 'Shopping experience', yourPreferences: 'Your preferences', settingsTitle: 'Settings', makeAura: 'Make AURA feel right for you.', profile: 'Profile', updateDetails: 'Update the details used for your shopping experience.', displayName: 'Display name', emailAddress: 'Email address', deliveryLocation: 'Delivery location', currency: 'Currency', language: 'Language', preferences: 'Preferences', chooseNotifications: 'Choose what you would like to receive from AURA.', saleAlerts: 'Sale alerts', saleAlertsCopy: 'Get notified when selected products go on sale.', newArrivalsSetting: 'New arrivals', newArrivalsCopy: 'Receive updates about new collections and products.', appearance: 'Appearance', chooseAppearance: 'Choose how the marketplace looks to you.', theme: 'Theme', saveSettings: 'Save settings', cancel: 'Cancel'
	},
	ru: {
		account: 'Аккаунт',
		settings: 'Настройки',
		backToStore: 'Вернуться в магазин',
		cart: 'Корзина',
		search: 'Поиск товаров...',
		checkout: 'Оформить заказ',
		emptyCart: 'Ваша корзина пуста.',
		total: 'Итого',
		deliveryBanner: 'Бесплатная доставка по Узбекистану от $30', openBukhara: 'Открыты каждый день · Бухара', deliverTo: 'Доставка в',
		allProducts: 'Все товары', clothing: 'Одежда', gaming: 'Игры', electronics: 'Электроника', homeLifestyle: 'Дом и быт', sport: 'Спорт', deals: 'Скидки',
		auraWeek: 'НЕДЕЛЯ AURA · 01', freshStyles: 'Свежий стиль,<br><em>лучшие цены.</em>', saleCopy: 'Скидка до 40% на одежду и товары для повседневной жизни.', shopSale: 'Смотреть скидки <span>→</span>', playMore: 'ИГРАЙТЕ БОЛЬШЕ', gamingPicks: 'Игровые товары<br>от $9.99', exploreGaming: 'Смотреть игры <span>→</span>', deliveryDay: 'ДЕНЬ ДОСТАВКИ', freeDelivery: 'Бесплатная доставка<br>по Узбекистану', orderOver: 'При заказе от $30.', startShopping: 'Начать покупки <span>→</span>',
		bukharaUzbekistan: 'Бухара · Узбекистан', heritagePieces: 'Традиции рядом.<br><em>Современный дух.</em>', heroCopy: 'AURA — магазин одежды из Бухары, где узбекские традиции сочетаются с натуральными тканями и современным стилем.', exploreCollection: 'Смотреть коллекцию', justIn: 'Новинки', newArrivals: 'Новые товары', viewAll: 'Смотреть все', accountSettings: 'Настройки аккаунта AURA', manageYour: 'Управляйте своей', shoppingExperience: 'покупками', yourPreferences: 'Ваши предпочтения', settingsTitle: 'Настройки', makeAura: 'Настройте AURA под себя.', profile: 'Профиль', updateDetails: 'Обновите данные для удобных покупок.', displayName: 'Имя', emailAddress: 'Электронная почта', deliveryLocation: 'Адрес доставки', currency: 'Валюта', language: 'Язык', preferences: 'Предпочтения', chooseNotifications: 'Выберите уведомления от AURA.', saleAlerts: 'Скидки', saleAlertsCopy: 'Получайте уведомления о снижении цен.', newArrivalsSetting: 'Новинки', newArrivalsCopy: 'Получайте новости о коллекциях и товарах.', appearance: 'Внешний вид', chooseAppearance: 'Выберите вид магазина.', theme: 'Тема', saveSettings: 'Сохранить настройки', cancel: 'Отмена'
	},
	uz: {
		account: 'Profil',
		settings: 'Sozlamalar',
		backToStore: 'Do‘konga qaytish',
		cart: 'Savat',
		search: 'Tovarlarni qidirish...',
		checkout: 'Buyurtma berish',
		emptyCart: 'Savatingiz bo‘sh.',
		total: 'Jami',
		deliveryBanner: 'O‘zbekiston bo‘ylab $30 dan yuqori buyurtmalarga bepul yetkazib berish', openBukhara: 'Har kuni ochiq · Buxoro', deliverTo: 'Yetkazib berish manzili',
		allProducts: 'Barcha tovarlar', clothing: 'Kiyimlar', gaming: 'O‘yinlar', electronics: 'Elektronika', homeLifestyle: 'Uy va turmush', sport: 'Sport', deals: 'Chegirmalar',
		auraWeek: 'AURA HAFTALIGI · 01', freshStyles: 'Yangi uslub,<br><em>qulay narxlar.</em>', saleCopy: 'Tanlangan kiyimlar va kundalik mahsulotlarga 40% gacha chegirma.', shopSale: 'Chegirmalarni ko‘rish <span>→</span>', playMore: 'KO‘PROQ O‘YNA', gamingPicks: 'O‘yin mahsulotlari<br>$9.99 dan', exploreGaming: 'O‘yinlarni ko‘rish <span>→</span>', deliveryDay: 'YETKAZIB BERISH KUNI', freeDelivery: 'O‘zbekiston bo‘ylab<br>bepul yetkazib berish', orderOver: '$30 dan yuqori buyurtmalarga.', startShopping: 'Xaridni boshlash <span>→</span>',
		bukharaUzbekistan: 'Buxoro · O‘zbekiston', heritagePieces: 'An’anaviy uslub.<br><em>Zamonaviy ruh.</em>', heroCopy: 'AURA — Buxorodagi kiyim do‘koni bo‘lib, o‘zbekona hunarmandchilik, tabiiy matolar va zamonaviy uslubni birlashtiradi.', exploreCollection: 'Kolleksiyani ko‘rish', justIn: 'Yangi kelganlar', newArrivals: 'Yangi tovarlar', viewAll: 'Barchasini ko‘rish', accountSettings: 'AURA akkaunt sozlamalari', manageYour: 'Boshqaring', shoppingExperience: 'xarid tajribangizni', yourPreferences: 'Sizning tanlovlaringiz', settingsTitle: 'Sozlamalar', makeAura: 'AURA’ni o‘zingizga moslang.', profile: 'Profil', updateDetails: 'Xarid tajribangiz uchun ma’lumotlarni yangilang.', displayName: 'Ism', emailAddress: 'Elektron pochta', deliveryLocation: 'Yetkazib berish manzili', currency: 'Valyuta', language: 'Til', preferences: 'Tanlovlar', chooseNotifications: 'AURA’dan qanday xabarlar olishni tanlang.', saleAlerts: 'Chegirma xabarlari', saleAlertsCopy: 'Tovarlar chegirmaga tushganda xabar oling.', newArrivalsSetting: 'Yangi tovarlar', newArrivalsCopy: 'Yangi kolleksiyalar haqida xabar oling.', appearance: 'Ko‘rinish', chooseAppearance: 'Do‘kon ko‘rinishini tanlang.', theme: 'Mavzu', saveSettings: 'Sozlamalarni saqlash', cancel: 'Bekor qilish'
	}
};

const applyLanguage = (language) => {
	const selectedLanguage = languageText[language] ? language : 'en';
	const text = languageText[selectedLanguage];
	document.documentElement.lang = selectedLanguage;
	document.querySelectorAll('.language-select, select[name="language"]').forEach((select) => {
		select.value = selectedLanguage;
	});

	document.querySelectorAll('.account-link').forEach((element) => {
		const label = element.querySelector('span');
		if (label) {
			label.textContent = text.account;
		} else {
			element.textContent = element.href.includes('index.html') ? text.account : text.backToStore;
		}
	});
	document.querySelectorAll('.settings-link').forEach((element) => { element.textContent = text.settings; });
	document.querySelectorAll('.search-box input').forEach((element) => { element.placeholder = text.search; });
	document.querySelectorAll('.cart-button').forEach((element) => {
		if (element.firstChild) {
			element.firstChild.nodeValue = `${text.cart} `;
		}
	});
	document.querySelectorAll('.cart-page-link').forEach((element) => {
		if (element.firstChild) {
			element.firstChild.nodeValue = `${text.cart} `;
		}
	});
	document.querySelectorAll('.cart-panel-header h2').forEach((element) => { element.textContent = text.cart; });
	document.querySelectorAll('.cart-summary span').forEach((element) => { element.textContent = text.total; });
	document.querySelectorAll('.checkout-button').forEach((element) => { element.textContent = text.checkout; });
	document.querySelectorAll('.empty-cart').forEach((element) => { element.textContent = text.emptyCart; });
	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const translation = text[element.dataset.i18n];
		if (translation) {
			element.innerHTML = translation;
		}
	});
};

const savedLanguage = window.localStorage.getItem('aura-language') || 'en';
applyLanguage(savedLanguage);
languageSelects.forEach((select) => {
	select.addEventListener('change', (event) => {
		window.localStorage.setItem('aura-language', event.target.value);
		applyLanguage(event.target.value);
	});
});

if (settingsForm) {
	const savedSettings = JSON.parse(window.localStorage.getItem('aura-settings') || '{}');
	Object.entries(savedSettings).forEach(([name, value]) => {
		const field = settingsForm.elements.namedItem(name);
		if (!field) {
			return;
		}

		if (field.type === 'checkbox') {
			field.checked = value;
		} else {
			field.value = value;
		}
	});

	settingsForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const settings = {};
		Array.from(settingsForm.elements).forEach((field) => {
			if (field.name) {
				settings[field.name] = field.type === 'checkbox' ? field.checked : field.value;
			}
		});

		window.localStorage.setItem('aura-settings', JSON.stringify(settings));
		const status = settingsForm.querySelector('.settings-status');
		if (status) {
			status.textContent = 'Settings saved successfully.';
		}
	});
}

const promoCards = document.querySelectorAll('.promo-card');
let activePromo = 0;

if (promoCards.length > 1) {
	window.setInterval(() => {
		promoCards[activePromo].classList.remove('promo-active');
		activePromo = (activePromo + 1) % promoCards.length;
		promoCards[activePromo].classList.add('promo-active');
	}, 4200);
}

const productDescriptors = [
	'Heritage',
	'Classic',
	'Limited',
	'Essential',
	'Weekend',
	'Signature',
	'Urban',
	'Bukhara',
	'Studio',
	'Premium',
	'Lightweight',
	'Collector'
];
const productCatalog = [
	{
		category: 'Bukhara clothing',
		products: ['Atlas Shirt', 'Linen Tunic', 'Chapan Vest', 'Cotton Trousers'],
		images: ['photo-1521572163474-6864f9cf17ab', 'photo-1539008835657-9e8e9680c956', 'photo-1551028719-00167b16eac5']
	},
	{
		category: 'gaming',
		products: ['Wireless Controller', 'Arcade Headset', 'Desk Gaming Mat', 'Portable Console'],
		images: ['photo-1593305841991-05c297ba4575', 'photo-1546435770-a3e426bf472b', 'photo-1600080972464-8e5f35f63d08']
	},
	{
		category: 'electronics',
		products: ['Pocket Speaker', 'Smart Desk Lamp', 'Travel Charger', 'Mini Projector'],
		images: ['photo-1608043152269-423dbba4e7e1', 'photo-1507473885765-e6ed057f782c', 'photo-1496181133206-80ce9b88a853']
	},
	{
		category: 'lifestyle',
		products: ['Ceramic Mug', 'Canvas Journal', 'Leather Wallet', 'Daily Backpack'],
		images: ['photo-1495474472287-4d71bcdd2085', 'photo-1544816155-12df9643f363', 'photo-1553062407-98eeb64c6a62']
	},
	{
		category: 'sport',
		products: ['Training Sneakers', 'Yoga Mat', 'Running Cap', 'Gym Bottle'],
		images: ['photo-1542291026-7eec264c27ff', 'photo-1592432678016-e910b452f9a2', 'photo-1571019613454-1cb2f99b2d8b']
	},
	{
		category: 'games and hobbies',
		products: ['Strategy Board Game', 'Puzzle Set', 'Sketch Kit', 'Building Blocks'],
		images: ['photo-1610890716171-6b1bb98ffd09', 'photo-1585366119957-e9730b6d0f60', 'photo-1513364776144-60967b0f800f']
	}
];

if (productGrid) {
	const additionalProducts = 595;

	for (let productIndex = 0; productIndex < additionalProducts; productIndex += 1) {
		const group = productCatalog[productIndex % productCatalog.length];
		const descriptor = productDescriptors[productIndex % productDescriptors.length];
		const baseName = group.products[productIndex % group.products.length];
		const productName = `${descriptor} ${baseName} ${String(productIndex + 1).padStart(3, '0')}`;
		const imageId = group.images[productIndex % group.images.length];
		const imageSaturation = (productIndex % 9) - 4;
		const imageBrightness = (productIndex % 7) - 3;
		const price = (4.99 + ((productIndex * 17) % 40) + ((productIndex * 7) % 100) / 100).toFixed(2);
		const imageUrl = `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=900&q=80&sat=${imageSaturation}&bri=${imageBrightness}`;

		productGrid.insertAdjacentHTML('beforeend', `
			<article class="product-card generated-product">
				<div class="product-image">
					<img src="${imageUrl}" alt="${productName} from the AURA ${group.category} collection" loading="lazy">
				</div>
				<div class="product-info">
					<div>
						<h3>${productName} ${productIndex + 1}</h3>
						<p>${group.category}</p>
					</div>
					<strong>$${price}</strong>
				</div>
				<button class="buy-button" type="button">Add to cart</button>
			</article>
		`);
	}
}

const productSearch = document.querySelector('#product-search');
const searchEmptyMessage = document.querySelector('.search-empty');

productSearch?.addEventListener('input', (event) => {
	const searchTerm = event.target.value.trim().toLowerCase();
	let visibleProducts = 0;

	productGrid?.querySelectorAll('.product-card').forEach((productCard) => {
		const productName = productCard.querySelector('h3')?.textContent.trim().toLowerCase() || '';
		const matchesSearch = productName.startsWith(searchTerm);
		productCard.hidden = !matchesSearch;
		if (matchesSearch) {
			visibleProducts += 1;
		}
	});

	if (searchEmptyMessage) {
		searchEmptyMessage.hidden = visibleProducts > 0;
	}
});

const cartCount = document.querySelector('.cart-button span');
const buyButtons = document.querySelectorAll('.buy-button');
const cartButton = document.querySelector('.cart-button');
const cartPanel = document.querySelector('#cart-panel');
const closeCartButton = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartToast = document.querySelector('.cart-toast');
const clearCartButton = document.querySelector('.clear-cart-button');
const checkoutModal = document.querySelector('#checkout-modal');
const checkoutButtons = document.querySelectorAll('.checkout-button');
const closeCheckoutButton = document.querySelector('.close-checkout');
const checkoutForm = document.querySelector('.checkout-form');
const cart = JSON.parse(window.localStorage.getItem('aura-cart') || '[]');
let toastTimeout;

const showCartToast = () => {
	if (!cartToast) {
		return;
	}

	window.clearTimeout(toastTimeout);
	cartToast.textContent = 'Added to cart';
	cartToast.classList.add('visible');
	cartToast.setAttribute('aria-hidden', 'false');
	toastTimeout = window.setTimeout(() => {
		cartToast.classList.remove('visible');
		cartToast.setAttribute('aria-hidden', 'true');
	}, 1800);
};

const renderCart = () => {
	if (!cartItemsContainer || !cartTotal) {
		return;
	}

	const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
	document.querySelectorAll('.cart-button span, .nav-cart-count').forEach((countElement) => {
		countElement.textContent = String(itemCount);
	});
	cartTotal.textContent = `$${cart.reduce((total, item) => total + item.price * item.quantity, 0)}`;

	if (cart.length === 0) {
		const currentLanguage = window.localStorage.getItem('aura-language') || 'en';
		cartItemsContainer.innerHTML = `<p class="empty-cart">${languageText[currentLanguage].emptyCart}</p>`;
		return;
	}

	cartItemsContainer.innerHTML = cart.map((item) => `
		<article class="cart-item">
			<img src="${item.image}" alt="${item.name}">
			<div>
				<h3>${item.name}</h3>
				<p>${item.quantity} x $${item.price}</p>
			</div>
			<strong>$${item.price * item.quantity}</strong>
		</article>
	`).join('');
};

const saveCart = () => {
	window.localStorage.setItem('aura-cart', JSON.stringify(cart));
};

const setCartVisibility = (isOpen) => {
	if (!cartPanel || !cartButton) {
		return;
	}

	cartPanel.hidden = !isOpen;
	cartButton.setAttribute('aria-expanded', String(isOpen));
};

const setCheckoutVisibility = (isOpen) => {
	if (!checkoutModal) {
		return;
	}

	checkoutModal.hidden = !isOpen;
	if (isOpen) {
		checkoutForm?.querySelector('input')?.focus();
	}
};

checkoutButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (cart.length === 0) {
			showCartToast();
			if (cartToast) {
				cartToast.textContent = 'Add a product before checkout';
			}
			return;
		}
		setCheckoutVisibility(true);
	});
});

closeCheckoutButton?.addEventListener('click', () => setCheckoutVisibility(false));
checkoutModal?.addEventListener('click', (event) => {
	if (event.target === checkoutModal) {
		setCheckoutVisibility(false);
	}
});

checkoutForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!checkoutForm.checkValidity()) {
		checkoutForm.reportValidity();
		return;
	}

	const orderId = `AURA-${Date.now().toString().slice(-6)}`;
	const phone = checkoutForm.elements.namedItem('phone').value;
	window.localStorage.setItem('aura-last-order', JSON.stringify({ orderId, phone }));
	const status = checkoutForm.querySelector('.checkout-status');
	if (status) {
		status.textContent = `Order ${orderId} confirmed. SMS notification sent to ${phone} (demo).`;
	}
	checkoutForm.querySelector('.checkout-submit').disabled = true;
	cart.length = 0;
	saveCart();
	renderCart();
});

cartButton?.addEventListener('click', () => {
	setCartVisibility(cartPanel?.hidden === true);
});

closeCartButton?.addEventListener('click', () => setCartVisibility(false));

buyButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const productCard = button.closest('.product-card');
		const name = productCard?.querySelector('h3')?.textContent ?? 'Product';
		const price = Number(productCard?.querySelector('.product-info strong')?.textContent.replace('$', '')) || 0;
		const image = productCard?.querySelector('img')?.src ?? '';
		const existingItem = cart.find((item) => item.name === name);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.push({ name, price, image, quantity: 1 });
		}

		saveCart();
		renderCart();
		setCartVisibility(true);
		showCartToast();

		button.textContent = 'Added';
		button.classList.add('added');
		window.setTimeout(() => {
			button.textContent = 'Add to cart';
			button.classList.remove('added');
		}, 1000);
	});
});

clearCartButton?.addEventListener('click', () => {
	cart.length = 0;
	saveCart();
	renderCart();
});

renderCart();
