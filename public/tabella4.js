const urlTodos = "https://jsonplaceholder.typicode.com/todos/";
const urlUsers = "https://jsonplaceholder.typicode.com/users/";
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
		let nRiga = 1;
		//Il sito ritorna un vettore con i dati. Eseguo un ciclo per accedere ai dati singolarmente
		for (const data of result) {
			let ris = "<tr>";
			ris += `<td>${nRiga++}</td>`;
			//Ciclo ogni chiave e prendo il rispettivo valore. Se la chiave è l'userId aggiungo uno span per poter mostrare la tabella con le informazioni utente
			for (const chiave in data)
				if (chiave == "userId")
					ris += `<td>
										<span class="link" onclick="caricaInfoUser(${data[chiave]})">${data[chiave]}</span>
									</td>`;
				else ris += `<td>${data[chiave]}</td>`;
			ris += `<td><button class="btn btn-success" onclick="modificaRiga(this)">Modifica</button></td>`;
			ris += `<td><button class="btn btn-danger" onclick="eliminaRiga(this)">Elimina</button></td>`;
			ris += "</tr>";
			tbody += ris;
		}
		document.getElementById("tbody").innerHTML = tbody;
	})
	.catch(error => alert("C'è stato un errore caricando i dati"));

function cambiaNumeroRiga() {
	const righe = document.getElementById("tbody").children;
	let nRiga = 1;
	for (const riga of righe) 
		riga.children[0].innerText = nRiga++;
	
}
function eliminaRiga(button) {
	const td = button.parentNode;
	const tr = td.parentNode;
	tr.remove();
	cambiaNumeroRiga();
}

function modificaRiga(button) {
	const daModificare=button.innerText=="Modifica";
	const td=button.parentNode.parentNode.children[3];
	if(daModificare) {
		button.className="btn btn-warning";
		button.innerText="Salva";
		const testo=td.innerText;
		td.innerHTML=`<input type="text" value="${testo}">`;
		return;
	}
	td.innerText=td.children[0].value;
	button.className="btn btn-success";
	button.innerText="Modifica";
}