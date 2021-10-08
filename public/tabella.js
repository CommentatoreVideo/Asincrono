const urlTodos = "https://jsonplaceholder.typicode.com/todos/";
const urlUsers = "https://jsonplaceholder.typicode.com/users/";

// (async function() {
//   const response=await fetch(url);
//   const data=await response.json();
//   for(const chiave in data) {
//     const riga=document.createElement("tr");
//     const tdChiave=document.createElement("td");
//     tdChiave.innerText=chiave;
//     const tdValore=document.createElement("td");
//     tdValore.innerText=data[chiave];
//     riga.appendChild(tdChiave);
//     riga.appendChild(tdValore);
//     document.getElementById("tbody").appendChild(riga);
//   }
// })();

// (async function () {
// 	const response = await fetch(url);
// 	const data = await response.json();
// 	let tbody = "";
// 	for (const chiave in data) {
// 		let ris = "<tr>";
// 		ris += `<td>${chiave}</td>`;
// 		ris += `<td>${data[chiave]}</td>`;
// 		ris += "</tr>";
// 		tbody += ris;
// 	}
// 	document.getElementById("tbody").innerHTML = tbody;
// })().catch(error => alert("C'è stato un errore caricando i dati"));

// fetch(url)
// 	.then(response => response.json())
// 	.then(data => {
// 		let tbody = "";
// 		for (const chiave in data) {
// 			let ris = "<tr>";
// 			ris += `<td>${chiave}</td>`;
// 			ris += `<td>${data[chiave]}</td>`;
// 			ris += "</tr>";
// 			tbody += ris;
// 		}
// 		document.getElementById("tbody").innerHTML = tbody;
// 	})
// 	.catch(error => alert("C'è stato un errore caricando i dati"));

//Tabella 2. url è urlTodos
// fetch(url)
// 	.then(response => response.json())
// 	.then(result => {
// 		let tbody = "";
// 		//Il sito ritorna un vettore con i dati. Eseguo un ciclo per accedere ai dati singolarmente
// 		for (const data of result) {
// 			let ris = "<tr>";
// 			//Ciclo ogni chiave e prendo il rispettivo valore
// 			for (const chiave in data) ris += `<td>${data[chiave]}</td>`;
// 			ris += "</tr>";
// 			tbody += ris;
// 			// Per i più esplorativi:
// 			// tbody += `<tr>${Object.entries(data).map(([,valore])=>`<td>${valore}</td>`).join("")}`;
// 		}
// 		document.getElementById("tbody").innerHTML = tbody;
// 	})
// 	.catch(error => alert("C'è stato un errore caricando i dati"));

//Tabella 3
document.getElementById("btnIndietroUtente").onclick = function () {
	document.getElementById("divTabella").hidden = "";
	document.getElementById("divUtente").hidden = "true";
};
function caricaInfoUser(userId) {
	fetch(urlUsers)
		.then(response => response.json())
		.then(users => {
			const user = users.find(user => user.id == userId);
			let tbody = "";
			tbody += `<tr><th>id</th><td>${user.id}</td></tr>`;
			tbody += `<tr><th>name</th><td>${user.name}</td></tr>`;
			tbody += `<tr><th>username</th><td>${user.username}</td></tr>`;
			tbody += `<tr><th>email</th><td>${user.email}</td></tr>`;
			tbody += `<tr><th>phone</th><td>${user.phone}</td></tr>`;
			tbody += `<tr><th>website</th><td>${user.website}</td></tr>`;
			document.getElementById("tbody2").innerHTML = tbody;
			document.getElementById("divTabella").hidden = "true";
			document.getElementById("divUtente").hidden = "";
		});
}
fetch(urlTodos)
	.then(response => response.json())
	.then(result => {
		let tbody = "";
		//Il sito ritorna un vettore con i dati. Eseguo un ciclo per accedere ai dati singolarmente
		for (const data of result) {
			let ris = "<tr>";
			//Ciclo ogni chiave e prendo il rispettivo valore. Se la chiave è l'userId aggiungo uno span per poter mostrare la tabella con le informazioni utente
			for (const chiave in data)
				if (chiave == "userId")
					ris += `<td>
										<span class="link" onclick="caricaInfoUser(${data[chiave]})">${data[chiave]}</span>
									</td>`;
				else ris += `<td>${data[chiave]}</td>`;
			ris += "</tr>";
			tbody += ris;
		}
		document.getElementById("tbody").innerHTML = tbody;
	})
	.catch(error => alert("C'è stato un errore caricando i dati"));
