const form = document.getElementById("product-form");
const productsGrid = document.querySelector(".products-grid");
const noProductsMessage = document.querySelector(".no-products-message");

// Array para almacenar los productos
let products = [];

// Evento al enviar el formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Capturar valores del formulario
  const name = document.getElementById("product-name").value.trim();
  const price = parseFloat(document.getElementById("product-price").value).toFixed(2);
  const image = document.getElementById("product-image").value.trim();

  if (!name || isNaN(price) || !image) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  // Crear un nuevo producto con un ID único
  const newProduct = {
    id: Date.now(), // Genera un ID único basado en la marca de tiempo
    name,
    price,
    image,
  };

  // Agregarlo al array y renderizar
  products.push(newProduct);
  renderProducts();
  form.reset(); // Limpiar el formulario
});

// Función para renderizar los productos
function renderProducts() {
  // Limpiar el contenedor
  productsGrid.innerHTML = "";

  if (products.length === 0) {
    // Si no hay productos, mostrar el mensaje
    noProductsMessage.style.display = "block";
  } else {
    // Si hay productos, ocultar el mensaje y renderizar las tarjetas
    noProductsMessage.style.display = "none";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-card__image">
        <h3 class="product-card__name">${product.name}</h3>
        <span class="product-card__price">$${product.price}</span>
        <button class="btn-delete" data-id="${product.id}">Eliminar</button>
      `;
      productsGrid.appendChild(productCard);
    });

    // Agregar eventos para eliminar productos
    document.querySelectorAll(".btn-delete").forEach((button) =>
      button.addEventListener("click", deleteProduct)
    );
  }
}

// Función para eliminar un producto
function deleteProduct(event) {
  const productId = parseInt(event.target.getAttribute("data-id"));
  products = products.filter((product) => product.id !== productId);
  renderProducts();
}
