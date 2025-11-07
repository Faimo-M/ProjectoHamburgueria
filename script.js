const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];

//abrir o modal do carinho
if (cartBtn && cartModal) {
    cartBtn.addEventListener("click", function(){
        updateCartModal()
        cartModal.style.display="flex"
    })
}

// fechar ao clicar fora
if (cartModal) {
    cartModal.addEventListener("click", function(event){
        if(event.target===cartModal){
                cartModal.style.display="none"
        }
    })
}

// fechar ao clicar no botao
if (closeModalBtn && cartModal) {
    closeModalBtn.addEventListener("click", function(){
        cartModal.style.display = "none"
    })

}

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        //adicionar no carrinho
        addToCart(name,  price)
    }
})


//funcao para adicionar no carinho

function addToCart(name, price){
    const existingItem = cart.find(item =>item.name === name)

    if(existingItem){
        //se o item ja existe aumenta mais um no item ja existente.
        existingItem.quantity += 1;
        
    }

    else{
        cart.push({
    name,
    price,
    quantity: 1,
})
    }



updateCartModal()

}

//atualiza carrinho criando intem no html
function updateCartModal(){
cartItemsContainer.innerHTML = "";
let total = 0;
cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between"> 
         <div>
         <p class="font-medium">${item.name}</p>
         <p> Qtd: ${item.quantity}</p>
         <p class="font-medium mt-2">${item.price.toFixed(2)}</p>
         </div>
         
         <button class="remove-from-cart-btn" data-name="${item.name}">
         Remover
         <button/>
         
    </div>`

    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement)
})

cartTotal.textContent=total.toLocaleString("pt-BR", {
    style: "currency",
    currency:"MZN"
});

cartCounter.innerHTML=cart.length;

}

//funcao para remover item do carrinho.

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
    
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index != -1){
        const item = cart[index];
       if(item.quantity > 1){
        item.quantity -= 1;
        updateCartModal();
        return;
       }

       cart.splice(index, 1);
       updateCartModal();
    }

}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

        if(inputValue !== ""){
            addressInput.classList.remove("border-red-500")
            addressWarn.classList.add("hidden")
        }    
    })

    //finalizar pedido
checkoutBtn.addEventListener("click", function(){

    // const isOpne = checkRestaurantOpen();
    // if(!isOpne){
    //     alert("RESTAURANTE FECHADO NO MOMENTO")
    //     return;
    // }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    //enviar para o whatsapp o pedido.
    const date = new Date();
const hora = date.toLocaleTimeString('pt-PT');
const data = date.toLocaleDateString('pt-PT');

const cliente = "Faimo"; // pode adicionar input com nome
const morada = addressInput.value;
   const cartItems = cart.map((item) =>{
    return (
       ` ${item.name} Quantidade: (${item.quantity}) Price: MZN${item.price} |`
    )
   } ).join("") 

    const recibo = `
 *Recibo de Pedido*
--------------------------------
 *Cliente:* ${cliente}
 *Data:* ${data}
*Hora:* ${hora}
 *Morada:* ${morada}

 *Itens do Pedido:*
${cartItems}
--------------------------------


 *Obrigado pela preferência!*
`;

   const message = encodeURIComponent(recibo)
   const phone = "+258878092230"

   window.open(`https://wa.me/${phone}?text=${message} Morada: ${addressInput.value}`, "_blank")

   cart =[];
   updateCartModal();
})

//verificar a hora e verificando se esta aberto ou nao.
function checkRestaurantOpen(){
    const data = new Date();
    const hora = new data.getHours();
    return hora >= 18 && hora < 22;

}

const spanItem = document.getElementById("data-span")
const isOpne = checkRestaurantOpen();

if(isOpne){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}
else{
     spanItem.classList.remove("bg-green-600")
     spanItem.classList.add("bg-red-500")
}