const products = [
    {id: 1,name:"Phone",Image:"https://m.media-amazon.com/images/I/61-g46cjguL._AC_SY200_.jpg",price: 4000},
    {id: 2,name:"Phone",Image:"https://m.media-amazon.com/images/I/61-g46cjguL._AC_SY200_.jpg",price: 4000},  
    {id: 3,name:"Scooter",Image:"https://m.media-amazon.com/images/I/71Tn3VtBGXL._AC_SY200_.jpg",price: 50000},
    {id: 4,name:"Scooter",Image:"https://m.media-amazon.com/images/I/71Tn3VtBGXL._AC_SY200_.jpg",price: 50000},  
    {id: 5,name:"Toy",Image:"https://m.media-amazon.com/images/I/61oTwtoBeeL._AC_SY200_.jpg",price: 3000},   
    {id: 6,name:"toy",Image:"https://m.media-amazon.com/images/I/61oTwtoBeeL._AC_SY200_.jpg",price: 3000},   
    {id: 7,name:"Earbuds",Image:"https://m.media-amazon.com/images/I/41nuqDNy9mL._AC_SY200_.jpg",price: 5000},   
    {id: 8,name:"Earbuds",Image:"https://m.media-amazon.com/images/I/41nuqDNy9mL._AC_SY200_.jpg",price: 5000},   
    {id: 9,name:"Teddy",Image:"https://m.media-amazon.com/images/I/617OBlRSVTL._AC_UL320_.jpg",price: 34000},  
    {id: 10,name:"Teddy",Image:"https://m.media-amazon.com/images/I/617OBlRSVTL._AC_UL320_.jpg",price: 34000},   
    {id: 11,name:"Saree",Image:"https://m.media-amazon.com/images/I/41FQa5l4szL._AC_UL320_.jpg",price: 45000},   
    {id: 12,name:"Saree",Image:"https://m.media-amazon.com/images/I/41FQa5l4szL._AC_UL320_.jpg",price: 45000},   
    {id: 13,name:"Chocoloates",Image:"https://m.media-amazon.com/images/I/71ofy1xG9qL._AC_SY200_.jpg",price: 2000},   
    {id: 14,name:"Chocoloates",Image:"https://m.media-amazon.com/images/I/71ofy1xG9qL._AC_SY200_.jpg",price: 2000},   
    {id: 15,name:"Refrigerators",Image:"https://m.media-amazon.com/images/I/71bYFsyEFFL._AC_UL320_.jpg",price: 22000},   
    {id: 16,name:"Refrigerators",Image:"https://m.media-amazon.com/images/I/71bYFsyEFFL._AC_UL320_.jpg",price: 22000},   
    {id: 17,name:"Radio",Image:"https://m.media-amazon.com/images/I/618W3Q69OLL._AC_UL320_.jpg", price: 7000},   
    {id: 18,name:"Radio",Image:"https://m.media-amazon.com/images/I/618W3Q69OLL._AC_UL320_.jpg",price: 7000},   
    {id: 19,name:"Light",Image:"https://m.media-amazon.com/images/I/51VPv3rPIXL._AC_UL320_.jpg",price: 9000},   
    {id: 20,name:"Light",Image:"https://m.media-amazon.com/images/I/51VPv3rPIXL._AC_UL320_.jpg",price: 9000},   
]

//Render Products

function renderProducts(products,productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `
        container.appendChild(productDiv);
    })
}


//Search functionality
function searchProducts(query){
    const filterProducts = products.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    renderProducts(filterProducts,"productList");
}


//Add EventListner to button
document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})

//Sorting
function sortProducts(criteria){
    if(criteria == "price"){
        return products.sort((a,b) => a.price-b.price);
    }
    return products;
}

//Adding Event listner
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})

//Add to cart

function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name} is added to cart`)
    renderCart();
}

//Render items in cart

function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        `
        container.appendChild(cartDiv);
    })
    renderSubtotal(cart);
}

//Remove from cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart(); 
}

//Calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
}

if(document.getElementById("productList"))renderProducts(products,"productList");
if(document.getElementById("cartItems"))renderCart();

