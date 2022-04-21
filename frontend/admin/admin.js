// COMPONENTS
const navbarHTML = () => {
    return `
    <nav class="navbar">
        <h4><a href="#top">Blackend admin</a></h4>
        <div class="navigation-container">
            <a class="order-text-link">
                Order
            </a>
            <a class="menu-text-link">
                Menu
            </a>
        </div>
    </nav>
    `;
};
// MENU SECTION COMPONENTS

const adminMenuHTML = (recCards) => {
    return `
    <section class="pizza-section order-section">
        <h2>Menu
            <button class="add-pizza-btn primary-btn">Add</button>
        </h2>
        <div class="data-container">
            <div class="pizza-card order-head">
                <h4>Image</h4>
                <h4>Name</h4>
                <h4>Ingredients</h4>
                <h4>Price</h4>
                <h4>Status</h4>
            </div>
            ${recCards}
        </div>
    </section>
    `
};

const pizzaCardHTML = ({imageURL, name, description, price, status}) => {
    return `
        <div class="pizza-card">
            <img src="${imageURL}" alt="${name}">
            <p>${name}</p>
            <p>${description}</p>
            <p>${price} Ft</p>
            <p>${status}</p>
            <button class="pizza-remove-btn secondary-btn">Remove</button>
            <button class="pizza-edit-btn secondary-btn">Edit</button>
        </div>
    `;
};

const pizzaAddHTML = () => {
        return `
        <section class="order-status-overlay">
        <div class="order-status-container">
            <h2 class="title">Add new item</h2>
            <form class="order-update-form">
                <label class="pizza-card-label" for="">Name
                    <input name="name"class="edit-input-style" type="text" required>
                </label>
                <label class="pizza-card-label" for="">Ingredients
                    <textarea name="description" class="edit-textarea-style" required></textarea>
                </label>
                <label class="pizza-card-label" for="">Price
                    <input name="price" class="edit-input-style" type="number" required>
                </label>
                <label>Status</label>
                <div class="radio-container">
                    <div class="radio-div">
                        <input id="Active" type="radio" name="status" value="Active" checked/>
                        <label class="new-circle" for="Active"></label>
                        <p>Active</p>
                    </div>
                    <div class="radio-div">
                        <input id="Inactive" type="radio" name="status" value="Inactive"/>
                        <label class="new-circle" for="Inactive"></label>
                        <p>Inactive</p>
                    </div>
                </div>
                <label class="pizza-card-label" for="pizza-img">Picture
                    <input name="image" id="pizza-img" type="file" required>
                    <img class="pizza-preview-img" src="/public/cute-pizza-img.jpg">
                </label>
                <div class="btn-div">
                    <button class="cancel-btn secondary-btn">Cancel</button>
                    <button class="add-pizza-send-btn primary-btn">Save</button>
                <div>
            </form>
        </div>
    </section>      
    `;
}

