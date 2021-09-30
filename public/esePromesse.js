const promise = new Promise(function (resolve, reject) {
	resolve(1);

	setTimeout(() => resolve(2), 1000);
});

promise.then(ris => console.log(ris));

//Qual'è l'output?
//Risposta: solo 1. resolve fa in modo che vengano ignorate i resolve/reject in seguito
////////////////////////////////
// Ritardo con una promessa
// La funzione setTimeout usa un callback. Creare una alternativa con le promesse
// La funzione delay(ms) dovrebbe ritornare una promessa. La promessa dovrebbe "risolversi" dopo ms millisecondi, così da poter aggiungere un .then dopo

function delayDefault(ms) {
	// Il tuo codice
}
//Questa è la soluzione
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => console.log("runs after 3 seconds"));

//Trasformare la funzione data usando async await
function loadJson(url) {
	return fetch(url).then(response => {
		if (response.status == 200) {
			return response.json();
		} else {
			throw new Error(response.status);
		}
	});
}

loadJson("no-such-user.json").catch(console.log); // Error: 404

async function loadJsonAsync(url) {
	// (1)
	const response = await fetch(url); // (2)
	if (response.status == 200) {
		const json = await response.json(); // (3)
		return json;
	}
	throw new Error(response.status);
}

loadJsonAsync("no-such-user.json").catch(console.log); // Error: 404 (4)

// Notes:

// (1) La funzione loadJson diventa async
// (2) Tutti i .then all'interno sono rimpiazzati dagli await

// (3) Possiamo ritornare la funzione response.json() invece di aspettarla. In questo caso chi ha chiamato la funzione dovrà fare un await oppure .then
// Il codice sarebbe così
// if (response.status == 200) {
//   return response.json(); // (3)
// }

// (4) L'eccezione va gestire tramite .catch. Non possiamo usare await perché la funzione non è async