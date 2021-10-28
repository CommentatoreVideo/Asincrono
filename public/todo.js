const url = "http://localhost:3000/todos/";
fetch(url)
	.then(response => response.json())
	.then(result => {
		let tbody = "";
		//Il sito ritorna un vettore con i dati. Eseguo un ciclo per accedere ai dati singolarmente
		for (const data of result) {
			let ris = "<tr>";
			//Ciclo ogni chiave e prendo il rispettivo valore
			for (const chiave in data) ris += `<td>${data[chiave]}</td>`;
			ris += "</tr>";
			tbody += ris;
		}
		document.getElementById("tbody").innerHTML = tbody;
	})
	.catch(error => alert("C'è stato un errore caricando i dati"));

document.getElementById("btnAggiungiTodo").onclick = function () {
	const userId = document.getElementById("userId").value;
	const title = document.getElementById("title").value;
	const completed = document.getElementById("completed").value;
	fetch("http://localhost:3000/todos/add", {
		method: "POST",
		body: JSON.stringify({ userId, title, completed }),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(d => d.json())
		.then(console.log)
		.catch(console.error);
};

function* generatore() {
	const data = [
		{
			userId: 1,
			id: 1,
			title: "delectus aut autem",
			completed: false,
		},
		{
			userId: 1,
			id: 2,
			title: "quis ut nam facilis et officia qui",
			completed: false,
		},
		{
			userId: 1,
			id: 3,
			title: "fugiat veniam minus",
			completed: false,
		},
		{
			userId: 1,
			id: 4,
			title: "et porro tempora",
			completed: true,
		},
		{
			userId: 1,
			id: 5,
			title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
			completed: false,
		},
		{
			userId: 1,
			id: 6,
			title: "qui ullam ratione quibusdam voluptatem quia omnis",
			completed: false,
		},
		{
			userId: 1,
			id: 7,
			title: "illo expedita consequatur quia in",
			completed: false,
		},
		{
			userId: 1,
			id: 8,
			title: "quo adipisci enim quam ut ab",
			completed: true,
		},
		{
			userId: 1,
			id: 9,
			title: "molestiae perspiciatis ipsa",
			completed: false,
		},
		{
			userId: 1,
			id: 10,
			title: "illo est ratione doloremque quia maiores aut",
			completed: true,
		},
	];
	for (const todo of data) {
		yield todo;
	}
}
async function popola() {
	const generato = generatore();
	while (true) {
		const data = generato.next();
		if (data.done) return;
		const { userId, title, completed } = data.value;
		console.log(data.value);
		const r = await fetch("http://localhost:3000/todos/add", {
			method: "POST",
			body: JSON.stringify({ userId, title, completed }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const ris = await r.json();
		console.log(ris);
	}
}

function mostra(nomeDiv) {
  document.querySelectorAll(".divContent").forEach(div => (div.hidden = "hidden"));
  document.querySelector(`#${nomeDiv}`).hidden = "";
}