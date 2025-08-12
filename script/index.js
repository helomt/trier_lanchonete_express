// Dados do cardápio
const menuItems = [
  {
    id: 1,
    name: "Mega Stack 2.0",
    price: 21.9,
    category: "Especial",
    image: "/img/menu/1_mega_stack.png",
  },
  {
    id: 2,
    name: "Mega Stack 3.0",
    price: 38.9,
    category: "Especial",
    image: "/img/menu/2_mega_stack_3.0.png",
  },
  {
    id: 3,
    name: "Express Barbecue Bacon",
    price: 29.9,
    category: "Especial",
    image: "/img/menu/3_bbq_bacon.png",
  },
  {
    id: 4,
    name: "Furious Express",
    price: 27.99,
    category: "Especial",
    image: "/img/menu/4_furious.png",
  },
  {
    id: 5,
    name: "Big Express",
    price: 38.99,
    category: "Carne",
    image: "/img/menu/5_big_express.png",
  },
  {
    id: 6,
    name: "Cheeseburguer Duplo",
    price: 25.9,
    category: "Carne",
    image: "/img/menu/6_cheeseburger_duplo.png",
  },
  {
    id: 7,
    name: "Cheddar Express",
    price: 11.99,
    category: "Carne",
    image: "/img/menu/7_cheddar.png",
  },
  {
    id: 8,
    name: "Chicken Crispy Express",
    price: 18.9,
    category: "Frango",
    image: "/img/menu/8_chicken_crispy.png",
  },
  {
    id: 9,
    name: "Veggie Express",
    price: 13.9,
    category: "Vegetariano",
    image: "/img/menu/9_vegetariano.png",
  },
  {
    id: 10,
    name: "Kids Burguer",
    price: 14.9,
    category: "Kids",
    image: "/img/menu/10_kids_burguer.png",
  },
  {
    id: 11,
    name: "Batata Frita",
    price: 13.99,
    category: "Acompanhamentos",
    image: "/img/menu/11_batata_frita.png",
  },
  {
    id: 12,
    name: "Balde de Batata",
    price: 29.8,
    category: "Acompanhamentos",
    image: "/img/menu/12_balde_batata.png",
  },
  {
    id: 13,
    name: "Onion Rings",
    price: 10.9,
    category: "Acompanhamentos",
    image: "/img/menu/13_onion_rings.png",
  },
  {
    id: 14,
    name: "Express Nuggets",
    price: 6.9,
    category: "Acompanhamentos",
    image: "/img/menu/14_express_chicken.png",
  },
  {
    id: 15,
    name: "Molho BBQ",
    price: 4.99,
    category: "Molhos",
    image: "/img/menu/15_molho_bbq.png",
  },
  {
    id: 16,
    name: "Molho Furioso",
    price: 5.99,
    category: "Molhos",
    image: "/img/menu/16_molho_furioso.png",
  },
  {
    id: 17,
    name: "Casquinha Baunilha",
    price: 5.5,
    category: "Sobremesa",
    image: "/img/menu/17_casquinha_baunilha.png",
  },
  {
    id: 18,
    name: "Casquinha Doce de Leite",
    price: 5.5,
    category: "Sobremesa",
    image: "/img/menu/18_casquinha_doce_leite.png",
  },
  {
    id: 19,
    name: "Pepsi",
    price: 14.9,
    category: "Bebidas",
    image: "/img/menu/19_pepsi.png",
  },
  {
    id: 20,
    name: "Pepsi Twist",
    price: 14.9,
    category: "Bebidas",
    image: "/img/menu/20_pepsi_twist.png",
  },
  {
    id: 21,
    name: "Pepsi Black",
    price: 14.9,
    category: "Bebidas",
    image: "/img/menu/21_pepsi_black.png",
  },
  {
    id: 22,
    name: "Guaraná",
    price: 14.9,
    category: "Bebidas",
    image: "/img/menu/22_guarana.png",
  },
  {
    id: 23,
    name: "Guaraná Zero",
    price: 14.9,
    category: "Bebidas",
    image: "/img/menu/23_guarana_zero.png",
  },
  {
    id: 24,
    name: "Aguá de Copo",
    price: 6.9,
    category: "Bebidas",
    image: "/img/menu/24_copo_agua.png",
  },
];

let carrinho = JSON.parse(localStorage.getItem("lanchoneteCarrinho")) || [];

let categoriaAtual = "Todos";

const menuContainer = document.getElementById("menu-items");
const abrirCarrinhoLateralButton = document.getElementById(
  "abrir-carrinho-lateral"
);
const carrinhoLateralElement = document.getElementById("carrinho-lateral");
const carrinhoList = document.getElementById("lista-carrinho");
const valorTotalElement = document.getElementById("valor-total");
const carrinhoBadge = document.getElementById("badge-carrinho");
const checkoutButton = document.getElementById("checkout-button");
const carrinhoVazioMessage = document.getElementById("mensagem-carrinho-vazio");
const feedbackToast = document.getElementById("feedback-toast");
const categoryFiltersContainer = document.getElementById("filtros-categoria");

// Inicializar o componente Offcanvas do Bootstrap
const offcanvas = new bootstrap.Offcanvas(carrinhoLateralElement);

