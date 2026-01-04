// import data from array
import { menuArray } from "./data.js"

// --- Event listeners ---
document.addEventListener("click", (e) => {
  const plusId = e.target.dataset.plus ? parseInt(e.target.dataset.plus) : null
  const removeId = e.target.dataset.remove
    ? parseInt(e.target.dataset.remove)
    : null

  if (plusId !== null) {
    preCheckoutState(plusId)
  } else if (removeId !== null) {
    handleRemoveClick(removeId)
  } else if (e.target.id === "order-btn") {
    handleOrderClick()
  } else if (e.target.id === "pay-btn") {
    handlePayClick()
  }
})

// --- Default menu rendering ---
function defaultState() {
  let menuHTML = ""
  menuArray.forEach((item) => {
    menuHTML += `
      <div class="default-state">
        <p class="emoji">${item.emoji}</p>
        <div class="meal-info">
          <h2>${item.name}</h2>
          <h4>${item.ingredients}</h4>
          <h3>$${item.price}</h3>
        </div>
        <button class="plus-btn" id="plus-${item.id}" data-plus=${item.id}>+</button>
      </div>
    `
  })
  return menuHTML
}

// --- Cart storage ---
let itemChoice = [] // store selected items with quantity

// --- Add/update item in cart ---
function preCheckoutState(itemId) {
  if (itemId !== undefined) {
    const index = itemChoice.findIndex((item) => item.id === itemId)

    if (index !== -1) {
      // Item already in cart: increment amount
      itemChoice[index].amount += 1
    } else {
      // New item: add to cart with amount = 1
      const menuItem = menuArray.find((item) => item.id === itemId)
      itemChoice.push({
        id: menuItem.id,
        item: menuItem.name,
        price: menuItem.price,
        amount: 1,
      })
    }
  }

  renderCheckout()
}

// --- Render checkout modal ---
function renderCheckout() {
  const checkoutContainer = document.getElementById("pre-checkout-state")

  if (itemChoice.length === 0) {
    checkoutContainer.classList.add("hidden")
    checkoutContainer.innerHTML = ""
    return
  }

  checkoutContainer.classList.remove("hidden")

  let orderedItemsHTML = ""
  let total = 0

  itemChoice.forEach((item) => {
    total += item.price * item.amount
    orderedItemsHTML += `
      <div class="ordered-items">
        <h2>${item.item} (x${item.amount})</h2>
        <p class="remove" data-remove="${item.id}">remove</p>
        <h4 class="amount">$${item.price * item.amount}</h4>
      </div>
    `
  })

  checkoutContainer.innerHTML = `
    <div class="pre-order" id="pre-order">
      <h2 class="your-order">Your Order</h2>
      <div id="order-items">
        ${orderedItemsHTML}
      </div>
      <div class="total-price">
        <h2 class="total">Total price</h2>
        <h3 class="total-amount">$${total}</h3>
      </div>
      <button class="order-btn" id="order-btn">Complete Order</button>
    </div>
  `
}

// --- Remove item from cart ---
function handleRemoveClick(itemId) {
  const index = itemChoice.findIndex((item) => item.id === itemId)
  if (index !== -1) {
    itemChoice.splice(index, 1)
  }
  renderCheckout()
}

// --- Checkout modal ---
function handleOrderClick() {
  document.getElementById("checkout-payment-modal").classList.remove("hidden")
  document.getElementById("main").classList.add("background")

  document.getElementById("checkout-payment-modal").innerHTML = `
    <section class="pay-box">
      <h3 class="enter">Enter card details</h3>
      <input required type="text" placeholder="Enter your name" id="name"/>
      <input required type="number" placeholder="Enter card number"/>
      <input required type="number" placeholder="Enter cvv"/>
      <button class="pay-btn" id="pay-btn">Pay</button>
    </section>
  `
}

// --- Payment / thank you ---
function handlePayClick() {
  document.getElementById("checkout-payment-modal").classList.add("hidden")
  document.getElementById("main").classList.remove("background")
  document.getElementById("order-complete-state").classList.remove("hidden")
  document.getElementById("pre-checkout-state").classList.add("hidden")

  const name = document.getElementById("name").value
  document.getElementById("order-complete-state").innerHTML = `
    <div class="thank-you">
      <h3 class="thanks">Thanks ${name}! Your order is on the way.</h3>
    </div>
  `
}

// --- Render default menu ---
function render() {
  document.getElementById("default").innerHTML = defaultState()
}

render()

// reference https://scrimba.com/s03lg3j/s0jl8ou1ii/head