const pizzaEditHTML = ( {imageURL, name, description, price} ) => {
    return `
    <section class="order-status-overlay">
    <div class="order-status-container">
        <h2 class="title">Edit item</h2>
            <form class="order-update-form">
                <label class="pizza-card-label" for="">Name
                    <input name="name"class="edit-input-style" type="text" value="${name}"required>
                </label>
                <label class="pizza-card-label" for="">Ingredients
                    <textarea name="description" class="edit-textarea-style" required>${description}</textarea>
                </label>
                <label class="pizza-card-label" for="">Price
                    <input name="price" class="edit-input-style" type="number" value="${price}" required>
                </label>
                <label>Status</label>
                <div class="radio-container">
                    <div class="radio-div">
                        <input id="Active" type="radio" name="status" value="Active" checked/>
                        <label class="new-circle" for="Active"></label>
                        <p>Active</p>
                    </div>
                    <div class="radio-div">
                        <input id="Inactive" type="radio" name="status" value="Inactive"/>
                        <label class="new-circle" for="Inactive"></label>
                        <p>Inactive</p>
                    </div>
                </div>
                <label class="pizza-card-label" for="pizza-img">Picture
                    <input name="image" id="pizza-img" type="file" required>
                    <img class="pizza-preview-img" src=${imageURL}>
                </label>
                <div class="btn-div">
                    <button class="cancel-btn secondary-btn">Cancel</button>
                    <button class="edit-pizza-send-btn primary-btn" data-originalName="${name}">Save</button>
                <div>
            </form>
        </div>
    </section>      
`
    // return `
    // <section class="order-status-overlay">
    //     <div class="order-status-container">
    //         <h2 class="title">Edit item</h2>
    //         <form class="order-update-form">
    //             <label class="pizza-card-label" for="">Name
    //                 <input class="edit-input-style" type="text" value="${name}">
    //             </label>
    //             <label class="pizza-card-label" for="">Ingredients
    //                 <textarea class="edit-textarea-style">${description}</textarea>
    //             </label>
    //             <label class="pizza-card-label" for="">Price
    //                 <input class="edit-input-style" type="number" value="${price}">
    //             </label>
    //             <label>Status</label>
    //             <div class="radio-container">
    //                 <div class="radio-div">
    //                     <input id="Active" type="radio" name="status" value="Active"/>
    //                     <label class="new-circle" for="Active"></label>
    //                     <p>Active</p>
    //                 </div>
    //                 <div class="radio-div">
    //                     <input id="Inactive" type="radio" name="status" value="Inactive"/>
    //                     <label class="new-circle" for="Inactive"></label>
    //                     <p>Inactive</p>
    //                 </div>
    //             </div>
    //             <label class="pizza-card-label" for="pizza-img">Picture
    //                 <input id="pizza-img" type="file">
    //                 <img class="pizza-preview-img" src="${imageURL}">
    //             </label>
    //             <div class="btn-div">
    //                 <button class="cancel-btn secondary-btn">Cancel</button>
    //                 <button class="edit-pizza-send-btn primary-btn">Save</button>
    //             <div>
    //         </form>
    //     </div>
    // </section>    
    // `;
};

    
// ORDER SECTION COMPONENTS

const adminOrderHTML = (recCards) => {
    return `
    <section class="order-section">
        <h2>Orders</h2>
        <div class="data-container">
            <div class="order-card order-head">
                <h4>Order ID</h4>
                <h4>Order details</h4>
                <h4>Total</h4>
                <select class="order-status-select" name="status">
                    <option value="Status" selected disabled>Status</option>
                    <option value="All">All</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="In progress">In progress</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            ${recCards}
        </div>
    </section>
    `
};

const orderCardHTML = ({ id, status, cart }) => {
    const cartJSON = JSON.parse(cart);
    // console.log(cartJSON);
    const getTotal = () => {
        const arr = cartJSON.map(item => parseInt(item.total.slice(0, -3)));
        return `${arr.reduce( (prev, cur) => prev += cur)} Ft`;

    };

    const pizzaAmounts = cartJSON.map(cartItem => `${cartItem.name} ${cartItem.amount}X`).join(', ');

    return `
        <div class="order-card">
            <p class="order-id">#${id}</p>
            <p>${pizzaAmounts}</p>
            <p>${getTotal()}</p>
            <p>${status}</p>
            <button class="order-edit-btn secondary-btn">Edit</button>
        </div>
    `;
};

