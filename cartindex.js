const cartEl = document.querySelector(".nav_bag");
const cartContainerEl = document.querySelector(".cart_container");
const closeCartEl = document.querySelector("#close_icon");
const productsContainerEl = document.querySelector(".products_container");
const cartProductEl = document.querySelector(".cart_products");
const totalPriceEl = document.querySelector(".totalPrice");
const cartItemsEl = document.querySelector(".items")
const btnClear = document.querySelector(".btn_clear");
cartEl.addEventListener("click", () => {
    cartContainerEl.classList.add("active")
})

closeCartEl.addEventListener("click", () => {
    cartContainerEl.classList.remove("active")
});
const products = [
    {
        "id": 1,
        "title": "No. 1 Backpack",
        "price": 109.95,
        "instock": 100,
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
        "id": 2,
        "title": "Slim Fit T-Shirts ",
        "price": 22.3,
        "instock": 130,
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
    {
        "id": 3,
        "title": "Mens Jacket",
        "price": 55.99,
        "instock": 110,
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    },
    {
        "id": 4,
        "title": "Mens Slim Fit",
        "price": 15.99,
        "instock": 10,
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    },
    {
        "id": 5,
        "title": "Dragon  Bracelet",
        "price": 695,
        "instock": 80,
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    },
    {
        "id": 6,
        "title": "Solid Micropave ",
        "price": 168,
        "instock": 170,
        "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    },
    {
        "id": 7,
        "title": "White Princess",
        "price": 9.99,
        "instock": 200,
        "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    },
    {
        "id": 8,
        "title": "Pierced Steel",
        "price": 10.99,
        "instock": 30,
        "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    },
    {
        "id": 9,
        "title": "Portable Hard Drive",
        "price": 64,
        "instock": 90,
        "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    },
    {
        "id": 10,
        "title": "SanDisk SSD",
        "price": 109,
        "instock": 167,
        "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    },
];

function renderProducts() {
    productsContainerEl.innerHTML = "";
    products.forEach((product) => {
        const { id, title, image, price } = product;
        const productEl = document.createElement("div");
        productEl.innerHTML = `
        <div class="product">
        <div class="product_img">
            <img src="${image}" alt="${title}">
        </div>
        <div class="product_title">
        <h3>${title}</h3>
        </div>
        <div class="product_price">
        <h3>Price: $${price}</h3>
        </div>
        <div class="product_btn">
            <button onClick="addToCart(${id})">Buy Now</button>
        </div>
    </div>
        `;

        productsContainerEl.appendChild(productEl)
    })
};
renderProducts();


// get items from localStorage
let cart = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
updateCart();
function renderCartProducts() {
    cartProductEl.innerHTML = "";
    cart.forEach((product) => {
        const { id, title, image, price, numberOfUnits } = product;
        const cartProduct = document.createElement("div");
        cartProduct.innerHTML = `
        <div class="cartProduct">
        <div class="cart_product_flex">
        <div class="cart_product_img">
        <img src="${image}" alt="${title}" class="cart_img">
    </div>
    <div class="cart_product_title">
    <h3>${title}</h3>
    </div>
        </div>
        <div class="cart_product_price">
        <h3>Price: $${price}</h3>
        </div>
        <div class="cart_amount">
        <p class="decrement" onclick="changeNumberOfUnits('minus', ${id})">-</p>
        <div class="number">${numberOfUnits}</div>
        <p class="increment" onclick="changeNumberOfUnits('plus', ${id})">+</p>
        </div>
        <div class="cart_product_btn">
            <p onClick="removeFromCart(${id})"><i class='bx bxs-trash-alt'></i></p>
        </div>
    </div>
        `;

        cartProductEl.appendChild(cartProduct);
    })
};

renderCartProducts();

// add to cart functionality

function addToCart(id) {
    // check if there is an existing product in the cart
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id)
    } else {
        const product = products.find((product) => product.id === id);
        cart.push({
            ...product,
            numberOfUnits: 1,
        })
    };

    updateCart()
};
// remove from cart functionality

function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart()
};

// updating our cart 

function updateCart() {
    renderCartTotal();
    renderCartProducts();
    localStorage.setItem("cartItems", JSON.stringify(cart));
};
updateCart();


// change amount

function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.instock) {
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}
changeNumberOfUnits()


// cart total price

function renderCartTotal() {
    let totalCartPrice = 0;
    totalCartAmount = 0;

    cart.forEach((item) => {
        totalCartPrice += item.price * item.numberOfUnits;
    });

    totalPriceEl.innerHTML = `Total Price: $${totalCartPrice.toFixed(2)}`;
    cartItemsEl.innerHTML = `Total Items : ${cart.length}`

}

// clear cart

btnClear.addEventListener("click", () => {
    clearCart()
})
function clearCart() {
    if (cart.length >= 1) {
        if (confirm("Do you want to clear the cart")) {
            cart = [];
            localStorage.setItem("cartItems", JSON.stringify(cart));
            updateCart()
        };
    }
}


