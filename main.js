/* PROJ 207 Threaded Project - Group 3                                        *
 * Authors: Veronica Hoffman, Tessa Feyres, Aidan Goguen, and Natalie Helmer. *
 * Description: This is our main.js file to add server-side processing to     *
 *				our website and access the Travel Experts database.           *
 * Date: June 16 - June 23, 2021                                              */
 
 const express = require("express"); // importing the express module
 const app = express();               // creating a constant to access the express module
 const mysql = require("mysql"); // importing the MYSQL Module
 
 // Accessing our HTML pages and images in our views and public folder
 app.use(express.static("views", { "extensions": ["html"] }));
 app.use(express.static("public"));
 app.use(express.urlencoded({ extended: true }));
 
 // --- Setting up and communicating with our Server --- //
// Serving out the main page of the Travel Experts website
app.get("/", (req, res) => {
	console.log(__dirname);
	res.sendFile(__dirname + "/views/home.html");
});
 // Serving out the About Us page for the Travel Experts website
 app.get("/", (req, res) => {
	console.log(__dirname);
	res.sendFile(__dirname + "/views/aboutUs.html");
});

// Serving out the Customer Registration page for the Travel Experts website
app.get("/", (reg, res) => {
	console.log("Serving out the Customer Registration page");
	res.sendFile(__dirname + "views/customerRegistration.html");
});
// Serving out the Packages page for the Travel Experts website
app.get("/", (reg, res) => {
	console.log("Serving out the Packages page");
	res.sendFile(__dirname + "views/Packaage.html");
});
// Serving out the Contact us page for Travel Experts website
app.get("/", (reg, res) => {
	console.log("Serving out the Contacts page");
	res.sendFile(__dirname + "views/contact.html");
});

/* App.post function added by Veronica Hoffman 	                        *
 * Description: This is the MySQL file that interacts with the Customer * 
 *				Registration page and the Travel Experts database.      */ 
app.post("/customerRegistration", (req, res) => {
	// Getting the form data
	console.log(req.body);
	console.log(req.body.firstName);
		
	// Creating a JSON object for connecting to the database
	const db = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "travelexperts" 
	});
 
	// Connecting to the Travel Experts database
	db.connect( (err) => {
 
		// Check for errors
		if (err) throw err;
	
		// Creating the SQL Query to insert a new customer into the Travel Experts database
		var addCustSQL = "insert into customers (CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	
		db.query(addCustSQL, [req.body.firstName, req.body.lastName, req.body.address, req.body.city, req.body.province, req.body.postalCode, req.body.country, req.body.phoneNum, req.body.workPhoneNum, req.body.custEmail], function (err, result) {
		
		// check for errors
		if (err) throw err;
		
		// show results
		console.log(result.affectedRows + " records have been inserted");
		});
	
		// Sending SQL Queries to the database
		db.query("select * from customers", (err, result, fields) =>{
	
			// check for errors
			if (err) throw err;
		
			for (customer of result) {
				// display the customers we have in the database (for error testing)
				console.log(customer.CustFirstName + " " + customer.CustLastName + " " + customer.CustEmail + " " + customer.CustHomePhone);
			}
		
			// Close the database connection
			db.end( (err) => {
				// check for errors
				if (err) throw err;
				console.log("Database connection is ending");
			});
		});
	});
	// Sending customer name to thank you page
	res.redirect("/thanks");
});

// Begin server
app.listen(8000, () => { console.log("Server has started"); });
	

/*

How to start server through command prompt:
1. change to folder where main.js is using "cd" command
2. then type "nodemon main.js" to start server
3. then in browser go to "localhost:8000/page_name>"

*/	
