const homeLink = document.getElementById("home-link");
const addProductLink = document.getElementById("add-product-link");
const cartLink = document.getElementById("cart-link");
const homeContent = document.getElementById("home-content");
const productForm = document.getElementById("product-form");
const cart = document.getElementById("cart");
const productsDisplay = document.getElementById("products-display");
const cartItems = document.getElementById("cart-items");

let products = [];
let cartProducts = [];
let editIndex = -1; // Засварлаж байгаа бүтээгдэхүүний индекс

// Show/Hide sections
addProductLink.addEventListener("click", () => {
  homeContent.style.display = "none";
  productForm.style.display = "block";
  cart.style.display = "none";
  resetForm();
});

homeLink.addEventListener("click", () => {
  homeContent.style.display = "block";
  productForm.style.display = "none";
  cart.style.display = "none";
});

cartLink.addEventListener("click", () => {
  homeContent.style.display = "none";
  productForm.style.display = "none";
  cart.style.display = "block";
  updateCart();
});

// Add/Edit product
document.getElementById("add-product-btn").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const introduction = document.getElementById("introduction").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("image-link").value;

  if (title && introduction && price && imageUrl) {
    const product = { title, introduction, price, image: imageUrl };

    if (editIndex === -1) {
      // Add new product
      products.push(product);
    } else {
      // Edit existing product
      products[editIndex] = product;
      editIndex = -1; // Reset index
    }

    displayProducts();
    resetForm();
    alert("Бүтээгдэхүүн амжилттай нэмэгдлээ/засагдлаа!");
  } else {
    alert("Бүх мэдээллийг бүрэн оруулна уу!");
  }
});

// Display products on Home
function displayProducts() {
  productsDisplay.innerHTML = "";

  products.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div>
        <h3>${product.title}</h3>
        <p>${product.introduction}</p>
        <p><strong>Үнэ:</strong> ${product.price}₮</p>
      </div>
      <div class="actions">
        <button onclick="editProduct(${index})">Засах</button>
        <button onclick="addToCart(${index})">Сагсанд нэмэх</button>
      </div>
    `;

    productsDisplay.appendChild(productItem);
  });
}

// Edit product
function editProduct(index) {
  const product = products[index];
  document.getElementById("title").value = product.title;
  document.getElementById("introduction").value = product.introduction;
  document.getElementById("price").value = product.price;
  document.getElementById("image-link").value = product.image;

  editIndex = index; // Set index for editing
  productForm.style.display = "block";
  homeContent.style.display = "none";
  cart.style.display = "none";
}

// Reset form
function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("introduction").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image-link").value = "";
  editIndex = -1; // Reset edit mode
}

// Add product to Cart
function addToCart(index) {
  cartProducts.push(products[index]);
  alert("Сагсанд нэмэгдлээ!");
}

// Update cart display
function updateCart() {
  cartItems.innerHTML = "";

  if (cartProducts.length === 0) {
    cartItems.innerHTML = "<p>Сагс хоосон байна.</p>";
    return;
  }

  cartProducts.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div>
        <h3>${product.title}</h3>
        <p>${product.introduction}</p>
        <p><strong>Үнэ:</strong> ${product.price}₮</p>
      </div>
      <button class="remove" onclick="removeFromCart(${index})">Устгах</button>
    `;

    cartItems.appendChild(cartItem);
  });
}

// Remove product from Cart
function removeFromCart(index) {
  cartProducts.splice(index, 1);
  updateCart();
}
