document.addEventListener("DOMContentLoaded", function () {
    setTimeout(type, newtextdelay);
})

var fashion = document.getElementById("wherefashionGo");
var phones = document.getElementById("wherephoneGo");
var electronic = document.getElementById("whereelectronicsGo");
var sports = document.getElementById("wheresportsGo");
var books = document.getElementById("wherebooksGo");
var products = [fashion, phones, electronic, sports, books];

function showall() {
    for (let i = 0; i < products.length; i++) {
        products[i].style.display = "block"
    }
}

function showfashion() {
    fashion.style.display = "block";
    for (let i = 0; i < products.length; i++) {
        if (products[i] === fashion) {
            continue
        }
        products[i].style.display = "none";
    }
}

function showphones() {
    phones.style.display = "block";
    for (let i = 0; i < products.length; i++) {
        if (products[i] === phones) {
            continue
        }
        products[i].style.display = "none";
    }

}
function showElectronics() {
    electronic.style.display = "block";
    for (let i = 0; i < products.length; i++) {
        if (products[i] === electronic) {
            continue
        }
        products[i].style.display = "none";
    }
}
function showSports() {
    sports.style.display = "block";
    for (let i = 0; i < products.length; i++) {
        if (products[i] === sports) {
            continue
        }
        products[i].style.display = "none";
    }
}
function showBooks() {
    books.style.display = "block";
    for (let i = 0; i < products.length; i++) {
        if (products[i] === books) {
            continue
        }
        products[i].style.display = "none";
    }
}



//cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    /////////////////
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    ////////////////
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName("shop-item-button");
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked)
    }
    ////////////////////
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thank you for your purchase',
        showConfirmButton: false,
        timer: 1500
    })
    ////////////////////////
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    /////////////////////
    var imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    //console.log(title, price);
    addItemToCart(title, price, imgSrc);
}


function addItemToCart(price, title, img) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            Swal.fire({
                title: 'This item is already added to the cart!',
                icon: 'error',
                width: 600,
                padding: '3em',
                color: '#716add',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
            })

            return
        }
    }
    var cartRowContents = `
        <div class="parent">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <div class="cart-quantity d-flex flex-column justify-content-center cart-column">
        <span class="cart-price cart-column">${price}</span>
            <input class="cart-quantity-input form-control my-3 w-50 mx-auto" type="number" value="1">
            <button class="btn btn-danger my-3 w-75 mx-auto" type="button">REMOVE</button>
        </div>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    updateCartTotal()
}

function purchaseClicked() {
    Swal.fire({
        title: 'Thank you for your purchase',
        icon: 'success',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
var removeCartItemButtons = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target
    })
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}






$(document).ready(function () {
    $(".owl-carousel").owlCarousel();
});



function closeLogin() {
    loginForm.style.display = "none";
}

function showlogin() {
    loginForm.style.display = "flex";
}
function closesignup() {
    signupForm.style.display = "none";
}

function showsignup() {
    signupForm.style.display = "flex";
}

function showCart() {
    cartSection.style.display = "flex";
}
function closeCart() {
    cartSection.style.display = "none";

}

let search = document.querySelector(".search")
let input = document.querySelector(".inputSearch")
let buttonsearch = document.querySelector(".searchbt")


buttonsearch.addEventListener("click", () => {
    search.classList.toggle("active");
    input.focus();
    console.log(input.value);
    
})

