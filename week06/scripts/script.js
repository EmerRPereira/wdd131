/* script.js - DachsIce
   - produtos (10 items)
   - renderização, carrinho, total
   - idioma PT/EN
   - tema Dia/Noite
   - localStorage persistente
*/

/* ---------- Dados (produtos com i18n) ---------- */
const products = [
  { id: 'p1', name: { pt: 'Casquinha Tradicional', en: 'Classic Cone' }, price: 5.00, img: 'images/casquinha.svg', desc: { pt: 'Creme, Mista ou Chocolate', en: 'Cream, Mixed or Chocolate' } },
  { id: 'p2', name: { pt: 'Top Sundae 300ml (2 sabores)', en: '300ml Top Sundae (2 flavors)' }, price: 10.00, img: 'images/topsundae-beaglemor.svg', desc: { pt: '2 sabores', en: '2 flavors' } },
  { id: 'p3', name: { pt: 'Milkshake Chocolate', en: 'Chocolate Milkshake' }, price: 15.00, img: 'images/yorkshake-choc.svg', desc: { pt: 'Milkshake cremoso', en: 'Creamy milkshake' } },
  { id: 'p4', name: { pt: 'Açaí 300ml', en: 'Açaí Bowl 300ml' }, price: 18.00, img: 'images/showshow-acai.jpg', desc: { pt: 'Com morangos e leite condensado', en: 'With strawberries and condensed milk' } },
  { id: 'p5', name: { pt: 'Husky BROWNIE', en: 'Brownie Husky' }, price: 18.00, img: 'images/huskybrownie.jpg', desc: { pt: '3 sabores + cobertura', en: '3 scoops + toppings' } },
  { id: 'p6', name: { pt: 'Milkshake Morango', en: 'Strawberry Milkshake' }, price: 15.00, img: 'images/milkshake-mor.svg', desc: { pt: 'Com chantilly', en: 'With whipped cream' } },
  { id: 'p7', name: { pt: 'Panetone Gelado', en: 'Iced Panettone' }, price: 6.50, img: 'images/panetone-gelado.svg', desc: { pt: 'Monte o seu', en: 'Build your own' } },
  { id: 'p8', name: { pt: 'Bubble Waffle', en: 'Bubble Waffle' }, price: 26.00, img: 'images/bubblecone.jpg', desc: { pt: 'Waffle recheado', en: 'Filled waffle' } },
  { id: 'p9', name: { pt: 'Crepe', en: 'Crepe' }, price: 6.00, img: 'images/crepe-1.svg', desc: { pt: 'Vários Sabores', en: 'Various flavors' } },
  { id: 'p10', name: { pt: 'Cascão', en: 'Cascão' }, price: 7.00, img: 'images/cascao.svg   ', desc: { pt: 'Cobertura e tubete', en: 'Cover and tube' } }
];

/* ---------- Complementos ---------- */
const toppingsList = [
  { id: 't1', name: { pt: 'Granulado', en: 'Sprinkles' } },
  { id: 't2', name: { pt: 'Calda de chocolate', en: 'Chocolate Syrup' } },
  { id: 't3', name: { pt: 'Frutas', en: 'Fruits' } },
  { id: 't4', name: { pt: 'Farofa doce', en: 'Sweet Crumble' } }
];


