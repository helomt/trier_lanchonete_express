// Dados do cardápio com no mínimo 18 itens
const menuItems = [
    { id: 1, name: 'Hambúrguer Clássico', price: 25.00, emoji: '🍔' },
    { id: 2, name: 'Batata Frita', price: 12.00, emoji: '🍟' },
    { id: 3, name: 'Refrigerante Cola', price: 8.00, emoji: '🥤' },
    { id: 4, name: 'Milkshake de Morango', price: 18.00, emoji: '🍦' },
    { id: 5, name: 'Cheeseburguer Duplo', price: 30.00, emoji: '�🍔' },
    { id: 6, name: 'Nuggets de Frango', price: 15.00, emoji: '🍗' },
    { id: 7, name: 'Salada da Casa', price: 22.00, emoji: '🥗' },
    { id: 8, name: 'Sanduíche de Frango', price: 28.00, emoji: '🥪' },
    { id: 9, name: 'Anéis de Cebola', price: 14.00, emoji: '🧅' },
    { id: 10, name: 'Suco de Laranja', price: 10.00, emoji: '🍊' },
    { id: 11, name: 'Hambúrguer Vegano', price: 35.00, emoji: '🍔🌱' },
    { id: 12, name: 'Pizza Pedaço', price: 16.00, emoji: '🍕' },
    { id: 13, name: 'Açaí na Tigela', price: 20.00, emoji: '🍧' },
    { id: 14, name: 'Bolo de Chocolate', price: 12.00, emoji: '🍰' },
    { id: 15, name: 'Água Mineral', price: 5.00, emoji: '💧' },
    { id: 16, name: 'Sorvete Casquinha', price: 7.00, emoji: '🍦' },
    { id: 17, name: 'Hot Dog Simples', price: 18.00, emoji: '🌭' },
    { id: 18, name: 'Porção de Queijo', price: 17.00, emoji: '🧀' },
    { id: 19, name: 'Churros com Doce de Leite', price: 15.00, emoji: '🍩' },
    { id: 20, name: 'Café Expresso', price: 6.00, emoji: '☕' },
];


let carrinho = JSON.parse(localStorage.getItem('lanchoneteCarrinho')) || [];

const menuContainer = document.getElementById('menu-items');
const abrirCarrinhoLateralButton = document.getElementById('abrir-carrinho-lateral'); 
const carrinhoLateralElement = document.getElementById('carrinho-lateral'); 
const carrinhoList = document.getElementById('lista-carrinho'); 
const valorTotalElement = document.getElementById('valor-total');
const carrinhoBadge = document.getElementById('badge-carrinho');
const checkoutButton = document.getElementById('checkout-button');
const carrinhoVazioMessage = document.getElementById('mensagem-carrinho-vazio');
const feedbackToast = document.getElementById('feedback-toast');

// Inicializar o componente Offcanvas do Bootstrap
const offcanvas = new bootstrap.Offcanvas(carrinhoLateralElement);


function carregarMenu() {
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        const itemHtml = `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${item.emoji} ${item.name}</h5>
                        <p class="card-text flex-grow-1">R$ ${item.price.toFixed(2)}</p>
                        <button class="btn btn-primary mt-auto add-to-cart-btn" data-id="${item.id}">Adicionar ao Pedido</button>
                    </div>
                </div>
            </div>
        `;
        menuContainer.innerHTML += itemHtml;
    });
}


function addCarrinho(itemId) {
    const item = menuItems.find(i => i.id === parseInt(itemId));
    if (item) {
        const existingItem = carrinho.find(carrinhoItem => carrinhoItem.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            carrinho.push({ ...item, quantity: 1 });
        }
        showFeedback(`${item.name} adicionado! 👍`);
        saveCarrinho();
        carregarCarrinho();
    }
}


function carregarCarrinho() {
    carrinhoList.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        carrinhoVazioMessage.style.display = 'block';
        console.log("carrinho vazio")
    } else {
        carrinhoVazioMessage.style.display = 'none';
        carrinho.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const itemHtml = `
                <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                    <div class="d-flex align-items-center flex-grow-1">
                        <div class="btn-group btn-group-sm me-2" role="group" aria-label="Controles de Quantidade">
                            <button type="button" class="btn btn-outline-secondary decrease-quantity-btn" data-id="${item.id}">-</button>
                            <span class="btn btn-light pe-none">${item.quantity}</span>
                            <button type="button" class="btn btn-outline-secondary increase-quantity-btn" data-id="${item.id}">+</button>
                        </div>
                        <span class="fw-bold">${item.name}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="me-3">R$ ${(itemTotal).toFixed(2)}</span>
                        <button type="button" class="btn btn-outline-danger btn-sm remove-item-btn" data-id="${item.id}">
                            🗑️
                        </button>
                    </div>
                </li>
            `;
            carrinhoList.innerHTML += itemHtml;
        });
    }

    valorTotalElement.innerText = `R$ ${total.toFixed(2)}`;
    carrinhoBadge.innerText = carrinho.reduce((sum, item) => sum + item.quantity, 0); // Atualiza o badge do botão flutuante
}


function incremento(itemId) {
    const item = carrinho.find(carrinhoItem => carrinhoItem.id === parseInt(itemId));
    if (item) {
        item.quantity++;
        saveCarrinho();
        carregarCarrinho();
    }
}


function diminuir(itemId) {
    const item = carrinho.find(carrinhoItem => carrinhoItem.id === parseInt(itemId));
    if (item && item.quantity > 0) {
        item.quantity--;
        if (item.quantity === 0) {
            removerItem(itemId); 
        } else {
            saveCarrinho();
            carregarCarrinho();
        }
    }
}


function removerItem(itemId) {
    const comprimentoInicial = carrinho.length;
    carrinho = carrinho.filter(carrinhoItem => carrinhoItem.id !== parseInt(itemId));
    if (carrinho.length < comprimentoInicial) {
        showFeedback('Item removido do carrinho. 🗑️');
    }
    saveCarrinho();
    carregarCarrinho();
}


function saveCarrinho() {
    localStorage.setItem('lanchoneteCarrinho', JSON.stringify(carrinho));
}


function limparCarrinho() {
    carrinho = [];
    saveCarrinho();
    carregarCarrinho();
    showFeedback('Pedido finalizado! Obrigado. 😊');
    offcanvas.hide(); 
}


function showFeedback(message) {
    const feedbackMessageElement = document.getElementById('feedback-message');
    feedbackMessageElement.innerText = message;
    const toast = new bootstrap.Toast(feedbackToast);
    toast.show();
}


document.addEventListener('click', (e) => {

    if (e.target.classList.contains('add-to-cart-btn')) {
        addCarrinho(e.target.dataset.id);
    }
    
    else if (e.target.classList.contains('increase-quantity-btn')) {
        incremento (e.target.dataset.id);
    }
    
    else if (e.target.classList.contains('decrease-quantity-btn')) {
        diminuir(e.target.dataset.id);
    }
   
    else if (e.target.classList.contains('remove-item-btn')) {
        removerItem(e.target.dataset.id);
    }
});


checkoutButton.addEventListener('click', limparCarrinho);


abrirCarrinhoLateralButton.addEventListener('click', () => {
    offcanvas.show();
});


document.addEventListener('DOMContentLoaded', () => {
    carregarMenu();
    carregarCarrinho();
});
