//Esempio di base
let p = new Promise((resolve, reject) => {
	//Codice che non fallisce
	// let a = 1 + 1;
	//Codice che fallisce
	let a = 1 + 2;
	if (a == 2) {
		resolve("Success");
	} else {
		reject("Failed");
	}
});

p.then(message => {
	console.log(`This is in the then ${message}`);
}).catch(message => {
	console.log(`This is in the catch ${message}`);
});