const orderUpdateHTML = (id, status) => {
    return `
            <section class="order-status-overlay">
                <div class="order-status-container">
                    <h2 class="title">Edit order status</h2>
                    <h4>Order ID ${id}</h4>
                    <p class="status-head">Status</p>
                    <form class="order-update-form">
                        <label for="1">
                            <input id="1" type="radio" name="status" value="Out for delivery"></>
                            <label class="new-circle" for="1"></label>
                            <span>Out for delivery</span>
                        </label>
                        <label for="2">
                            <input id="2" type="radio" name="status" value="In progress"/>
                            <label class="new-circle" for="2"></label>
                            <span>In progress</span>
                        </label>
                        <label for="3">
                            <input id="3" type="radio" name="status" value="Cancelled"/>
                            <label class="new-circle" for="3"></label>
                            <span>Cancelled</span>
                        </label>
                        <label for="4">
                            <input id="4" type="radio" name="status" value="Completed"/>
                            <label class="new-circle" for="4"></label>
                            <span>Completed</span>
                        </label>
                        <div>
                            <button class="cancel-btn secondary-btn">Cancel</button>
                            <button class="status-update-btn primary-btn" data-id="${id}" data-status="${status}">Save changes</button>
                        <div>
                    </form>
                </div>
            </section>    
    `;
}

const toastMessageHTML = (id, prevState, curState) => {
    return `
    <div class="toast-message-container">
        <i class="material-icons-outlined">check_circle</i>
        <p>The status of order ${id} has been changed from "${prevState}" to "${curState}" successfully.</p>
    </div>
    `
};

const flexibleToastMessageHTML = (msg) => {
    return `
    <div class="toast-message-container flexible-msg">
        <p>${msg}</p>
    </div>
    `
}


// CLICK HANDLERS

const orderClickHandler = async () => {

    if(document.querySelector('.pizza-section')){
        document.querySelector('.pizza-section').remove();
    }

    if(document.querySelector('.order-section')){
        document.querySelector('.order-section').remove();  
    }

    //Get all orders
    const req = await fetch('/admin-orders');
    const res = await req.json();
    // console.log(res);

    document.getElementById('root').insertAdjacentHTML( "beforeend", adminOrderHTML(res.map((order) =>  orderCardHTML(order)).join('') ) );

};

const menuClickHandler = async () => {

    if(document.querySelector('.pizza-section')){
        document.querySelector('.pizza-section').remove();
    }

    if(document.querySelector('.order-section')){
        document.querySelector('.order-section').remove();  
    }

    const reqPizzas = await fetch('/all-pizzas');
    const pizzaData = await reqPizzas.json()

    root.insertAdjacentHTML("beforeend", adminMenuHTML( pizzaData.map(pizza => pizzaCardHTML(pizza)).join('') ));


};

const editOrderHandler = (e) => {
    if(e.target.classList.contains('order-edit-btn')){
        const orderID = e.target.parentNode.children[0].textContent;
        const currentStatus = e.target.previousElementSibling.textContent;
        // inserts overlay
        root.insertAdjacentHTML("beforeend", orderUpdateHTML(orderID, currentStatus));
        document.querySelector(`.order-status-container input[value="${currentStatus}"]`).checked = true;

    };
};

const cancelOrderUpdateHandler = (e) => {
    if(e.target.classList.contains('cancel-btn')){
        e.preventDefault();
        document.querySelector('.order-status-overlay').remove();
    }
};

const confirmOrderUpdateHandler = (e) => {
    if(e.target.classList.contains('status-update-btn')){
        e.preventDefault();
        // gather info
        const dataToSend = new FormData(document.querySelector('.order-update-form'));
        dataToSend.append('id', e.target.dataset.id.slice(1));
        // post fetch
        fetch('/update-order-status', {
            method: 'POST',
            body: dataToSend
        }).then(async (data) => {
            if(data.status === 200){
                // await new data
                const res = await data.json();

                // remove all outdated data
                document.querySelector('.order-status-overlay').remove();
                document.querySelector('.order-section').remove();  

                // re-render page
                document.getElementById('root').insertAdjacentHTML( "beforeend", adminOrderHTML(res[0].map((order) =>  orderCardHTML(order)).join('') ) );
                // add success toast-msg
                document.querySelector('.order-section h2').insertAdjacentHTML("beforeend", toastMessageHTML(e.target.dataset.id, e.target.dataset.status, res[1]));
                // animate toast message
                    //fade-in
                document.querySelector('.toast-message-container').classList.add('toast-fade-in');
                    //fade-out
                setTimeout(() => {
                    document.querySelector('.toast-message-container').classList.add('toast-fade-out');
                }, 4000);
                // delete toast message from DOM
                setTimeout(() => {
                    if(document.querySelector('.toast-message-container')){
                        document.querySelector('.toast-message-container').remove();
                    }
                }, 4800)
            }
        }).catch(error => {
            console.log(error);
        });

    };
};

