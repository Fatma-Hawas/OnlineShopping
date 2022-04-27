
function getProducts() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "products.JSON", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var product = xhr.responseText;
            displayProducts(product);
        }
    };
    xhr.send();
}
function displayProducts(p) {
    var prod = [];
    prod = JSON.parse(p);
    buildAllStructures();
    for (i in prod) {
        buildProduct(prod[i].id, prod[i].category, prod[i].title, prod[i].description, prod[i].previous_price, prod[i].current_price, prod[i].img_src);
    }
}

function buildProduct(id, category, title, description, previous_price, curent_price, img_src) {
    //main card div
    var mainDiv = document.createElement("div");
    mainDiv.id = `${category}-${id}`;
    mainDiv.classList.add("card", "text-center", "col-lg-4", "shadow-lg", "my-3");
    mainDiv.style.width = "18rem";
    //creating img element
    var prodImg = document.createElement("img");
    prodImg.src = img_src;
    prodImg.classList.add("card-img-top");
    //appending img to main card div
    mainDiv.appendChild(prodImg);
    //creating hovering div
    var subDiv1 = document.createElement("div");
    subDiv1.classList.add("img-layout2");

    var subAnc = document.createElement("a");
    subAnc.href = "#cart";
    subAnc.innerHTML = '<h3>Add To Cart</h3>&nbsp;<i class="fas fa-chevron-right"></i>';
    //appending the hovering div to the main div
    subDiv1.appendChild(subAnc);
    mainDiv.appendChild(subDiv1);
    //checking if there is a sale or not
    if (previous_price > curent_price) {
        var saleDiv = document.createElement("div");
        saleDiv.classList.add("sale-div");
        saleDiv.innerHTML = "SALE";
        mainDiv.appendChild(saleDiv);
    }
    //creating the card div and its inner elements as well
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card-body");

    var titleH5 = document.createElement("h5");
    titleH5.classList.add("card-title", "shop-item-title");
    titleH5.innerHTML = title;
    cardDiv.appendChild(titleH5);

    var descriprionP = document.createElement("p");
    descriprionP.classList.add("card-text");
    descriprionP.innerHTML = description;
    cardDiv.appendChild(descriprionP);

    if (previous_price > curent_price) {
        var saleSpan = document.createElement("span");
        saleSpan.classList.add("Ign-price");
        saleSpan.innerHTML = previous_price + "LE";
        cardDiv.appendChild(saleSpan);
    }

    var priceP = document.createElement("p");
    priceP.classList.add("pro-price", "shop-item-price");
    priceP.innerHTML = curent_price;
    cardDiv.appendChild(priceP);

    var buyAnc = document.createElement("button");
    buyAnc.id = id;
    buyAnc.addEventListener('click', function (e) {
        var price = priceP.innerText
        var title = titleH5.innerText
        var img = prodImg.src
        addItemToCart(price, title, img)
    })
    buyAnc.classList.add("btn", "butt", "shop-item-button");
    buyAnc.innerHTML = "Buy Now";
    cardDiv.appendChild(buyAnc);
    mainDiv.appendChild(cardDiv);
    document.getElementById("where" + category + "Go").appendChild(mainDiv);
    // console.log(mainDiv);
    show(titleH5, mainDiv);
}



function buildStructure(category) {
    var outterDiv = document.createElement("div");
    outterDiv.classList.add(category + "-products");
    outterDiv.id = category + "-products";

    var containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    var innerDiv = document.createElement("div");
    innerDiv.classList.add("row", "my-5", "justify-content-evenly", "align-items-center", "align-content-around");
    innerDiv.id = `where${category}Go`;

    containerDiv.appendChild(innerDiv);
    outterDiv.appendChild(containerDiv);

    document.getElementById("Products-Con").appendChild(outterDiv);
    con(outterDiv);
}
function buildAllStructures() {
    buildStructure("fashion");
    buildStructure("phone");
    buildStructure("electronics");
    buildStructure("sports");
    buildStructure("books");
}
getProducts();
getReviews();
function getReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "clientsReviews.JSON", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var reviews = xhr.responseText;
            displayReviews(reviews);
        }
    };
    xhr.send();
}
function displayReviews(r) {
    var rev = [];
    rev = JSON.parse(r);
    for (i in rev) {
        buildSlideBar(i);
        buildReview(rev[i].clientName, rev[i].clientImg, rev[i].clientReview, i);
    }
}
function buildReview(clientName, clientImg, clientReview, i) {
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("carousel-item", "carousel-item2");
    if (i == 0) {
        mainDiv.classList.add("active");
    }
    var imgEle = document.createElement("img");
    imgEle.classList.add("d-block", "w-25", "rounded-circle", "m-auto");
    imgEle.src = clientImg;

    var reviewDiv = document.createElement("div");
    reviewDiv.classList.add("carousel-caption", "carousel-caption2", "d-none", "d-md-block");

    var nameH5 = document.createElement("h5");
    nameH5.innerHTML = clientName;

    var reviewP = document.createElement("p");
    reviewP.innerHTML = clientReview;

    reviewDiv.appendChild(nameH5);
    reviewDiv.appendChild(reviewP);
    mainDiv.appendChild(imgEle);
    mainDiv.appendChild(reviewDiv);

    document.getElementById("reviewsItself").appendChild(mainDiv);
}
function buildSlideBar(i) {
    var btnSlide = document.createElement("button");
    btnSlide.type = "button";
    btnSlide.setAttribute("data-bs-target", "#carouselExampleCaptions");
    btnSlide.setAttribute("data-bs-slide-to", i);
    if (i == 0) {
        btnSlide.classList.add("active");
        btnSlide.setAttribute("aria-current", "true");
    }
    btnSlide.setAttribute("aria-label", "Slide " + i);
    btnSlide.setAttribute("data-bs-target", "#carouselExampleCaptions");

    document.getElementById("reviewsSlider").appendChild(btnSlide);
}

