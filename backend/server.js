const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const path = require('path');
const fs = require('fs');
const app = express();




const absolutePathIndex = path.join(`${__dirname}/../frontend/index.html`);
const absolutePathPub = path.join(`${__dirname}/../frontend/public`);
const absolutePathPizzasJSON = path.join(`${__dirname}/../backend/dataBase/pizzas`);
const absolutePathOrderJSON = path.join(`${__dirname}/../backend/dataBase/orders.json`);

app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(absolutePathPub));
app.use('/pizzas', express.static(absolutePathPizzasJSON));

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


//HANDLE ADD TO ORDER
app.post('/', (req, res) => {
	
	try {
		req.body.user = req.cookies.user_id;
		const currentOrders = getUserData(absolutePathOrderJSON);
		currentOrders.push(req.body);
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