const selectFilterHandler = async (e) => {
    if (e.target.classList.contains('order-status-select')){

        if(e.target.value === 'All'){
            orderClickHandler();
        } else {            
            //Get all orders
            const req = await fetch('/admin-orders');
            const res = await req.json();
            
            const filtered = res.filter(order => order.status === e.target.value);
    
            document.querySelector('.order-section').remove();  
            document.getElementById('root').insertAdjacentHTML( "beforeend", adminOrderHTML(filtered.map((order) =>  orderCardHTML(order)).join('') ) );
        }
    }
}

const addPizzaHandler = (e) => {
    if(e.target.classList.contains('add-pizza-btn')){
        root.insertAdjacentHTML("beforeend", pizzaAddHTML());
    }
};
const sendAddPizzaHandler = (e) => {
    if(e.target.classList.contains('add-pizza-send-btn')){
        e.preventDefault()
        const form = document.querySelector('.order-update-form');
        const pizzaName = form.querySelector('input').value;

        const dataToSend = new FormData(form);

        fetch('/add-new-pizza', {
            method: 'POST',
            body: dataToSend
        }).then(async data => {
            const newPizzas = await data.json();

            if(document.querySelector('.pizza-section')){
                document.querySelector('.pizza-section').remove();
            }

            document.querySelector('.order-status-overlay').remove();
            

            root.insertAdjacentHTML("beforeend", adminMenuHTML( newPizzas.map(pizza => pizzaCardHTML(pizza)).join('') ));

            document.querySelector('.data-container').insertAdjacentHTML("beforeend", flexibleToastMessageHTML(`Pizza ${pizzaName} was edited successfully!` ));
            // animate toast message
                //fade-in
            document.querySelector('.toast-message-container').classList.add('toast-fade-in');
                //fade-out
            setTimeout(() => {
                document.querySelector('.toast-message-container').classList.add('toast-fade-out');
            }, 2000);
            // delete toast message from DOM
            setTimeout(() => {
                if(document.querySelector('.toast-message-container')){
                    document.querySelector('.toast-message-container').remove();
                }
            }, 2800)

        }).catch(error => {
            console.log(error);
        })
    }
};

const removePizzaHandler = (e) => {
    if(e.target.classList.contains('pizza-remove-btn')){
        const removePizzaName = e.target.parentNode.children[1].textContent;

        const dataToSend = new FormData();
        dataToSend.append('name', removePizzaName);

        fetch('/remove-pizza', {
            method: 'POST',
            body: dataToSend
        }).then(async data => {
            const newPizzas = await data.json();
            console.log(newPizzas);

            if(document.querySelector('.pizza-section')){
                document.querySelector('.pizza-section').remove();
            }

            root.insertAdjacentHTML("beforeend", adminMenuHTML( newPizzas.map(pizza => pizzaCardHTML(pizza)).join('') ));

        }).catch(error => {
            console.log(error);
        })

    }
};

const editPizzaHandler = async (e) => {
    if(e.target.classList.contains('pizza-edit-btn')){
        const editPizzaName = e.target.parentNode.children[1].textContent;

        const reqPizzas = await fetch('/all-pizzas');
        const pizzaData = await reqPizzas.json()

        const pizzaToShow = pizzaData.filter(pizza => pizza.name === editPizzaName);
    
        root.insertAdjacentHTML("beforeend", pizzaEditHTML(pizzaToShow[0]));

        document.getElementById(`${pizzaToShow[0].status}`).checked = true;

    }
};

