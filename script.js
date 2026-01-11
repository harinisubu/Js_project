
var swiper = new Swiper(".home-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 3000, // 3 seconds
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});



/* =========================================
   GLOBAL STATE (localStorage)
========================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* =========================================
   ELEMENT REFERENCES
========================================= */

// CART
const openCartIcon = document.getElementById("open-cart");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsArea = document.getElementById("cart-items");
const cartTotalBox = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const cartCountBadge = document.getElementById("cart-count");

// WISHLIST
const openWishlistIcon = document.getElementById("open-wishlist");
const wishlistSidebar = document.getElementById("wishlist-sidebar");
const closeWishlistBtn = document.getElementById("close-wishlist");
const wishlistItemsArea = document.getElementById("wishlist-items");
const clearWishlistBtn = document.getElementById("clear-wishlist");
const wishlistCountBadge = document.getElementById("wishlist-count");

/* =========================================
   PAGE LOAD – FORCE SIDEBAR CLOSE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  cartSidebar.classList.remove("active");
  wishlistSidebar.classList.remove("active");

  renderCart();
  renderWishlist();
  updateCartCount();
  updateWishlistCount();
});

/* =========================================
   CART SIDEBAR OPEN / CLOSE
========================================= */

openCartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartSidebar.classList.add("active");
  renderCart(); // 🔥 show items
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

/* =========================================
   WISHLIST SIDEBAR OPEN / CLOSE
========================================= */

openWishlistIcon.addEventListener("click", (e) => {
  e.preventDefault();
  wishlistSidebar.classList.add("active");
  renderWishlist(); // 🔥 show items
});

closeWishlistBtn.addEventListener("click", () => {
  wishlistSidebar.classList.remove("active");
});

/* =========================================
   ADD TO CART
========================================= */

document.querySelectorAll(".btn-add-cart").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  });
});

/* =========================================
   RENDER CART (WITH QTY DROPDOWN)
========================================= */

function renderCart() {
  cartItemsArea.innerHTML = "";

  if (cart.length === 0) {
    cartItemsArea.innerHTML = "<p>Your cart is empty</p>";
    cartTotalBox.innerText = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    let options = "";
    for (let i = 1; i <= 10; i++) {
      options += `<option value="${i}" ${item.qty === i ? "selected" : ""}>${i}</option>`;
    }

    cartItemsArea.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>₹${item.price} × ${item.qty}</p>

        <label style="font-size:1.4rem;">
          Qty:
          <select class="qty-select" data-index="${index}">
            ${options}
          </select>
        </label>

        <button class="remove-btn" onclick="removeCartItem(${index})">
          Remove
        </button>
      </div>
    `;
  });

  cartTotalBox.innerText = total.toFixed(2);
  attachQtyListeners();
}

/* =========================================
   QTY CHANGE HANDLER
========================================= */

function attachQtyListeners() {
  document.querySelectorAll(".qty-select").forEach(select => {
    select.addEventListener("change", function () {
      const index = this.dataset.index;
      const qty = parseInt(this.value);

      if (qty <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].qty = qty;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  });
}

/* =========================================
   REMOVE CART ITEM
========================================= */

window.removeCartItem = function(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
};

/* =========================================
   CLEAR CART
========================================= */

clearCartBtn.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
});

/* =========================================
   CART COUNT BADGE
========================================= */

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountBadge.innerText = count;
  cartCountBadge.style.display = count ? "inline-block" : "none";
}

/* =========================================
   WISHLIST HEART TOGGLE
========================================= */

document.querySelectorAll(".wish-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = btn.dataset.name;
    const index = wishlist.indexOf(name);

    if (index === -1) {
      wishlist.push(name);
      btn.classList.add("active-heart");
    } else {
      wishlist.splice(index, 1);
      btn.classList.remove("active-heart");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
  });
});

/* =========================================
   RENDER WISHLIST
========================================= */

function renderWishlist() {
  wishlistItemsArea.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistItemsArea.innerHTML = "<p>No items in wishlist</p>";
    return;
  }

  wishlist.forEach((item, index) => {
    wishlistItemsArea.innerHTML += `
      <div class="wishlist-item">
        <h4>${item}</h4>
        <button class="remove-wish-btn" onclick="removeWish(${index})">
          Remove
        </button>
      </div>
    `;
  });
}

/* =========================================
   REMOVE WISHLIST ITEM
========================================= */

window.removeWish = function(index) {
  const name = wishlist[index];
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  document.querySelectorAll(".wish-btn").forEach(btn => {
    if (btn.dataset.name === name) {
      btn.classList.remove("active-heart");
    }
  });

  renderWishlist();
  updateWishlistCount();
};

/* =========================================
   CLEAR WISHLIST
========================================= */

clearWishlistBtn.addEventListener("click", () => {
  wishlist = [];
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  document.querySelectorAll(".wish-btn").forEach(btn => {
    btn.classList.remove("active-heart");
  });

  renderWishlist();
  updateWishlistCount();
});

/* =========================================
   WISHLIST COUNT BADGE
========================================= */

function updateWishlistCount() {
  wishlistCountBadge.innerText = wishlist.length;
  wishlistCountBadge.style.display = wishlist.length ? "inline-block" : "none";
}