/* ---------- Estado (persistido) ---------- */
let cart = JSON.parse(localStorage.getItem('dachsice_cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('dachsice_user')) || null;
let orders = JSON.parse(localStorage.getItem('dachsice_orders')) || [];
let lang = localStorage.getItem('dachsice_lang') || 'pt';
let theme = localStorage.getItem('dachsice_theme') || 'light';

/* ---------- Helpers ---------- */
const $ = (id) => document.getElementById(id);
const formatBRL = v => v.toFixed(2).replace('.', ',');
const formatUSD = v => v.toFixed(2);

/* Traduções (simples) */
const i18n = {
  pt: {
    nav_home: 'Início', nav_products: 'Produtos', nav_order: 'Pedido', nav_contact: 'Contato',
    hero_welcome: 'Bem-vindo à <span class="accent">DachsIce</span>',
    hero_sub: 'Sorvetes artesanais, milkshakes e açaí — feitos com carinho.',
    btn_view: 'Ver Produtos', products_title: 'Produtos', products_lead: 'Escolha entre sabores clássicos e combinações especiais.',
    order_title: 'Monte seu Pedido', label_product: 'Produto', label_quantity: 'Quantidade', label_toppings: 'Complementos (opcional)',
    btn_add: 'Adicionar ao carrinho', register_title: 'Cadastro de Cliente', label_name: 'Nome', label_email: 'E-mail', label_phone: 'Telefone',
    btn_save: 'Salvar', cart_title: 'Carrinho', cart_total: 'Total', btn_checkout: 'Finalizar Pedido', btn_clear: 'Limpar',
    contact_title: 'Contato & Local', contact_address: 'Endereço: Rua Deuputado Waldemiro Pedroso, 1668 — Novo Mundo — Curitiba, PR',
    contact_hours: 'Horário: Monday–Saturday • 12:00–20:00',
    msg_cart_empty: 'Nenhum item no carrinho.', msg_add_success: 'Item adicionado ao carrinho.', msg_fill_user: 'Cadastre-se antes de finalizar.',
    msg_order_done: 'Pedido finalizado! ID: ', msg_confirm_clear: 'Limpar o carrinho?', msg_invalid: 'Por favor preencha os dados corretamente.'
  },
  en: {
    nav_home: 'Home', nav_products: 'Products', nav_order: 'Order', nav_contact: 'Contact',
    hero_welcome: 'Welcome to <span class="accent">DachsIce</span>',
    hero_sub: 'Artisanal ice cream, milkshakes and açaí — made with care.',
    btn_view: 'View Products', products_title: 'Products', products_lead: 'Choose from classic flavors and special combos.',
    order_title: 'Build your Order', label_product: 'Product', label_quantity: 'Quantity', label_toppings: 'Toppings (optional)',
    btn_add: 'Add to cart', register_title: 'Customer Registration', label_name: 'Name', label_email: 'Email', label_phone: 'Phone',
    btn_save: 'Save', cart_title: 'Cart', cart_total: 'Total', btn_checkout: 'Checkout', btn_clear: 'Clear',
    contact_title: 'Contact & Location', contact_address: 'Address: Rua Deuputado Waldemiro Pedroso, 1668 — Novo Mundo — Curitiba, PR',
    contact_hours: 'Hours: Monday–Saturday • 12:00–20:00',
    msg_cart_empty: 'No items in cart.', msg_add_success: 'Item added to cart.', msg_fill_user: 'Please register before checkout.',
    msg_order_done: 'Order completed! ID: ', msg_confirm_clear: 'Clear the cart?', msg_invalid: 'Please fill out fields correctly.'
  }
};

/* Elementos DOM */
const productGrid = $('productGrid');
const productSelect = $('productSelect');
const toppingsDiv = $('toppings');
const cartItems = $('cartItems');
const cartTotalEl = $('cartTotal');
const orderForm = $('orderForm');
const registerForm = $('registerForm');
const savedUser = $('savedUser');
const checkoutBtn = $('checkoutBtn');
const clearCartBtn = $('clearCartBtn');
const langSelect = $('langSelect');
const themeToggle = $('themeToggle');
const menuToggle = $('menuToggle');
const mainNav = $('mainNav');
const yearEl = $('year');

/* Inicializações */
yearEl.textContent = new Date().getFullYear();
langSelect.value = lang;
applyTheme(theme);
translatePage();
renderProducts();
renderProductSelect();
renderToppings();
renderCart();
renderUser();

/* ---------- Event Listeners ---------- */

/* Menu toggle (mobile) */
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  const hidden = mainNav.getAttribute('aria-hidden') === 'true';
  mainNav.setAttribute('aria-hidden', String(!hidden));
});

/* Language change */
langSelect.addEventListener('change', (e) => {
  lang = e.target.value;
  localStorage.setItem('dachsice_lang', lang);
  translatePage();
  renderProducts();
  renderProductSelect();
  renderCart();
  renderToppings();
});

/* Theme toggle */
themeToggle.addEventListener('click', () => {
  theme = (theme === 'light') ? 'dark' : 'light';
  applyTheme(theme);
  localStorage.setItem('dachsice_theme', theme);
});