var products = ["fashion", "phone", "electronics", "sports", "books"];


function showStuff(test) {
    products.forEach(element => {
        if (element != test) {
            document.getElementById(`${element}-products`).style.display = "none";
        }
        else {
            document.getElementById(`${element}-products`).style.display = "block";
        }
    });
}


function showall() {
    products.forEach(element => {
        document.getElementById(`${element}-products`).style.display = "block";
    });
}



let inp = document.querySelector(".inputSearch");
var a = [];
var b = [];
function show(element, card) {
    a.push(element.innerText);
    b.push(card);
}
let c = [];
function con(element) {
    c.push(element);
}
console.log(c);


let res = [];
inp.addEventListener("keyup", function Search() {
    for (let i = 0; i < a.length; i++) {
        if (a[i].toLowerCase().includes(inp.value.toLowerCase()) === true) {
            for (let j = 0; j < b.length; j++) {
                b[j].style.display = "none";
            }
            for (let o = 0; o < 12; o++) {
                b[i].style.display = "flex";
                i++
            }

        }
    }

    if (inp.value === "") {
        for (let a = 0; a < b.length; a++) {
            b[a].style.display = "flex";
        }
    }

});

inp.addEventListener("blur", function () {
    for (let a = 0; a < b.length; a++) {
        b[a].style.display = "flex";
    }
})



function arrangeProducts(categoryTest, order) {
    showStuff(categoryTest);
    //Building the two arrays 1- holding the divs     2 - holding the prices
    var tempDiv = document.querySelectorAll(`#${categoryTest}-products .card`);
    var tempPrice = [];
    var i, j;
    for (i = 0; i < tempDiv.length; i++) {
        //checking whether or not it has a sale 
        if (tempDiv[i].lastChild.children.length == 4) {
            tempPrice.push(parseInt(tempDiv[i].lastChild.children[2].innerHTML));
        }
        else {
            tempPrice.push(parseInt(tempDiv[i].lastChild.children[3].innerHTML));
        }
    }
    //Sorting from lowest to highest
    if (order == 'lowest') {
        //Selection sort      
        for (i = 0; i < tempDiv.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < tempDiv.length; j++) {
                if (tempPrice[j] < tempPrice[min_idx]) {
                    min_idx = j;
                }
            }
            //swaping elements in both arrays
            tmp = tempPrice[min_idx];
            tempPrice[min_idx] = tempPrice[i];
            tempPrice[i] = tmp;

            tmp = tempDiv[min_idx].innerHTML;
            tempDiv[min_idx].innerHTML = tempDiv[i].innerHTML;
            tempDiv[i].innerHTML = tmp;
        }
    }
    //Sorting from highest to lowest
    else if (order == 'highest') {
        for (i = 0; i < tempDiv.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < tempDiv.length; j++) {
                if (tempPrice[j] > tempPrice[min_idx]) {
                    min_idx = j;
                }
            }
            tmp = tempPrice[min_idx];
            tempPrice[min_idx] = tempPrice[i];
            tempPrice[i] = tmp;

            tmp = tempDiv[min_idx].innerHTML;
            tempDiv[min_idx].innerHTML = tempDiv[i].innerHTML;
            tempDiv[i].innerHTML = tmp;
        }
    }
}







function arrangeAll(order){
    var tempDiv = document.querySelectorAll(`#Products-Con .card`);
    var tempPrice = []; 
    var i, j;  
    for(i = 0; i < tempDiv.length; i++){
        if(tempDiv[i].lastChild.children.length == 4){
        tempPrice.push(parseInt(tempDiv[i].lastChild.children[2].innerHTML));
        }
        else{
            tempPrice.push(parseInt(tempDiv[i].lastChild.children[3].innerHTML));
        }
    }
    //Sorting from lowest to highest
    if(order == 'lowest'){  
        //Selection sort      
        for (i = 0; i < tempDiv.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < tempDiv.length; j++) {
                if (tempPrice[j] < tempPrice[min_idx]) {
                    min_idx = j;
                }
            }
            //swaping elements in both arrays
            tmp = tempPrice[min_idx];
            tempPrice[min_idx] = tempPrice[i];
            tempPrice[i] = tmp;

            tmp = tempDiv[min_idx].innerHTML;
            tempDiv[min_idx].innerHTML = tempDiv[i].innerHTML;
            tempDiv[i].innerHTML = tmp;
        }
    }
    //Sorting from highest to lowest
    else if(order == 'highest'){
        for (i = 0; i < tempDiv.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < tempDiv.length; j++) {
                if (tempPrice[j] > tempPrice[min_idx]) {
                    min_idx = j;
                }
            }
            tmp = tempPrice[min_idx];
            tempPrice[min_idx] = tempPrice[i];
            tempPrice[i] = tmp;

            tmp = tempDiv[min_idx].innerHTML;
            tempDiv[min_idx].innerHTML = tempDiv[i].innerHTML;
            tempDiv[i].innerHTML = tmp;
        }
    }
}