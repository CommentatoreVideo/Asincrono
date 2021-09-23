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

//Se ci dovessero essere una serie di promesse da eseguire si può usare Promise.all
(async function() {
	
	const userUrl = "https://jsonplaceholder.typicode.com/users/";
	const userUrls = [];
	for (let i = 1; i < 5; i++) userUrls.push(userUrl + i);
	const promesse = userUrls.map(url => {
		return new Promise(async (resolve, reject) => {
			const ris = await fetch(url);
			if(!ris.ok) return reject("Errore durante il fetch");
			const data = await ris.json();
			resolve(data);
		});
	});
	const users=await Promise.all(promesse);
	console.log(users);
})().catch(message=>console.log(message));