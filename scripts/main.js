const API_URL = 'http://localhost:3000/products';

let products = [];

async function getProducts() {
  try {
    const response = await fetch(API_URL); // Realiza la solicitud GET
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const productsData = await response.json(); // Convierte la respuesta a JSON
    return productsData;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

async function addProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    console.error('Error al agregar el producto:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  products = await getProducts(); // Obtén los productos desde el servidor
  renderProducts(); // Renderiza los productos obtenidos
});

const form = document.getElementById("product-form");
const productsGrid = document.querySelector(".products-grid");
const noProductsMessage = document.querySelector(".no-products-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("product-name").value.trim();
  const price = parseFloat(document.getElementById("product-price").value).toFixed(2);
  const image = document.getElementById("product-image").value.trim();

  if (!name || isNaN(price) || !image) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
    image,
  };

  await addProduct(newProduct);
  products.push(newProduct);
  renderProducts();
  form.reset();
});

function renderProducts() {
  // Limpiar el contenedor
  productsGrid.innerHTML = "";

  if (products.length === 0) {
    console.log("No hay productos. Mostrando mensaje.");
    noProductsMessage.style.display = "block";
  } else {
    console.log("Hay productos. Ocultando mensaje."); 
    noProductsMessage.style.display = "none";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-card__image">
        <h3 class="product-card__name">${product.name}</h3>
        <span class="product-card__price">$${product.price}</span>
        <img src="assets/trash.png" alt="Eliminar producto" class="btn-delete" data-id="${product.id}">
      `;
      productsGrid.appendChild(productCard);
    });

    // Agregar eventos para eliminar productos
    document.querySelectorAll(".btn-delete").forEach((button) =>
      button.addEventListener("click", deleteProduct)
    );
  }
}

function deleteProduct(event) {
  const productId = parseInt(event.target.getAttribute("data-id"));
  products = products.filter((product) => product.id !== productId);
  renderProducts();
}