/* Order form submit */
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const productId = productSelect.value;
  const qty = Number($('quantity').value || 1);
  const selectedToppings = Array.from(toppingsDiv.querySelectorAll('input[type=checkbox]:checked')).map(i => i.value);

  if (!productId || qty < 1) {
    return alert(i18n[lang].msg_invalid);
  }

  const product = products.find(p => p.id === productId);
  if (!product) { alert(i18n[lang].msg_invalid); return; }

  const item = {
    id: product.id,
    name: product.name[lang],
    price: product.price,
    qty,
    toppings: selectedToppings,
    total: +(product.price * qty)
  };

  addToCart(item);
  orderForm.reset();
  alert(i18n[lang].msg_add_success);
});

/* Register form submit */
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('name').value.trim();
  const email = $('email').value.trim();
  const phone = $('phone').value.trim();
  if (!name || !email || !phone) return alert(i18n[lang].msg_invalid);

  currentUser = { name, email, phone, createdAt: new Date().toISOString() };
  localStorage.setItem('dachsice_user', JSON.stringify(currentUser));
  renderUser();
});

/* Checkout */
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return alert(i18n[lang].msg_cart_empty);
  if (!currentUser) return alert(i18n[lang].msg_fill_user);

  const order = {
    id: 'ord_' + Date.now(),
    user: currentUser,
    items: cart,
    total: cart.reduce((sum,i) => sum + (i.price * i.qty), 0),
    createdAt: new Date().toISOString(),
    status: 'Received'
  };

  orders.push(order);
  localStorage.setItem('dachsice_orders', JSON.stringify(orders));

  cart = [];
  localStorage.setItem('dachsice_cart', JSON.stringify(cart));
  renderCart();
  alert(i18n[lang].msg_order_done + order.id);
});

/* Clear cart */
clearCartBtn.addEventListener('click', () => {
  if (!confirm(i18n[lang].msg_confirm_clear)) return;
  cart = [];
  localStorage.setItem('dachsice_cart', JSON.stringify(cart));
  renderCart();
});

/* Keyboard shortcut (Ctrl/Cmd + O) focus on product select */
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'o' && (e.ctrlKey || e.metaKey)) {
    productSelect.focus();
  }
});

/* ---------- Funções principais ---------- */

/* Aplica tema */
function applyTheme(t) {
  const body = document.body;
  if (t === 'dark') {
    body.classList.add('tema-dark');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.remove('tema-dark');
    themeToggle.textContent = '🌞';
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

/* Tradução simples da interface (usa data-i18n attributes onde aplicável) */
function translatePage() {
  // elementos com data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = i18n[lang] && i18n[lang][key] ? i18n[lang][key] : '';
    // manter html quando necessário (hero_welcome tem span)
    if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
      el.placeholder = txt;
    } else {
      el.innerHTML = txt;
    }
  });
}

/* Renderiza produtos (cards) */
function renderProducts() {
  productGrid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name[lang]}" loading="lazy">
      <h4>${p.name[lang]}</h4>
      <p class="desc">${p.desc[lang]}</p>
      <div class="price">${currencyLabel(p.price)}</div>
      <div style="margin-top:0.6rem;display:flex;gap:0.4rem;flex-wrap:wrap;">
        <button class="btn" data-add="${p.id}" aria-label="${p.name[lang]} - ${getLabel('btn_add')}">
          ${getLabel('btn_add')}
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Delegação: adiciona ao carrinho ao clicar no único botão
  productGrid.onclick = (e) => {
    const btn = e.target.closest('button[data-add]');
    if (!btn) return;

    const id = btn.getAttribute('data-add');
    const prod = products.find(x => x.id === id);
    if (!prod) return;

    const item = {
      id: prod.id,
      name: prod.name[lang],
      price: prod.price,
      qty: 1,
      toppings: [],
      total: prod.price
    };

    addToCart(item);
    alert(i18n[lang].msg_add_success);
  };
}


/* Render select de produtos */
function renderProductSelect() {
  productSelect.innerHTML = `<option value="">-- ${getLabel('label_product')} --</option>` + products.map(p => `
    <option value="${p.id}">${p.name[lang]} — R$ ${formatBRL(p.price)}</option>
  `).join('');
}