const sendEditPizzaHandler = (e) => {
    if(e.target.classList.contains('edit-pizza-send-btn')){
        e.preventDefault()
        const form = document.querySelector('.order-update-form');
        const pizzaName = form.querySelector('input').value;


        if (document.getElementById('pizza-img').files.length === 0){
            document.querySelector('.order-status-overlay').insertAdjacentHTML("beforeend", flexibleToastMessageHTML('Please select an image for your pizza!'));
            // animate toast message
                //fade-in
            document.querySelector('.toast-message-container').classList.add('toast-fade-in');
                //fade-out
            setTimeout(() => {
                document.querySelector('.toast-message-container').classList.add('toast-fade-out');
            }, 2000);
            // delete toast message from DOM
            setTimeout(() => {
                if(document.querySelector('.toast-message-container')){
                    document.querySelector('.toast-message-container').remove();
                }
            }, 2800)
        } else {
            const dataToSend = new FormData(form);
            dataToSend.append('originalName', e.target.dataset.originalname);
    
            
    
            fetch('/modify-pizza', {
                method: 'POST',
                body: dataToSend
            }).then(async data => {
                const newPizzas = await data.json();
                console.log(newPizzas);
    
                if(document.querySelector('.pizza-section')){
                    document.querySelector('.pizza-section').remove();
                }
    
                document.querySelector('.order-status-overlay').remove();
                
    
                root.insertAdjacentHTML("beforeend", adminMenuHTML( newPizzas.map(pizza => pizzaCardHTML(pizza)).join('') ));

                document.querySelector('.data-container').insertAdjacentHTML("beforeend", flexibleToastMessageHTML(`Pizza ${pizzaName} was edited successfully!` ));
                // animate toast message
                    //fade-in
                document.querySelector('.toast-message-container').classList.add('toast-fade-in');
                    //fade-out
                setTimeout(() => {
                    document.querySelector('.toast-message-container').classList.add('toast-fade-out');
                }, 2000);
                // delete toast message from DOM
                setTimeout(() => {
                    if(document.querySelector('.toast-message-container')){
                        document.querySelector('.toast-message-container').remove();
                    }
                }, 2800)
    
            }).catch(error => {
                console.log(error);
            })
        }

    }
};



const imgPreviewUpdate = (e) => {
    if(e.target.id === 'pizza-img'){
        let firstImg = document.getElementById('pizza-img').files[0];
        let imgUrl = URL.createObjectURL(firstImg);
    
        document.querySelector('.pizza-preview-img').setAttribute('src', `${imgUrl}`);
 }
};


const init = async () => {
    const root = document.getElementById("root");
    
    root.insertAdjacentHTML("beforeend", navbarHTML());

    const reqPizzas = await fetch('/all-pizzas');
    const pizzaData = await reqPizzas.json()

    root.insertAdjacentHTML("beforeend", adminMenuHTML( pizzaData.map(pizza => pizzaCardHTML(pizza)).join('') ));
    
            
    //Click Events
    document.querySelector('.order-text-link').addEventListener('click', orderClickHandler);
    document.querySelector('.menu-text-link').addEventListener('click', menuClickHandler);
    document.addEventListener('click', editOrderHandler);
    document.addEventListener('click', cancelOrderUpdateHandler);
    document.addEventListener('click', confirmOrderUpdateHandler);
    document.addEventListener('input', selectFilterHandler);

    //Click Event for Menu
    document.addEventListener('click', addPizzaHandler);
    document.addEventListener('click', editPizzaHandler);
    document.addEventListener('click', removePizzaHandler);
    document.addEventListener('click', sendAddPizzaHandler); 
    document.addEventListener('change', imgPreviewUpdate);
    document.addEventListener('click', sendEditPizzaHandler);
    
};






window.addEventListener(`load`, init);