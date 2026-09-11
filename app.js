const PRODUCTS = {
  tomato: {
    id: 'tomato',
    name: 'помидор',
    label: 'Помидор',
    art: 'tomato',
    title: 'Кажется,<br>у нас томатч!',
    mood: 'Сочный знакомец найден',
    kcal: '18', protein: '0,9 г', fat: '0,2 г', carbs: '3,9 г', fiber: '1,2 г',
    note: 'Средние значения',
    adviceEyebrow: 'ИДЕЯ ДЛЯ ПЕРЕКУСА',
    adviceTitle: 'Томат ищет компанию',
    adviceText: 'Добавь цельнозерновой тост и творог или хумус: больше белка и клетчатки, а перекус — сытнее.',
    adviceJoke: 'Вкусно. Сытно. Без диетических драм. 😎'
  },
  banana: {
    id: 'banana',
    name: 'банан',
    label: 'Банан',
    art: 'banana',
    title: 'Бананально,<br>но гениально!',
    mood: 'Мягкий заряд найден',
    kcal: '89', protein: '1,1 г', fat: '0,3 г', carbs: '22,8 г', fiber: '2,6 г',
    note: 'Средние значения',
    adviceEyebrow: 'ИДЕЯ ДЛЯ ПЕРЕКУСА',
    adviceTitle: 'Банан зовёт овсянку',
    adviceText: 'Нарежь банан к овсянке или йогурту. Орехи добавят хруста и немного белка.',
    adviceJoke: 'Жёлтый, весёлый, без сложных манёвров 🍌'
  },
  milk: {
    id: 'milk',
    name: 'молоко',
    label: 'Молоко',
    art: 'milk',
    title: 'Молочный,<br>но с характером!',
    mood: 'Белковый знакомец найден',
    kcal: '52', protein: '3,0 г', fat: '2,5 г', carbs: '4,7 г', fiber: '0 г',
    note: 'для молока 2,5%',
    adviceEyebrow: 'ИДЕЯ ДЛЯ ПЕРЕКУСА',
    adviceTitle: 'Молоку нужен напарник',
    adviceText: 'Соедини с цельнозерновыми хлопьями и ягодами — будет и вкусно, и сытнее.',
    adviceJoke: 'Кальций пришёл, скуку не захватил 🥛'
  },
  avocado: {
    id: 'avocado',
    name: 'авокадо',
    label: 'Авокадо',
    art: 'avocado',
    title: 'Авокадо,<br>а ты хорош!',
    mood: 'Кремовый герой найден',
    kcal: '160', protein: '2,0 г', fat: '14,7 г', carbs: '8,5 г', fiber: '6,7 г',
    note: 'Средние значения',
    adviceEyebrow: 'ИДЕЯ ДЛЯ ПЕРЕКУСА',
    adviceTitle: 'Авокадо любит тост',
    adviceText: 'Разомни на тост, добавь яйцо или фасоль и каплю лимона. Кремово и бодро.',
    adviceJoke: 'Зелёный, но точно не скучный 🥑'
  },
  bread: {
    id: 'bread',
    name: 'хлеб',
    label: 'Хлеб',
    art: 'bread',
    title: 'Хлеб всему<br>перекус!',
    mood: 'Хрустящий герой найден',
    kcal: '247', protein: '8,5 г', fat: '3,3 г', carbs: '48,3 г', fiber: '6,0 г',
    note: 'для цельнозернового',
    adviceEyebrow: 'ИДЕЯ ДЛЯ ПЕРЕКУСА',
    adviceTitle: 'Хлебу — сочную начинку',
    adviceText: 'Добавь хумус, овощи или творожный сыр. Так обычный ломтик станет командой.',
    adviceJoke: 'Бутерброд? Маленький отпуск 🥪'
  }
};

const state = { product: PRODUCTS.tomato, toastTimer: null };
const $ = (selector) => document.querySelector(selector);

function svgUse(id, className = '') {
  return `<svg class="${className}" aria-hidden="true"><use href="#${id}"></use></svg>`;
}

function productArt(type, className = '') {
  return svgUse(type, className);
}

function renderPicker() {
  const picker = $('#productPicker');
  picker.innerHTML = Object.values(PRODUCTS).map((product) => `
    <button class="product-card ${product.id === state.product.id ? 'is-selected' : ''}" data-product="${product.id}" role="listitem" aria-label="Выбрать: ${product.label}">
      ${productArt(product.art)}
      <span>${product.label}</span>
    </button>
  `).join('');
  picker.querySelectorAll('[data-product]').forEach((button) => {
    button.addEventListener('click', () => {
      state.product = PRODUCTS[button.dataset.product];
      renderPicker();
      showToast(`${state.product.label} выбран — жми «Сканировать» 💚`);
    });
  });
}

function showView(id) {
  document.querySelectorAll('.app-view').forEach((view) => view.classList.add('is-hidden'));
  $(id).classList.remove('is-hidden');
}

function setLoadingArt(product) {
  const target = $('#loadingProductArt');
  target.innerHTML = productArt(product.art);
  target.querySelector('svg').classList.add('loading-art-svg');
}

function setResultArt(product) {
  const target = $('#resultArt');
  target.innerHTML = `
    ${productArt(product.art, 'result-tomato')}
    ${productArt('bag', 'result-bag')}
    <span class="result-heart">♥</span>
  `;
  if (product.art !== 'tomato') {
    target.querySelector('.result-tomato').classList.add('other-result-art');
  }
}

function populateResult(product) {
  $('#resultName').textContent = product.name;
  $('#resultTitle').innerHTML = product.title;
  $('#resultMood').textContent = product.mood;
  $('#kcal').textContent = product.kcal;
  $('#protein').textContent = product.protein;
  $('#fat').textContent = product.fat;
  $('#carbs').textContent = product.carbs;
  $('#fiber').textContent = product.fiber;
  $('#nutritionNote').textContent = product.note;
  $('#adviceEyebrow').textContent = product.adviceEyebrow;
  $('#adviceTitle').textContent = product.adviceTitle;
  $('#adviceText').textContent = product.adviceText;
  $('#adviceJoke').textContent = product.adviceJoke;
  setResultArt(product);
}

function scanProduct() {
  setLoadingArt(state.product);
  $('#loadingTitle').textContent = state.product.id === 'tomato' ? 'Считываем вкусные вибрации…' : `Знакомимся с ${state.product.name}…`;
  $('#loadingSubtitle').textContent = 'Секундочку, проверяем калории и характер';
  $('#loadingJoke').textContent = state.product.id === 'tomato' ? 'Так-так, кто тут сочный?' : 'Так-так, что тут за вкусный тип?';
  showView('#loadingView');
  window.setTimeout(() => {
    populateResult(state.product);
    showView('#resultView');
  }, 1600);
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2500);
}

function closePrototype() {
  showView('#welcomeView');
  showToast('Фича закрыта, но помидор всё ещё верит в тебя 🍅');
}

function openOffers() {
  // Тестовая заглушка. В приложении здесь будет переход:
  // tsxapp://app/personal_offers_list
  showToast('Открываем персональные предложения 🎁');
}

function boot() {
  renderPicker();
  $('#scanButton').addEventListener('click', scanProduct);
  $('#bonusButton').addEventListener('click', openOffers);
  $('#againButton').addEventListener('click', () => showView('#welcomeView'));
  document.querySelectorAll('[data-action="close"]').forEach((button) => button.addEventListener('click', closePrototype));
}

document.addEventListener('DOMContentLoaded', boot);
