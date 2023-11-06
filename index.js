// Write your code here...
let currentItem = {}
const totalCart = document.getElementById("number-in-cart")
const cartAdder = document.getElementById("cart-form")
const subtotal = document.getElementById("subtotal")
cartAdder.addEventListener("submit", (e)=>{
    e.preventDefault()
    cartManager(e.target[0].value)

})


function initialize(){

    fetch("http://localhost:3000/menu")
    .then((res)=>res.json())
    .then((data)=>{
        renderMenu(data)
        renderItem(data[0])
        addAllPrices()
    })
}

function renderMenu(menu){
    const menuItems = document.getElementById("menu-items")
    menu.forEach((e)=>{
        const newItem = document.createElement("span")
        newItem.innerText = `${e.name}`
        newItem.addEventListener("click", ()=>{
            renderItem(e)
        })
        menuItems.append(newItem)
    })
}

function renderItem(data){
    fetch(`http://localhost:3000/menu/${data.id}`)
    .then((res)=>res.json())
    .then((item)=>{
    currentItem=item
    const image = document.getElementById("dish-image")
    const name = document.getElementById("dish-name")
    const description = document.getElementById("dish-description")
    const price = document.getElementById("dish-price")
    totalCart.innerText = currentItem.number_in_bag

    image.src = item.image
    name.innerText = item.name
    description.innerText = item.description
    price.innerText = `$${item.price}`
    })
}

function cartManager(val){
    const total = parseInt(val) + parseInt(currentItem.number_in_bag)
    const amount = {number_in_bag : parseInt(total)}
    fetch(`http://localhost:3000/menu/${currentItem.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(amount)})
    .then(()=>{
        currentItem.number_in_bag = total
        totalCart.innerText = currentItem.number_in_bag
        addAllPrices()
    })
}


function addAllPrices(){
    let totalPrice = 0
    fetch('http://localhost:3000/menu')
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((e)=>{
            const itemTotal = parseInt(e.number_in_bag) * parseInt(e.price)
            totalPrice = totalPrice + itemTotal
        })
    })
    .then(()=>subtotal.innerText = `$${totalPrice}`)
}
initialize()