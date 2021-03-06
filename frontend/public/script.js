// GLOBAL VARIABLES
let validCart = [];

class CartItem {
    constructor(name, amount, price, imageURL){
        this.name = name;
        this.amount = amount,
        this.price = price;
        this.imageURL = imageURL;
    };
    calcTotal(){
        this.total = `${parseInt(this.price) * parseInt(this.amount)} Ft`;
    }
};
// COMPONENTS
const navbarHTML = () => {
    return `
    <nav class="navbar">
        <h4><a href="#top">Blackend</a></h4>
        <a class="basket-container" href="#order"><i class="material-icons left">shopping_basket</i> Basket</a>
    </nav>
    `;
};
const welcomeHTML = () => {
    return `
    <section class="welcome-section container" id="top">
        <div>
            <h1>Welcome to Blackend</h1>
            <h3>We are a family-owned and operated Italian restaurant serving your favorite old world Italian dishes.</h3>
            <a href="#pizza-menu"><button class="primary-btn">View menu</button></a>
        </div>
        <img src="public/welcome-image.png" alt="Image of a pizza with tomato and pepper">
    </section>
    `
};
const containerHTML = (sectionName, recPizzaHTML) => {
    return `
    <section class="our-pizzas container" id="pizza-menu">
        <h1>${sectionName}</h1>
        <div class="pizza-cards">
            ${recPizzaHTML}
        </div>
    </section>
    `
};
const cardHTML = (pizzaList) => {
    return Array.from(pizzaList).map(pizza => {
        return `
        <div class="pizza-card">
            <img src="${pizza.imageURL}" alt="${pizza.name}">
            <h2>${pizza.name}</h2>
            <p>${pizza.description}</p>
            <p class="pizza-price">${pizza.price} Ft</p>
            <div class="inner-flex-container">
                <div class="number-container">
                    <button class="minus-btn">-</button>
                    <input value="1" type="number" name="num-pizzas">
                    <button class="plus-btn">+</button>
                </div>
                <button class="add-cart-btn">Add</button>
            </div>
        </div>
            `
    }).join('');
};
const cartRenderer = (recCartItem) => {
        return `
        <div class="cart-card">
            <img src="${recCartItem.imageURL}" alt="${recCartItem.name}">
            <h2>${recCartItem.name}</h2>
            <p>${recCartItem.total}</p>
            <div class="number-container">
                <button class="minus-btn">-</button>
                <input value="${recCartItem.amount}" type="number" name="num-pizzas">
                <button class="plus-btn">+</button>
            </div>
            <button class="delete-item-btn">X Remove</button>
        </div>
        `;
}

const prevOrderRenderer = (recPizza) => {
    return `
    <div class="prev-order-item">
        <img src="${recPizza.imageURL}" alt="${recPizza.name}">
        <h2>${recPizza.name}</h2>
        <p>${recPizza.amount} - ${recPizza.total}</p>
    </div>
    `
};
const orderHTML = () => {
    return `
    <section class="order-section container" id="order">
        <h2>Your order</h2>
            <article>
                <form>
                    <h3>Delivery details</h3>
                    <label for="name">Name</label>
                    <input placeholder="Name" type="text" id="name" name="name">
                    <label for="zip-code">Zip code</label>
                    <input placeholder="Zip code" type="text" id="zip-code" name="zip-code">
                    <label for="street">Street name and house number</label>
                    <input placeholder="Street name and house number" type="text" id="street" name="street">
                    <label for="phone">Phone number</label>
                    <input placeholder="Phone number" type="text" id="phone" name="phone">
                    <label for="email">Email</label>
                    <input placeholder="Email" type="text" id="email" name="email">
                </form>
                <div>
                    <h3>Order details</h3>
                    <div class="your-cart">${emptyOrderHTML()}</div>
                    <button class="checkout-btn">Checkout</button>
                    <button class="previous-orders-btn">My Orders</button>
                </div>
            </article>
    </section>
    `
};
const emptyOrderHTML = () => {
    return `
        <p>Your basket is empty</p>
        <p class="empty-message" >Scroll up to our menu to find what you are looking for and add to your basket</p>
    `
}
const messageRenderer = (msg) => {
    root.insertAdjacentHTML("beforeend", `
            <section class="prev-order-overlay">
                <div class="prev-order-container">
                    <div class="prev-order-item">
                        <h2 class="prev-order-decline">${msg}</h2>
                    </div>
                </div>
            </section>
            `)
};

