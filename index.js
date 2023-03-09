import { menuArray } from './data.js'
import {v4 as uuidv4} from 'https://jspm.dev/uuid'
let orderArray = []
const consentForm = document.querySelector('#consent-form')
// LISTENS FOR BUTTON CLICKS

document.addEventListener('click', function(e){
    if(e.target.dataset.order){
        getOrder(e.target.dataset.order)
    }
    else if(e.target.dataset.remove){
        removeOrderFromList(e.target.dataset.remove)
    }
})

document.querySelector('.complete-order-btn').addEventListener('click', completeOrder)


// OBTAINS DATA MENU AND STORES IT AS HTML

function getMenuHtml(){
    let menuHtml = ''
    
    menuArray.forEach(function(menu){
        menuHtml += `
        <div class='menu-container'>
        
            <div class='image-text-container'>
                <p class='menu-emoji'>${menu.emoji}</p>
                <div class="menu-description">
                    <h2>${menu.name}</h2>
                    <p>${menu.ingredients}</p>
                    <h3>${menu.price}$</h3>
                </div>
            </div>
            
            <div>
                <button class='add-order-btn' data-order=${menu.id}>+</button>
            </div>
        
        </div>
        `
    })
    return menuHtml
}

function renderMenu(){
    document.querySelector('.menu').innerHTML = getMenuHtml()
}

renderMenu()

// OBTAIN SELECTED ORDER AND STORE IT IN AN OBJECT

function getOrder(orderNumber){
    orderArray.push({
        name: menuArray[orderNumber].name,
        price: menuArray[orderNumber].price,
        uuid: uuidv4()
        
    },)
    
    renderOrder()
}

// RENDERS THE ORDER

function renderOrder(){
    let orderStringHtml = ''
    for(let order of orderArray){
        orderStringHtml +=
            `
        <div class='order-container'>
            <div class='order-name-and-btn'>
                <h2>${order.name} </h2>
                <button class="remove-order-btn" data-remove=${order.uuid}>remove</button>
            </div>
            <h2>${order.price}$</h2>
        </div>
    `
    }
    document.querySelector('.selected-order-list').innerHTML = orderStringHtml
    countSum()
    document.querySelector('.selected-order').classList.remove('hidden')
    document.querySelector('.purchase-accepted').classList.add('hidden')
}

// REMOVE THE SELECTED ORDER

function removeOrderFromList(selectedOrder){
   orderArray = orderArray.filter(function(orderUuid){
       return orderUuid.uuid !==selectedOrder
   })
   renderOrder()
   countSum()
   if(!(orderArray[0])){
       document.querySelector('.selected-order').classList.add('hidden')
   }
}

// COUNTS THE TOTAL SUM

function countSum(){
    let price = 0
    for(let orderCost of orderArray){
        price+= orderCost.price
    }
    document.querySelector('.total-price').innerHTML =`
    <h2>Total price:</h2>
    <h2>${price}$</h2>
    `
}

// COMPLETES ORDER

function completeOrder(){
    document.querySelector('.modal').classList.remove('hidden')
}

// FORM SUBMISSION

consentForm.addEventListener('submit', function(e){
    
    //const consentFormData = new FormData(consentForm)
    const fullName = document.querySelector('#fullName').value
    
    e.preventDefault()
    document.querySelector('.modal').classList.add('hidden')
    document.querySelector('.selected-order').classList.add('hidden')
    document.querySelector('.purchase-accepted').classList.remove('hidden')
    orderArray = []
    
    document.querySelector('.purchase-accepted').innerHTML = `
    <h1>Thanks, ${fullName}! Your order is on its way!</h1>
    `
})


