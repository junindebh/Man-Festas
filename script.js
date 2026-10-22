const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.category-chip').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category-chip').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = filter !== 'todos' && card.dataset.category !== filter;
    });
  });
});

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
    'doces': 'Doces',
    'cupcakes': 'Cupcakes'
  };
  if (categorySelect && categoryNames[category]) categorySelect.value = categoryNames[category];
}));

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
document.getElementById('year').textContent = new Date().getFullYear();
