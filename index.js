// Express setup and packages

const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");
// data import
let users = require("./data/users.json");

// authorize any use
app.use(cors());

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES

// get all users route
app.get("/users", (request, response) => {
	try {
		response.send(users);
	} catch (err) {
		console.log("Error to get data :" + err);
	}
});

// post new user route
app.post("/users", (request, response) => {
	const newUser = {
		id: request.body.id,
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		photoURL: request.body.photoURL,
		job: request.body.job,
		company: request.body.company,
		address: request.body.address,
		city: request.body.city,
		country: request.body.country,
		email: request.body.email,
		phone: request.body.phone,
	};
	try {
		// add new user to the response (no persistance)
		console.log(
			`User ${newUser.firstName} ${newUser.lastName} add with success`
		);
		users.push(newUser);
		response.send(users);
	} catch (err) {
		console.log("Error to create user :" + err);
	}
});

// Editing User route
app.patch("/users/:id", (request, response) => {
	const id = parseInt(request.params.id);
	let user = users.find((user) => user.id === id);

	(user.firstName = request.body.firstName),
		(user.lastName = request.body.lastName),
		(user.photoURL = request.body.photoURL),
		(user.job = request.body.job),
		(user.company = request.body.company),
		(user.address = request.body.address),
		(user.city = request.body.city),
		(user.country = request.body.country),
		(user.email = request.body.email),
		(user.phone = request.body.phone);

	response.status(200).json(users);
	console.log(`User with id : ${id} edited with success`);
});

// Delete user route

app.delete("/users/:id", (request, response) => {
	const id = parseInt(request.params.id);
	let user = users.find((user) => user.id === id);
	users.splice(users.indexOf(user), 1);

	response.status(200).json(users);
	console.log(`User with id : ${id} deleted with success`);
});

// listen route to start the server
app.listen(8000, () => {
	console.log("Serveur en cours de fonctionnement");
});
