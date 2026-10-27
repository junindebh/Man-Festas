const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

// Código para abrir/fechar o menu no celular
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false');
}));

// Lógica de Categorias e Subcategorias do Catálogo
const mainChips = document.querySelectorAll('.category-chip');
const subNavs = document.querySelectorAll('.subcategory-nav');
const subChips = document.querySelectorAll('.sub-chip');
const cards = document.querySelectorAll('.product-card');

mainChips.forEach(button => {
  button.addEventListener('click', () => {
    // Atualiza a cor do botão principal ativo
    mainChips.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    // Mostra/esconde os botões das subcategorias
    subNavs.forEach(nav => {
      if (nav.id === 'sub-' + filter) {
        nav.style.display = 'flex';
        // Reseta a subcategoria para mostrar "Todos"
        nav.querySelectorAll('.sub-chip').forEach(sc => sc.classList.remove('active'));
        nav.querySelector('[data-sub="todos"]')?.classList.add('active');
      } else {
        nav.style.display = 'none';
      }
    });

    // Mostra os produtos corretos
    cards.forEach(card => {
      if (filter === 'todos') {
        card.hidden = false;
      } else {
        card.hidden = card.dataset.category !== filter;
      }
    });
  });
});

// Ação de clicar nas subcategorias (ex: Bolos no Pote, Doces Gourmet)
subChips.forEach(button => {
  button.addEventListener('click', () => {
    const parentNav = button.closest('.subcategory-nav');
    parentNav.querySelectorAll('.sub-chip').forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const mainFilter = document.querySelector('.category-chip.active')?.dataset.filter;
    const subFilter = button.dataset.sub;

    // Mostra os produtos exatos da subcategoria
    cards.forEach(card => {
      if (card.dataset.category === mainFilter) {
        if (subFilter === 'todos') {
          card.hidden = false;
        } else {
          card.hidden = card.dataset.subcategory !== subFilter;
        }
      } else {
        card.hidden = true;
      }
    });
  });
});

// Ação do botão "Consultar" preencher o formulário automaticamente
document.querySelectorAll('.interest-link').forEach(link => link.addEventListener('click', () => {
  const item = link.dataset.item || '';
  const field = document.getElementById('item');
  if (field) field.value = item;
  const category = link.closest('.product-card')?.dataset.category;
  const categorySelect = document.getElementById('category');
  
  const categoryNames = {
    'pegue-monte': 'Pegue e monte',
    'decoracao': 'Decoração',
    'bolos': 'Bolos',
    'doces': 'Doces'
  };
  if (categorySelect && categoryNames[category]) categorySelect.value = categoryNames[category];
}));

// Preparar e enviar a mensagem para o WhatsApp
const form = document.getElementById('quote-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value;
  const item = document.getElementById('item').value.trim();
  const date = document.getElementById('date').value;
  const details = document.getElementById('details').value.trim();
  const error = document.getElementById('form-error');
  
  if (!name || !category) { error.textContent = 'Preencha seu nome e escolha uma categoria.'; return; }
  error.textContent = '';
  
  const dateText = date ? new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR') : 'Ainda não definida';
  
  const message = `Olá! Meu nome é ${name}. Gostaria de informações sobre a Maná Festas e Confeitaria.
Categoria: ${category}
Item/tema: ${item || 'Não definido'}
Data do evento: ${dateText}
Detalhes: ${details || 'Sem detalhes adicionais'}
Poderiam me informar os valores e a disponibilidade?`;
  
  window.open(`https://wa.me/553189580961?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

// Atualiza o ano no rodapé automaticamente
document.getElementById('year').textContent = new Date().getFullYear();