const renderYourCartDom = (cartOnDOM) => {
    cartOnDOM.innerHTML = "";
    cartOnDOM.insertAdjacentHTML("beforeend", validCart.map(item => cartRenderer(item)).join(''));
}

// FETCH
const getData = async (url) => {
    const request = await fetch(url);
    const result = await request.json();
    return result;
};

// CLICK EVENT HANDLERS
const inputNbrIncrease = (e) => {

    let input = e.target.previousElementSibling;
    let inputValue = parseInt(input.value);
    inputValue += 1;
    input.setAttribute('value', inputValue);
    return inputValue;
};
const inputNbrDecrease = (e) => {
    
    let input = e.target.nextElementSibling;
    let inputValue = parseInt(input.value);
    if (inputValue > 0){
        inputValue -= 1;
        input.setAttribute('value', inputValue);
    }
    return inputValue;
};

const inputNbrChangeHandler = (e, cartOnDOM) => {
    let classList = e.target.classList;
    
    if(classList.contains('minus-btn')){
        const newNbrValue = inputNbrDecrease(e);
        
        if(e.target.parentNode.parentNode.classList.contains('cart-card')){ 
            // update cart data
            let indexToChange;
            validCart.forEach( (item, i ) => {
                if (item.name === e.target.parentNode.parentNode.children[1].textContent){
                    indexToChange = i;
                }
            });
            validCart[indexToChange].amount = newNbrValue;
            validCart[indexToChange].calcTotal();
            // render  
            renderYourCartDom(cartOnDOM);
            
        }
        
        
    } else if (classList.contains('plus-btn')){
        
        const newNbrValue = inputNbrIncrease(e);
        
        if(e.target.parentNode.parentNode.classList.contains('cart-card')){ 
            //change cart data
            let indexToChange;
            validCart.forEach( (item, i ) => {
                if (item.name === e.target.parentNode.parentNode.children[1].textContent){
                    indexToChange = i;
                }
            });
            
            validCart[indexToChange].amount = newNbrValue;
            validCart[indexToChange].calcTotal();
            
            //render
            renderYourCartDom(cartOnDOM);
        }
    };
}
const addToCartHandler = (e, cartOnDOM) => {
    let classList = e.target.classList;
    
    if (classList.contains('add-cart-btn')){
        let cardElementChildren = e.target.parentNode.parentNode.children;
        let nbrInputValue = e.target.parentNode.children[0].children[1].value;
        const name = cardElementChildren[1].textContent;
        const amount = nbrInputValue;
        const price = cardElementChildren[3].textContent;
        const imageURL = cardElementChildren[0].currentSrc;
        const itemToCart = new CartItem( name, amount, price, imageURL );
        itemToCart.calcTotal();
        const itemInsideAlready = validCart.find( item => item.name === itemToCart.name);
        if (itemInsideAlready) {
            validCart = validCart.filter(item => item.name !== itemInsideAlready.name);
            itemInsideAlready.amount = `${parseInt(itemInsideAlready.amount) +  parseInt(itemToCart.amount)}`;
            itemInsideAlready.calcTotal();
            validCart.push(itemInsideAlready);
        } else {
            validCart.push(itemToCart);
        }

        renderYourCartDom(cartOnDOM);
    }
}
const checkInputFieldContent = (recListOfInputFields) => {
    let fieldsAreFilled = [];
    recListOfInputFields.forEach(el => {
        if (el.value){
            fieldsAreFilled.push(true);
        } else {
            fieldsAreFilled.push(false);
        }
    })
    return fieldsAreFilled;
};
const orderSubmitHandler = (e, cartOnDOM) => {
    let classList = e.target.classList;
    if(classList.contains('checkout-btn')){
        const form = document.querySelector('.order-section article form');
        const inputFields = document.querySelectorAll('.order-section article form input');
        let fieldsAreFilled = checkInputFieldContent(inputFields);
        if (fieldsAreFilled.indexOf(false) !== -1) {
            messageRenderer('Please fill all information before sending your order!');
            
        } else if (validCart.length === 0){
            
            messageRenderer('Your cart is empty!');
        } else {
            const today = new Date();
            const dataToSend = new FormData(form);

             dataToSend.append('cart', JSON.stringify(validCart));
             dataToSend.append('orderDate', `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
             dataToSend.append('status', 'In progress');
            const fetchSetup = {
                method: 'POST',
                body: dataToSend
            };
            fetch('/', fetchSetup).then(data => {
                if (data.status === 200){
                    messageRenderer('Your order was successful!');
                    inputFields.forEach( input => {
                        input.value = '';
                    })
                    validCart = [];
                    cartOnDOM.innerHTML = "";
                    cartOnDOM.insertAdjacentHTML("beforeend", emptyOrderHTML());
                    
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
};

const seePreviousOrders = async (e) => {
    let classList = e.target.classList;
    if (classList.contains('previous-orders-btn')){
        const result = await fetch('/my-orders');
        const orders = await result.json();
        if (orders.length === 0) {
            messageRenderer('You have no previous orders!');
        
        } else {
            
            const carts = orders.map(order => order.cart);
    
            prevOrdersHTML = carts.map(cart => {
                return `
                    <div class="prev-order-cart">
                        ${JSON.parse(cart).map(pizza => prevOrderRenderer(pizza)).join('')}
                    </div>
                `
            }).join('');
            
            root.insertAdjacentHTML("beforeend", `
            <section class="prev-order-overlay">
                <div class="prev-order-container">
                    ${prevOrdersHTML}
                </div>
            </section>
            `)
    
        }
    }
        
};
const closePreviousOrders = (e) => {
    let classList = e.target.classList;
    if (classList.contains('prev-order-overlay')){
        document.querySelector('.prev-order-overlay').remove();
    }  
};
const deleteFromCartHandler = (e, cartOnDOM) => {
    let classList = e.target.classList;
    if (classList.contains('delete-item-btn')){
        const pizzaName = e.target.parentNode.children[1].textContent;
        validCart = validCart.filter(item => item.name !== pizzaName);
        console.log(validCart);
        //render
        if (validCart.length === 0){
            cartOnDOM.innerHTML = "";
            cartOnDOM.insertAdjacentHTML("beforeend", emptyOrderHTML());
        } else {
            renderYourCartDom(cartOnDOM);
        };
    }
};
const init = async () => {
    const root = document.getElementById('root');
    // fetching data
    const pizzaList = await getData('/pizzas/pizzas.json');
    // adding HTML to the site
    root.insertAdjacentHTML("beforeend", navbarHTML());
    root.insertAdjacentHTML("beforeend", welcomeHTML());
    root.insertAdjacentHTML("beforeend", containerHTML('Our Best Pizzas', cardHTML(pizzaList)));
    root.insertAdjacentHTML("beforeend", orderHTML());
    
    const yourCart = document.querySelector(".your-cart");
    // click event calls
    document.addEventListener('click', (e) => inputNbrChangeHandler(e, yourCart));
    document.addEventListener('click', (e) => addToCartHandler(e, yourCart));
    document.addEventListener('click', (e) => deleteFromCartHandler(e, yourCart));
    document.addEventListener('click', (e) => orderSubmitHandler(e, yourCart));
    document.addEventListener('click', seePreviousOrders);
    document.addEventListener('click', closePreviousOrders);
};
window.addEventListener('load', init);