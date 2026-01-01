// import data from array
import {menuArray} from "./data.js"


// event listeners
document.addEventListener('click', (e) => {
    if(e.target.dataset.plus){
        preCheckoutState(e.target.dataset.plus) 
    }
    else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    else if(e.target.id === "order-btn"){
        handleOrderClick()
    }
    else if(e.target.id === "pay-btn"){
        handlePayClick()
    }
})

// function for default state using HTML template literals for each menu item

function defaultState(){
    let menuHTML = ''
    menuArray.forEach(item => {
        menuHTML += `
            <div class="default-state">
                <p class="emoji"></p>
                <div class="meal-info">
                    <h2>${item.name}</h2>
                    <h4>${item.ingredients}</h4>
                    <h3>${item.price}</h3>
                </div>
                <button class="plus-btn" id="plus-${item.id}" data-plus=${item.id}>+</button>
            </div> `
    })
    return menuHTML
}


// ordered items modal 

let itemChoice = [] //create an empty array

function preCheckoutState(itemId){
    let priceList = '' 
    let orderedItems = ''
    let totalPrice = []
    let totalChoices = []
    let total = 0


// a loop that pushes item to array 

    menuArray.forEach(item => {
        if (item.id == itemId){
            itemChoice.push({item:item.name, price:item.price}) // creates an object (item, price) inside the itemChoice array
        }
    })

// conditional that checks if an item is selected, checkout modal appears

    if (itemChoice >= 1){
        document.getElementById('pre-checkout-state')
    }

// filters the items chosen in the array and counts the number of orders for each item

    let pizzaChoice = itemChoice.filter(item => {
        return item.item === 'Pizza' // returns the choice of pizza in the array as item = Pizza
    })
    let pizza = pizzaChoice.length // counts the number of Pizzas ordered 

    let burgerChoice = itemChoice.filter(item => {
        return item.item === 'Hamburger'
    })
    let burger = burgerChoice.length

    let beerChoice = itemChoice.filter(item => {
        return item.item === 'Beer'
    })
    let beer = beerChoice.length

// creates an array of the filtered choices and the total cost of each item

    let finalChoices = []
    if (pizza >= 1){
        finalChoices.push({select:pizzaChoice[0], amount:pizza})
    }
    if (burger >= 1){
        finalChoices.push({select:burgerChoice[0], amount:burger})
    }
    if (beer >= 1){
        finalChoices.push({select:beerChoice[0], amount:beer})
    }


// adds the total of each selected item

    for (let choice of finalChoices){
        orderedItems += `
            <div class="ordered-items">
                <h2>${choice.select.item} (x${choice.amount})</h2>
                <p class="remove" id="remove-${choice.select.id}" data-remove="${choice.select.id}">remove</p>
                <h4 class="amount">$${(choice.select.price * choice.amount)}</h4>
            </div>
        `
    }

// totals up the price of the array

    finalChoices.forEach(select => {
        totalPrice.push(select.select.price * select.amount)
    })
    const sum = totalPrice.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

// render price list to modal

    priceList += `
        <div class="pre-order " id="pre-order">
              <h2 class="your-order">Your Order</h2>
              <div id="order-items"></div>
              <div class="total-price">
                 <h2 class="total">Total price</h2>
                 <h3 class="total-amount">$${sum}</h3>
              </div>
              <button class="order-btn" id="order-btn">Complete Order</button>
        </div>`

    document.getElementById('pre-checkout-state').innerHTML = priceList
    document.getElementById('order-items').innerHTML = orderedItems

}

// removes item on list 

function handleRemoveClick(itemId){
    itemChoice.forEach(item =>{
        if(item.id === itemId){
            let selectItem = item
            let index = itemChoice.indexOf(item)
            itemChoice.splice(index, 1)
        }
     })
        if(itemChoice.length === 0){
            document.getElementById("pre-checkout-state").classList.add('hidden')
        }
        preCheckoutState()
}

// check out modal 

function handleOrderClick(){
    document.getElementById("checkout-payment-modal").classList.remove('hidden')
    document.getElementById("main").classList.add('background')
    
    let payerDetails = ''
    payerDetails += `
        <section class="pay-box">
        <h3 class="enter">Enter card details</h3>
        <input required type="text" placeholder="Enter your name" id="name"/>
        <input required type="number" placeholder="Enter card number"/>
        <input required type="number" placeholder="Enter cvv"/>
        <button class="pay-btn" id="pay-btn">Pay</button>
        </section>
   `
   document.getElementById("checkout-payment-modal").innerHTML = payerDetails
}

// clear checkout modal with thank you message 

function handlePayClick(){
    
    document.getElementById("checkout-payment-modal").classList.add('hidden')
    document.getElementById("main").classList.remove('background')
    document.getElementById("order-complete-state").classList.remove('hidden')
    document.getElementById("pre-checkout-state").classList.add('hidden')
    
      
    let thankYou = ''
    let name = document.getElementById('name').value
    
    thankYou += `
        <div class="thank-you">
            <h3 class="thanks">Thanks ${name}! Your order is on the way.</h3>
        </div>
    `
    document.getElementById("order-complete-state").innerHTML = thankYou
    
}

// rendering out the function

function render (){
    document.getElementById('default').innerHTML = defaultState();
} 

render()





// reference https://scrimba.com/s03lg3j/s0jl8ou1ii/head