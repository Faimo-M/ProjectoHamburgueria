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
const clientNameInput = document.getElementById("client-name")


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
        cartItemElement.classList.add("mb-4")

        // layout: left = info, right = remove button (centered vertically)
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">MZN ${item.price.toFixed(2)}</p>
            </div>
                    <div class="flex items-center justify-end ml-4">
                        <button class="remove-from-cart-btn text-sm font-bold text-white bg-red-600 px-3 py-1 rounded" data-name="${item.name}">Remover</button>
                    </div>
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

if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", function(event){
        let btn = null;

        // Prefer using closest if available on the event target
        if (event.target && typeof event.target.closest === 'function') {
            btn = event.target.closest('.remove-from-cart-btn');
        }

        // If target is a text node or closest didn't find, try parentElement
        if (!btn && event.target && event.target.parentElement) {
            btn = event.target.parentElement.closest('.remove-from-cart-btn');
        }

        // Fallback: use composedPath (for Shadow DOM or weird targets)
        if (!btn) {
            const path = (typeof event.composedPath === 'function') ? event.composedPath() : (event.path || []);
            for (const el of path) {
                if (el && el.classList && el.classList.contains && el.classList.contains('remove-from-cart-btn')) {
                    btn = el;
                    break;
                }
            }
        }

        if (btn) {
            const name = btn.getAttribute('data-name');
            removeItemCart(name);
        }
    })
}

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

     const cliente = clientNameInput && clientNameInput.value ? clientNameInput.value : "Cliente";
     const morada = addressInput.value;
   const cartItems = cart.map((item) =>{
    return (
       ` ${item.name} Quantidade: (${item.quantity}) Price: MZN${item.price} |`
    )
   } ).join("") 
     // calcular total
     const total = cart.reduce((sum, it) => sum + it.price * it.quantity, 0)

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
*Total:* MZN ${total.toFixed(2)}

*Obrigado pela preferência!*
`;

     const message = encodeURIComponent(recibo)
     const phone = "+258878092230"

     window.open(`https://wa.me/${phone}?text=${message}`, "_blank")

     // limpar
     cart = [];
     updateCartModal();
     if(addressInput) addressInput.value = ''
     if(clientNameInput) clientNameInput.value = ''
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