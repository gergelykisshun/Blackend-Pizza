const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const session = require('express-session');
// const myStore = new session.MemoryStore();
const path = require('path');
const fs = require('fs');
const app = express();



const frontendPath = path.join(`${__dirname}/../frontend`);
const absolutePathIndex = path.join(`${__dirname}/../frontend/index.html`);
const absolutePathPub = path.join(`${__dirname}/../frontend/public`);
const absolutePathPizzasJSON = path.join(`${__dirname}/../backend/dataBase/pizzas`);
const absolutePathOrderJSON = path.join(`${__dirname}/../backend/dataBase/orders.json`);
const absolutePathAdminJSON = path.join(`${__dirname}/../backend/dataBase/admin.json`);

app.use(cookieParser());
app.use(fileUpload());
app.use(session({
	secret: "ASDFDSAGVWEWGFDHSERZHE",
	resave: false,
	saveUninitialized: false
}))
app.use('/public', express.static(absolutePathPub));
app.use('/pizzas', express.static(absolutePathPizzasJSON));
app.use('/admin', express.static(`${frontendPath}/admin`));


const cookieGenerator = () => {
	let cookie = `user${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
	return cookie;
};

app.get('/', (req, res) => {
	
	if (!req.cookies.user_id) {
		const userId = cookieGenerator();
		res.cookie('user_id', userId, { expires: new Date(Date.now() + (3600000)) });		
	}
	
	res.sendFile(absolutePathIndex);
});

app.get('/admin', (req, res) => {
	if (req.session.authenticated){
		res.sendFile(`${frontendPath}/admin.html`);
	} else {
		res.status(200).sendFile(`${frontendPath}/admin-login.html`);
	}
});

//HANDLE ADD TO ORDER
app.post('/', (req, res) => {
	try {
		// add user_id to the req.body
		req.body.user = req.cookies.user_id;
		// get all current orders
		const currentOrders = getUserData(absolutePathOrderJSON);
		// generate id for order
		req.body.id = `${req.cookies.user_id}-${currentOrders.length}`;
		// add current order to all orders
		currentOrders.push(req.body);
		// save the updated data
		saveUserData(currentOrders, absolutePathOrderJSON);

		res.send('order successful');
		
	} catch (error){
		console.log(error);
	}
});

//SEND PREVIOUS ORDERS

app.get('/my-orders', (req, res) => {
	try {

		const currentOrders = getUserData(absolutePathOrderJSON);
		const filteredOrders = currentOrders.filter( order => order.user === req.cookies.user_id);
		res.status(200).send(filteredOrders);

	} catch (error) {
		
		console.log(error);
		res.send('Something happened');
	}

});


// SENDING ALL ORDERS TO ADMIN
app.get('/admin-orders', (req, res) => {
	res.status(200).sendFile(absolutePathOrderJSON);
});

// ORDER STATUS UPDATE ENDPOINT
app.post('/update-order-status', (req, res) => {
	try {
		const currentOrders = getUserData(absolutePathOrderJSON);

		//find which one to change
		let searchIndex = null;
		currentOrders.map( (order, i) => {
			if(order.id === req.body.id){
				searchIndex = i;
			}
		});

		// change the status
		currentOrders[searchIndex].status = req.body.status;

		// write order.json
		saveUserData(currentOrders, absolutePathOrderJSON);

		res.status(200).send([currentOrders, req.body.status]);
	} catch (error) {
		console.log(error);
	}
});




// using sessions to authenticate ADMIN user
app.get('/admin/login', (req, res) => {
	if(req.session.authenticated){
		res.sendFile(`${frontendPath}/admin.html`);
	} else {
		res.status(200).sendFile(`${frontendPath}/admin-login.html`);
	}
});

app.post('/admin/login', (req, res) => {
	// console.log(req.session);
	// console.log(req.sessionID);
	const { username, password} = req.body;
	const adminData = getUserData(absolutePathAdminJSON);
	
	if (username === adminData.username && password === adminData.password){
		req.session.authenticated = 'true';
		res.status(200).json(`Success`);
	} else {
		res.status(403).send('Not authenticated!')
	}
});

// SENDING ALL PIZZAS
app.get('/all-pizzas', (req, res) => {
	res.sendFile(`${absolutePathPizzasJSON}/pizzas.json`);
});


// REMOVE PIZZA
app.post('/remove-pizza', (req, res) => {
	try {
		const allPizzas = getUserData(`${absolutePathPizzasJSON}/pizzas.json`);
	
		const filteredPizzas = allPizzas.filter(pizza => pizza.name !== req.body.name);
	
		saveUserData(filteredPizzas, `${absolutePathPizzasJSON}/pizzas.json`);
	
		res.status(200).send(filteredPizzas);
	} catch (error){
		res.status(400).send('Something went wrong on server side!')
	}
});

// ADD NEW PIZZA
app.post('/add-new-pizza', (req, res) => {
	try {
		if(req.files){
			const image = req.files.image;	
			// upload image to database
			image.mv(`${absolutePathPizzasJSON}/img/${image.name}`, err => {
				console.log(err);
			})
		}
	
	
		// upload new pizza data to database
		const newPizzaData = {
			"name": req.body.name,
			"description": req.body.description,
			"price": req.body.price,
			"imageURL": req.files ? `/pizzas/img/${req.files.image.name}` : `/public/cute-pizza-img.jpg`,
			"status": req.body.status
		};
	
		const pizzaData = getUserData(`${absolutePathPizzasJSON}/pizzas.json`);
		pizzaData.push(newPizzaData);
		saveUserData(pizzaData, `${absolutePathPizzasJSON}/pizzas.json`);
	
		res.status(200).send(pizzaData);
	} catch (error) {
		console.log(error);
	}
});

// EDIT A PIZZA
app.post('/modify-pizza', (req, res) => {
	try {
		// const image = req.files.image;	
	
		// upload image to database
		if (req.files) {
			req.files.image.mv(`${absolutePathPizzasJSON}/img/${req.files.image.name}`, err => {
				console.log(err);
			})
		}
	
		// upload new pizza data to database
		const newPizzaData = {
			"name": req.body.name,
			"description": req.body.description,
			"price": req.body.price,
			"imageURL": `/pizzas/img/${req.files ? req.files.image.name : `${req.body.originalName}.jpg`}`,
			"status": req.body.status
		};
	
		const pizzaData = getUserData(`${absolutePathPizzasJSON}/pizzas.json`);
		
		console.log(req.body.originalName);

		let index = null;
		pizzaData.map( (pizza, i) => {
			if (pizza.name === req.body.originalName){
				index = i;
			};
		})
		console.log(index);

		const filteredPData = pizzaData.filter(pizza => pizza.name !== req.body.originalName);
		filteredPData.splice(index, 0, newPizzaData)	

		saveUserData(filteredPData, `${absolutePathPizzasJSON}/pizzas.json`);
	
		res.status(200).send(filteredPData);
	} catch (error) {
		console.log(error);
	}
});



const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;

app.listen(port, () => {
	console.log(ipAddress)
});


// Helper functions
const saveUserData = (data, url) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(url, stringifyData)
}

const getUserData = (url) => {
    const jsonData = fs.readFileSync(url)
    return JSON.parse(jsonData)    
}