function carregarMenu(filtroCategoria = "Todos") {
  menuContainer.innerHTML = "";
  const itemsFiltrados =
    filtroCategoria === "Todos"
      ? menuItems
      : menuItems.filter((item) => item.category === filtroCategoria);

  itemsFiltrados.forEach((item) => {
    const itemHtml = `
            <div class="col">
                <div id="card" class="card h-100">
                <img src="${item.image}" class="card-img-top" alt="${
      item.name
    }">
                    <div class="card-body d-flex flex-column">
                    
                        <h5 class="card-title">${item.name}</h5>
                        <div class="linha">
                        <span id="category-badge" class="badge rounded-pill ">${
                          item.category
                        }</span>
                        <p class="card-text flex-grow-1">R$ ${item.price.toFixed(
                          2
                        )}</p>
                        </div>
                        <button id="addCartButton" class="btn btn-primary mt-auto add-to-cart-btn" data-id="${
                          item.id
                        }">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        `;
    menuContainer.innerHTML += itemHtml;
  });
}

function carregarFiltroCategorias() {
  const categorias = [
    "Todos",
    ...new Set(menuItems.map((item) => item.category)),
  ];
  categoryFiltersContainer.innerHTML = "";

  categorias.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn", "btn-outline-primary", "category-filter-btn");
    if (category === categoriaAtual) {
      button.classList.add("active");
    }
    button.dataset.category = category;
    button.textContent = category;
    categoryFiltersContainer.appendChild(button);
  });
}

function addCarrinho(itemId) {
  const item = menuItems.find((i) => i.id === parseInt(itemId));
  if (item) {
    const existingItem = carrinho.find(
      (carrinhoItem) => carrinhoItem.id === item.id
    );
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
  carrinhoList.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    carrinhoVazioMessage.style.display = "block";
  } else {
    carrinhoVazioMessage.style.display = "none";
    carrinho.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const itemHtml = `
                <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                    <div  class="d-flex align-items-center flex-grow-1">
                        <div class="btn-group btn-group-sm me-2" role="group" aria-label="Controles de Quantidade">
                            <button type="button" class="btn btn-outline-secondary decrease-quantity-btn" data-id="${
                              item.id
                            }">-</button>
                            <span class="btn btn-light pe-none">${
                              item.quantity
                            }</span>
                            <button type="button" class="btn btn-outline-secondary increase-quantity-btn" data-id="${
                              item.id
                            }">+</button>
                        </div>
                        <span class="fw-bold">${item.name}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span id="cartPrice" class="mx-2">R$ ${itemTotal.toFixed(
                          2
                        )}</span>
                        <button type="button" class="btn btn-outline-danger btn-sm remove-item-btn" data-id="${
                          item.id
                        }" onclick=removerItem(${item.id})>
                            <img class="remove-img" src="/img/trash.png">
                        </button>
                    </div>
                </li>
            `;
      carrinhoList.innerHTML += itemHtml;
    });
  }

  valorTotalElement.innerText = `R$ ${total.toFixed(2)}`;
  carrinhoBadge.innerText = carrinho.reduce(
    (sum, item) => sum + item.quantity,
    0
  ); // Atualiza o badge do botão flutuante
}

function incremento(itemId) {
  const item = carrinho.find(
    (carrinhoItem) => carrinhoItem.id === parseInt(itemId)
  );
  if (item) {
    item.quantity++;
    saveCarrinho();
    carregarCarrinho();
  }
}

function diminuir(itemId) {
  const item = carrinho.find(
    (carrinhoItem) => carrinhoItem.id === parseInt(itemId)
  );
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
  carrinho = carrinho.filter(
    (carrinhoItem) => carrinhoItem.id !== parseInt(itemId)
  );
  if (carrinho.length < comprimentoInicial) {
    showFeedback("Item removido do carrinho. 🗑️");
  }
  saveCarrinho();
  carregarCarrinho();
}

function saveCarrinho() {
  localStorage.setItem("lanchoneteCarrinho", JSON.stringify(carrinho));
}

function limparCarrinho() {
  carrinho = [];
  saveCarrinho();
  carregarCarrinho();
  showFeedback("Pedido finalizado! Obrigado. 😊");
  offcanvas.hide();
}

function showFeedback(message) {
  const feedbackMessageElement = document.getElementById("feedback-message");
  feedbackMessageElement.innerText = message;
  const toast = new bootstrap.Toast(feedbackToast);
  toast.show();
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    addCarrinho(e.target.dataset.id);
  } else if (e.target.classList.contains("increase-quantity-btn")) {
    incremento(e.target.dataset.id);
  } else if (e.target.classList.contains("decrease-quantity-btn")) {
    diminuir(e.target.dataset.id);
  }
  //função diretamente no botão para consertar glitch
  // else if (e.target.classList.contains('remove-item-btn')) {
  //     removerItem(e.target.dataset.id);
  // }
  else if (e.target.classList.contains("category-filter-btn")) {
    const categoriaSelecionada = e.target.dataset.category;
    categoriaAtual = categoriaSelecionada;
    carregarMenu(categoriaSelecionada);
    document.querySelectorAll(".category-filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
  }
});

checkoutButton.addEventListener("click", limparCarrinho);

abrirCarrinhoLateralButton.addEventListener("click", () => {
  offcanvas.show();
});

document.addEventListener("DOMContentLoaded", () => {
  carregarFiltroCategorias();
  carregarMenu(categoriaAtual);
  carregarCarrinho();
});

// Inicializa o carrossel do Bootstrap com intervalo de 5 segundos
const myCarousel = new bootstrap.Carousel(
  document.getElementById("carouselExampleIndicators"),
  {
    interval: 5000, // 5 segundos
  }
);