/* Render toppings (exemplo simples) */
function renderToppings() {
  const cont = $("toppings");
  cont.innerHTML = "";

  toppingsList.forEach(top => {
    const div = document.createElement("label");
    div.className = "topping-item";

    div.innerHTML = `
      <input type="checkbox" value="${top.id}">
      <span>${top.name[lang]}</span>
    `;

    cont.appendChild(div);
  });
}


/* Adiciona item ao carrinho (se já existir mesmo produto e toppings, incrementa) */
function addToCart(item) {
  const existsIndex = cart.findIndex(ci => ci.id === item.id && JSON.stringify(ci.toppings) === JSON.stringify(item.toppings));
  if (existsIndex > -1) {
    cart[existsIndex].qty += item.qty;
    cart[existsIndex].total = +(cart[existsIndex].qty * cart[existsIndex].price);
  } else {
    cart.push(item);
  }
  localStorage.setItem('dachsice_cart', JSON.stringify(cart));
  renderCart();
}

/* Renderiza carrinho (itens + total) */
function renderCart() {
  if (!cart || cart.length === 0) {
    cartItems.textContent = i18n[lang].msg_cart_empty;
    cartTotalEl.textContent = currencyLabel(0);
    return;
  }

  // usar map + reduce (array methods)
  cartItems.innerHTML = cart.map((it, idx) => `
    <div class="cart-row" data-idx="${idx}">
      <div>
        <strong>${it.name}</strong> <small> x ${it.qty}</small><br>
        <small style="color:var(--muted)">  ${it.toppings.length ? it.toppings
      .map(tid => toppingsList.find(t => t.id === tid)?.name[lang] || tid)
      .join(', ')
    : ''}
</small>
      </div>
      <div style="text-align:right">
        <div>${currencyLabel(it.total)}</div>
        <div style="margin-top:0.4rem">
          <button class="btn small" data-decrease="${idx}">-</button>
          <button class="btn small" data-increase="${idx}">+</button>
          <button class="btn ghost small" data-remove="${idx}">Remover</button>
        </div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  cartTotalEl.textContent = currencyLabel(total);

  // adicionar listeners nos botões do carrinho (delegation)
  cartItems.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', (e) => {
    const i = Number(e.target.getAttribute('data-remove'));
    cart.splice(i,1);
    localStorage.setItem('dachsice_cart', JSON.stringify(cart));
    renderCart();
  }));
  cartItems.querySelectorAll('[data-increase]').forEach(btn => btn.addEventListener('click', (e) => {
    const i = Number(e.target.getAttribute('data-increase'));
    cart[i].qty += 1;
    cart[i].total = +(cart[i].qty * cart[i].price);
    localStorage.setItem('dachsice_cart', JSON.stringify(cart));
    renderCart();
  }));
  cartItems.querySelectorAll('[data-decrease]').forEach(btn => btn.addEventListener('click', (e) => {
    const i = Number(e.target.getAttribute('data-decrease'));
    if (cart[i].qty > 1) {
      cart[i].qty -= 1;
      cart[i].total = +(cart[i].qty * cart[i].price);
    } else {
      // confirma remoção
      if (confirm(i18n[lang].msg_confirm_clear)) cart.splice(i,1);
    }
    localStorage.setItem('dachsice_cart', JSON.stringify(cart));
    renderCart();
  }));
}

/* Render usuário salvo */
function renderUser() {
  if (currentUser) {
    savedUser.textContent = `${getLabel('register_title')}: ${currentUser.name} — ${currentUser.email}`;
  } else {
    savedUser.textContent = i18n[lang].msg_invalid;
  }
}

/* Utils de labels traduzíveis */
function getLabel(key) {
  return (i18n[lang] && i18n[lang][key]) ? i18n[lang][key] : key;
}

/* Currency label (ajustar por idioma) */
function currencyLabel(value) {
  if (lang === 'pt') return `R$ ${formatBRL(value)}`;
  return `$ ${formatUSD(value)}`;
}

/* Safe localStorage test */
try { localStorage.setItem('__test','1'); localStorage.removeItem('__test'); }
catch(err){ console.warn('localStorage não disponível. Dados não serão salvos.'); }

/* Inicial: recolocar dados de storage e aplicar UI dinamicamente */
(function initFromStorage() {
  // já carregamos cart e user no topo; apenas sincronizar UI
  renderCart();
  renderUser();
})();
