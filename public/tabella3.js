const urlTodos = "https://jsonplaceholder.typicode.com/todos";
const urlUsers = "https://jsonplaceholder.typicode.com/users";
class FetchError {
	constructor(message) {
		this.message = message;
	}
}
function creaTabellaUtente(datiInput, pk) {
	const dati = [];
	for (const data of datiInput) {
		const ris = {};
		for (const chiave in data) if (chiave !== pk) ris[chiave] = data[chiave];
		dati.push(ris);
	}

	let tabella = `
	<table class="table">
		<thead>
			<tr>
	`;
	for (const chiave in dati[0]) tabella += `<th>${chiave}</th>`;
	tabella += `
			</tr>
		</thead>	
		<tbody>
	`;
	for (const data of dati) {
		tabella += "<tr>";
		for (const chiave in data) tabella += `<td>${data[chiave]}</td>`;

		tabella += "</tr>";
	}
	tabella += `
		</tbody>
	</table>
	`;
	return tabella;
}
async function getTodos() {
	const response = await fetch(urlTodos);
	if (!response.ok) throw new FetchError("Errore prendendo todos");
	const users = await response.json();
	return users;
}
async function getUsers() {
	const response = await fetch(urlUsers);
	if (!response.ok) throw new FetchError("Errore prendendo gli utenti");
	const users = await response.json();
	return users;
}
function aggregaTodoPerUtenti(dati) {
	const risultato = {};
	for (const data of dati) {
		if (risultato[data.userId] === undefined) risultato[data.userId] = [];
		risultato[data.userId].push(data);
	}
	return risultato;
}
(async function () {
	const result = await getTodos();
	const utenti = await getUsers();
	const dati = aggregaTodoPerUtenti(result);
	let ris = "";
	let indice = 0;
	for (const userId in dati) {
		const tabella = creaTabellaUtente(dati[userId], "userId");
		const { username } = utenti.find(utente => utente.id + "" === userId + "");
		if (indice === 0) ris += `<div class="row">`;
		ris += `<div class="col-4 border">
			<h6>username=${username}</h6>
			${tabella}</div>`;
		indice++;
		if (indice === 3) ris += `</div>`;
		indice %= 3;
	}
	if (indice !== 0) ris += "</div>";
	document.querySelector(".container-fluid").innerHTML = ris;
})().catch(error => {
	console.log(error.type);
	if (error instanceof FetchError) {
		alert(error.message);
	} else {
		alert("Qualcosa è andato storto");
		console.log(error);
	}
});
